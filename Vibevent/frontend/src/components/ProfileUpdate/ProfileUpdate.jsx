import React, { useState } from 'react';
import './ProfileUpdate.css';
import { useImageConverter } from '../../hooks/useImageConverter';
import InputField from '../UI/InputField/InputField.jsx';

// ProfileUpdate modal allows user or club to update name, description, and profile image
export default function ProfileUpdate({ role, data, onUpdate, onClose }) {
  // === Form State ===
  const [name, setName] = useState(role === 'user' ? data.username : data.clubname);
  const [desc, setDesc] = useState(data.clubdesc || '');

  // === Image Upload Hook ===
  const { base64, loading, error, handleFileChange } = useImageConverter();

  // === Submit Handler ===
  const handleSubmit = () => {
    const updateData = {
      ...(role === 'user'
        ? { username: name }
        : { clubname: name, clubdesc: desc }),
      pic: base64 || data.pic, // fallback to existing pic if no new upload
    };
    onUpdate(updateData);
  };

  return (
    <div className="profile-update-modal">
      <div className="profile-update">
        <h3>{role === 'user' ? 'Update User Info' : 'Update Club Info'}</h3>

        {/* === Form Fields === */}
        <div className="form-grid">
          <InputField
            label={role === 'user' ? 'Username' : 'Club Name'}
            value={name}
            onChange={e => setName(e.target.value)}
          />

          {/* Club-only description field */}
          {role === 'club' && (
            <InputField
              label="Description"
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
          )}

          {/* === Image Upload Section === */}
          <div className="file-input-wrapper">
            <label>{role === 'user' ? 'Profile Pic' : 'Club Pic'}</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {loading && <p className="loading-text">Loading preview...</p>}
            {error && <p className="error-text">{error}</p>}
            {base64 && <img src={base64} alt="Preview" className="preview-img" />}
          </div>
        </div>

        {/* === Action Buttons === */}
        <div className="form-actions">
          <button className="save-btn" onClick={handleSubmit}>Save</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}