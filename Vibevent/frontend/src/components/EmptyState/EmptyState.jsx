import React from 'react';
import Button from '../UI/Button/Button.jsx';
import './EmptyState.css';

// EmptyState component displays a fallback UI when no data is available
export default function EmptyState({ icon = '📭', title, message, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      {/* Optional icon to visually represent the empty state */}
      <div className="empty-icon">{icon}</div>

      {/* Title for the empty state */}
      <h3 className="empty-title">{title}</h3>

      {/* Descriptive message explaining the empty state */}
      <p className="empty-message">{message}</p>

      {/* Optional action button if both label and handler are provided */}
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}