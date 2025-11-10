import React from 'react';
import './Button.css';

// Button component with variant styling and optional disabled state
export default function Button({
  children,              // button label or content
  onClick,               // click handler
  type = 'button',       // default HTML button type
  disabled,              // disables interaction if true
  variant = 'primary'    // style variant (e.g. primary, secondary, danger)
}) {
  return (
    <button
      className={`button ${variant}`}  // apply variant class
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}