import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelectorForm.css';
import Logo from "../../assets/Logo.png";

// RoleSelectorForm component prompts user to choose their role (student or club organizer)
export default function RoleSelectorForm({ onSelect }) {
  return (
    <div className="role-form">
      {/* Logo branding */}
      <div className="logo-container">
        <img src={Logo} alt="Vibevent Logo" className="logo" />
      </div>

      {/* Welcome message */}
      <h2>Welcome to Vibevent!</h2>
      <p>Select your role to continue:</p>

      {/* Role selection cards */}
      <div className="role-options">
        <RoleCard
          icon="👨🏻‍🎓"
          title="Student"
          description="Discover events and earn rewards"
          onClick={() => onSelect('user')} // triggers role selection as 'user'
        />
        <RoleCard
          icon="🏫"
          title="Club Organizer"
          description="Create and manage amazing events"
          onClick={() => onSelect('club')} // triggers role selection as 'club'
        />
      </div>

      {/* Back button to dismiss role selection */}
      <button onClick={() => onSelect(null)}>
        ← Back to Home
      </button>
    </div>
  );
}

// RoleCard component displays individual role option with icon, title, and description
function RoleCard({ icon, title, description, onClick }) {
  return (
    <div className="role-card" onClick={onClick}>
      <div className="role-icon">{icon}</div>
      <div className="role-info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}