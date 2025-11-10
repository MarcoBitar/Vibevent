import React from 'react';
import Button from '../UI/Button/Button.jsx';
import './EventDelete.css';

// EventDelete modal prompts user to confirm deletion of an event
export default function EventDelete({ isOpen, onClose, onConfirm }) {
  // If modal is not open, render nothing
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="event-delete">
          {/* Modal title and warning */}
          <h3>Delete this event?</h3>
          <p>This action cannot be undone.</p>

          {/* Action buttons */}
          <div className="delete-actions">
            {/* Cancel button closes modal */}
            <Button variant="ghost" onClick={onClose}>Cancel</Button>

            {/* Confirm button triggers deletion */}
            <Button variant="danger" onClick={onConfirm}>Delete</Button>
          </div>
        </div>
      </div>
    </div>
  );
}