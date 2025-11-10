import React from 'react';
import './AuthImage.css';

// AuthImage component displays a decorative visual used in the auth panel
export default function AuthImage() {
  return (
    <div className="auth-image-container">
      {/* Static image asset for visual branding */}
      <img
        src="/assets/auth/auth-visual.png"
        alt="auth visual"
        className="auth-image"
      />
    </div>
  );
}