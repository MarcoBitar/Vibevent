import React from 'react';
import './RoleCard.css';

// RoleCard displays a selectable role option with icon, title, and description
export default function RoleCard({ icon, title, description, onClick }) {
  return (
    <div className="role-card" onClick={onClick}>
      {/* Icon element (can be SVG, emoji, or component) */}
      <div className="role-icon">{icon}</div>

      {/* Role title (e.g. Student, Club) */}
      <h3 className="role-title">{title}</h3>

      {/* Role description (brief summary or CTA) */}
      <p className="role-description">{description}</p>
    </div>
  );
}