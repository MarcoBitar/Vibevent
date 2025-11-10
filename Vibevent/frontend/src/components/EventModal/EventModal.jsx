import React, { useState, useEffect } from 'react';
import './EventModal.css';
import Button from '../UI/Button/Button.jsx';
import EventDelete from '../EventDelete/EventDelete.jsx';
import RSVPList from '../RSVPList/RSVPList.jsx';
import eventService from '../../services/EventService.js';
import userService from '../../services/UserService.js';
import { useRSVPs } from '../../hooks/useRSVPs.js';
import EventForm from '../EventForm/EventForm.jsx';
import AttendanceService from '../../services/AttendanceService.js';
import SwipeToast from '../SwipeToast/SwipeToast.jsx';

// EventModal displays full event details, RSVP logic, edit/delete controls, and attendance management
export default function EventModal({ isOpen, onClose, event, onRSVP, onDeleted }) {
  if (!isOpen) return null;

  // Role and identity from localStorage
  const role = localStorage.getItem('role');
  const club = localStorage.getItem('clubname');
  const userId = localStorage.getItem('userid');

  // UI state
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [attendanceEmail, setAttendanceEmail] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // RSVP state
  const [hasRSVPed, setHasRSVPed] = useState(false);
  const [currentRSVPCount, setCurrentRSVPCount] = useState(event.rsvpCount ?? 0);
  const [rsvpsWithUser, setRsvpsWithUser] = useState([]);

  const { existsByEventAndUser, getRSVPsByEvent } = useRSVPs();
  const isClubOwner = role === 'club' && club === event.club;

  // Check if current user has RSVP'd
  useEffect(() => {
    async function fetchRSVP() {
      if (userId && event.eventid) {
        try {
          const exists = await existsByEventAndUser(event.eventid, userId);
          setHasRSVPed(Boolean(exists?.exists));
        } catch (err) {
          console.error('[EventModal] Failed to fetch RSVP status:', err);
        }
      }
    }
    fetchRSVP();
  }, [event.eventid, userId, existsByEventAndUser]);

  // Fetch RSVP list with user info (club owner only)
  useEffect(() => {
    async function fetchRSVPs() {
      if (!isClubOwner) return;

      try {
        const eventRsvps = await getRSVPsByEvent(event.eventid);
        const allUsers = await new userService().getAll();
        const merged = eventRsvps.map(rsvp => {
          const user = allUsers.find(u => u.userid === rsvp.userid);
          return { ...rsvp, ...user };
        });
        setRsvpsWithUser(merged);
      } catch (err) {
        console.error('Failed to fetch RSVPs with user info:', err);
      }
    }
    fetchRSVPs();
  }, [event.eventid]);

  // Handle RSVP button click
  const handleRSVPClick = async () => {
    if (!hasRSVPed && onRSVP) {
      try {
        await onRSVP();
        setHasRSVPed(true);
        setCurrentRSVPCount(prev => prev + 1);
      } catch (err) {
        console.error('[EventModal] RSVP failed:', err);
        setToastMessage('Failed to RSVP. Please try again.');
      }
    }
  };

  // Handle event deletion
  const handleDelete = async () => {
    try {
      await new eventService().delete(event.eventid);
      setShowDelete(false);
      onClose();
      if (onDeleted) onDeleted();
      setToastMessage('Event deleted successfully!');
    } catch (err) {
      console.error('[EventModal] Delete failed:', err.response?.data || err.message);
      setToastMessage('Could not delete event.');
    }
  };

  // Handle manual attendance submission
  const handleAddAttendance = async (e) => {
    e.preventDefault();
    try {
      const users = await new userService().getAll();
      const user = users.find(u => u.useremail === attendanceEmail);

      if (!user) {
        setToastMessage('User not found. Please check the email.');
        return;
      }

      const service = new AttendanceService();
      await service.create({
        eventid: event.eventid,
        userid: user.userid,
        attendstatus: 'yes',
        attendmethod: 'manual'
      });

      setToastMessage(`Attendance for ${user.username} marked successfully!`);
      setAttendanceEmail('');
      setShowAttendanceForm(false);
    } catch (err) {
      console.error('Failed to add attendance:', err);
      setToastMessage('Could not add attendance. It already exists');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="event-layout">
          {/* Event image */}
          <img src={event.image} alt={event.title} className="event-img" />

          <div className="event-details">
            {/* Action buttons */}
            <div className="event-actions">
              <Button variant="outline" onClick={onClose}>← Back to Events</Button>

              {isClubOwner && (
                <>
                  <Button variant="primary" onClick={() => setShowEdit(true)}>Edit Event</Button>
                  <Button variant="danger" onClick={() => setShowDelete(true)}>Delete Event</Button>
                  <Button variant="secondary" onClick={() => setShowAttendanceForm(!showAttendanceForm)}>
                    {showAttendanceForm ? "Cancel" : "Add Attendance"}
                  </Button>

                  {/* Delete confirmation modal */}
                  <EventDelete
                    isOpen={showDelete}
                    onClose={() => setShowDelete(false)}
                    onConfirm={handleDelete}
                  />

                  {/* Edit form modal */}
                  {showEdit && (
                    <EventForm
                      initialData={{
                        eventid: event.eventid,
                        title: event.title,
                        description: event.description,
                        date: event.date,
                        time: event.time,
                        location: event.location,
                        imagePreview: event.image
                      }}
                      mode="edit"
                      onCancel={() => setShowEdit(false)}
                      onCreated={() => {
                        setShowEdit(false);
                        if (onDeleted) onDeleted();
                      }}
                    />
                  )}
                </>
              )}

              {/* RSVP button for non-club users */}
              {role !== 'club' && !isClubOwner && (
                <Button variant="primary" onClick={handleRSVPClick} disabled={hasRSVPed}>
                  {hasRSVPed ? "RSVP'd" : "RSVP Now"}
                </Button>
              )}
            </div>

            {/* Manual attendance form */}
            {showAttendanceForm && (
              <form className="attendance-form" onSubmit={handleAddAttendance}>
                <input
                  type="email"
                  placeholder="Enter user email"
                  value={attendanceEmail}
                  onChange={(e) => setAttendanceEmail(e.target.value)}
                  required
                />
                <Button type="submit" variant="primary" className="attendance-submit">Submit</Button>
              </form>
            )}

            {/* Event info */}
            <h2 className="event-title">{event.title}</h2>
            <p className="event-description">{event.description}</p>

            <div className="event-squares">
              <div className="square">📅 {event.date}</div>
              <div className="square">⏰ {event.time}</div>
              <div className="square">📍 {event.location}</div>
              <div className="square">👥 {currentRSVPCount} RSVP’d</div>
            </div>

            <p className="event-organizer">Organized by {event.club}</p>

            {/* RSVP list for club owner */}
            {isClubOwner && rsvpsWithUser.length > 0 && (
              <div className="event-rsvp-section">
                <h3>RSVPs</h3>
                <RSVPList rsvps={rsvpsWithUser} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast feedback */}
      {toastMessage && (
        <SwipeToast
          message={toastMessage}
          onDismiss={() => setToastMessage('')}
          duration={4000}
        />
      )}
    </div>
  );
}