import React from 'react';
import './InputField.css';

// InputField renders a labeled input with optional error feedback
export default function InputField({
  label,         // field label (e.g. 'username', 'email')
  name,          // input name/id
  type = 'text', // input type (e.g. text, email, password)
  value,         // current input value
  onChange,      // change handler
  error          // optional error message
}) {
  return (
    <div className={`input-field ${error ? 'has-error' : ''}`}>
      {/* Capitalize label for display */}
      <label htmlFor={name}>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </label>

      {/* Input field */}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />

      {/* Error message (if present) */}
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}