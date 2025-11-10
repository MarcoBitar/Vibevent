import React, { useState, useEffect } from 'react';
import Button from '../UI/Button/Button.jsx';
import './EventCard.css';
import EventModal from '../EventModal/EventModal.jsx';
import { useRSVPs } from '../../hooks/useRSVPs.js';

// EventCard displays a single event with RSVP logic and modal support
export default function EventCard({
  eventid,
  userid,
  image,
  title,
  club,
  description,
  date,
  time,
  location,
  rsvpCount,
  onDeleted
}) {
  // Modal visibility state
  const [showModal, setShowModal] = useState(false);

  // RSVP status for current user
  const [hasRSVPed, setHasRSVPed] = useState(false);

  // Live RSVP count (syncs with prop and updates on RSVP)
  const [currentRSVPCount, setCurrentRSVPCount] = useState(rsvpCount ?? 0);

  // Custom hook for RSVP logic
  const { existsByEventAndUser, createRSVP } = useRSVPs();

  // Sync RSVP count if prop changes
  useEffect(() => {
    setCurrentRSVPCount(rsvpCount ?? 0);
  }, [rsvpCount]);

  // Check if user has already RSVP'd
  useEffect(() => {
    async function checkRSVP() {
      if (eventid && userid) {
        try {
          const exists = await existsByEventAndUser(eventid, userid);
          setHasRSVPed(Boolean(exists.exists));
        } catch (err) {
          console.error('[EventCard] RSVP check failed:', err);
          setHasRSVPed(false);
        }
      }
    }
    checkRSVP();
  }, [eventid, userid, existsByEventAndUser]);

  // Handle RSVP action
  const handleRSVP = async () => {
    if (!hasRSVPed && eventid && userid) {
      try {
        await createRSVP({
          eventid: Number(eventid),
          userid: Number(userid),
          rsvpstatus: 'yes'
        });

        setHasRSVPed(true);
        setCurrentRSVPCount(prev => prev + 1);
      } catch (err) {
        console.error('[EventCard] RSVP failed:', err);
      }
    } else {
      console.log('[EventCard] Cannot RSVP: hasRSVPed:', hasRSVPed, 'eventid:', eventid, 'userid:', userid);
    }
  };

  return (
    <>
      {/* Event card layout */}
      <div className="event-card">
        <img src={image} alt={title} className="event-img" />
        <div className="event-info">
          <h3 className="event-title">{title}</h3>
          <p className="event-club">{club}</p>
          <p className="event-description">{description}</p>

          {/* Metadata block */}
          <div className="event-meta">
            <span className="event-date">📅 {date}</span>
            <span className="event-location">📍 {location}</span>
            <span className="event-rsvp-count">👥 {currentRSVPCount} attending</span>
          </div>

          {/* Action buttons */}
          <div className="event-actions">
            <Button variant="outline" onClick={() => setShowModal(true)}>View Details</Button>
            {localStorage.getItem('role') !== 'club' && (
              <Button variant="primary" onClick={handleRSVP} disabled={hasRSVPed}>
                {hasRSVPed ? "RSVP'd" : "RSVP Now"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Modal for expanded event view */}
      {showModal && (
        <EventModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onRSVP={handleRSVP}
          event={{
            eventid,
            image,
            title,
            club,
            description,
            date,
            time,
            location,
            rsvpCount: currentRSVPCount
          }}
          onDeleted={onDeleted}
        />
      )}
    </>
  );
}