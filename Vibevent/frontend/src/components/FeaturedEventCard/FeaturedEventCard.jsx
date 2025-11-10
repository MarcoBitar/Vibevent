import React, { useState, useEffect } from 'react';
import Button from '../UI/Button/Button.jsx';
import EventModal from '../EventModal/EventModal.jsx';
import { useRSVPs } from '../../hooks/useRSVPs.js';
import './FeaturedEventCard.css';

// FeaturedEventCard displays a highlighted event with RSVP logic and modal support
export default function FeaturedEventCard({
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

  // Check if user has already RSVP'd
  useEffect(() => {
    async function checkRSVP() {
      if (eventid && userid) {
        const exists = await existsByEventAndUser(eventid, userid);
        setHasRSVPed(Boolean(exists.exists));
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
      console.log('[EventCard] Cannot RSVP:', { hasRSVPed, eventid, userid });
    }
  };

  return (
    <>
      {/* Featured event layout */}
      <div className="featured-event-container">
        <img src={image} alt={title} className="featured-event-image" />
        <div className="featured-event-content">
          <h1 className="featured-event-title">{title}</h1>
          <h3 className="featured-event-club">By {club}</h3>
          <p className="featured-event-description">{description}</p>

          {/* Metadata block */}
          <div className="featured-event-meta">
            <span>📅 {date} {time && `| 🕗 ${time}`}</span>
            <span>📍 {location}</span>
            <span>👥 {currentRSVPCount} attending</span>
          </div>

          {/* CTA button */}
          <Button
            variant="primary"
            className="view-details-btn"
            onClick={() => setShowModal(true)}
          >
            View Details
          </Button>
        </div>
      </div>

      {/* Modal for expanded event view */}
      {showModal && (
        <EventModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
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
          onRSVP={handleRSVP}
          onDeleted={onDeleted}
        />
      )}
    </>
  );
}