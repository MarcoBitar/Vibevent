import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../UI/InputField/InputField.jsx';
import Button from '../../UI/Button/Button.jsx';
import '../../LS_AuthForm/SignupForm/LS_AuthForm.css';
import { useUsers } from '../../../hooks/useUsers.js';
import { useClubs } from '../../../hooks/useClubs.js';
import { useImageConverter } from '../../../hooks/useImageConverter.js';

// SignupForm handles both user and club registration with image upload and validation
export default function SignupForm({ role, onSwitch }) {
  // Form state
  const [form, setForm] = useState({
    username_signup: '',
    useremail_signup: '',
    userpass_signup: '',
    clubname_signup: '',
    clubemail_signup: '',
    clubpass_signup: '',
    clubdesc_signup: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fileChosen, setFileChosen] = useState(false);

  // Services
  const userService = useUsers();
  const clubService = useClubs();
  const navigate = useNavigate();
  const { base64, error: imageError, handleFileChange: convertFile } = useImageConverter();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Handle image file selection
  const handleFileChange = (e) => {
    convertFile(e);
    if (e.target.files && e.target.files[0]) setFileChosen(true);
  };

  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    const newErrors = {};
    setLoading(true);

    // === Validation ===
    if (role === 'user') {
      if (!form.username_signup) newErrors.username_signup = 'Full name is required';
      if (!form.useremail_signup) newErrors.useremail_signup = 'Email is required';
      if (!form.userpass_signup) newErrors.userpass_signup = 'Password is required';
    } else {
      if (!form.clubname_signup) newErrors.clubname_signup = 'Club name is required';
      if (!form.clubemail_signup) newErrors.clubemail_signup = 'Email is required';
      if (!form.clubpass_signup) newErrors.clubpass_signup = 'Password is required';
    }

    setErrors(newErrors);

    // === Submit if valid ===
    if (Object.keys(newErrors).length === 0) {
      try {
        if (role === 'user') {
          await userService.createUser({
            username: form.username_signup,
            useremail: form.useremail_signup,
            userpass: form.userpass_signup,
            userpic: base64 || null,
          });
        } else {
          await clubService.createClub({
            clubname: form.clubname_signup,
            clubemail: form.clubemail_signup,
            clubpass: form.clubpass_signup,
            clubdesc: form.clubdesc_signup,
            clubpic: base64 || null,
          });
        }
        navigate(`/${role}/dashboard`);
      } catch (err) {
        setErrors({ submit: err.message || 'Signup failed' });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  // Render image upload input
  const renderFileInput = () => (
    <div className="file-input-wrapper">
      <label className="file-label">
        {fileChosen ? 'Pic Chosen' : 'Choose Pic'}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden-file-input"
        />
      </label>
      {base64 && <img src={base64} alt="Preview" className="image-preview" />}
    </div>
  );

  return (
    <form className="auth-form" onSubmit={handleSignup} noValidate>
      <h2>{role === 'club' ? 'Club Signup' : 'Student Signup'}</h2>

      {/* === Club Signup Fields === */}
      {role === 'club' ? (
        <>
          <InputField
            label="Club Name *"
            name="clubname_signup"
            value={form.clubname_signup}
            onChange={handleChange}
            error={errors.clubname_signup}
          />
          <InputField
            label="Email *"
            name="clubemail_signup"
            type="email"
            value={form.clubemail_signup}
            onChange={handleChange}
            error={errors.clubemail_signup}
          />
          <InputField
            label="Password *"
            name="clubpass_signup"
            type="password"
            value={form.clubpass_signup}
            onChange={handleChange}
            error={errors.clubpass_signup}
          />
          <InputField
            label="Club Description"
            name="clubdesc_signup"
            type="textarea"
            value={form.clubdesc_signup}
            onChange={handleChange}
          />
          {renderFileInput()}
        </>
      ) : (
        <>
          {/* === User Signup Fields === */}
          <InputField
            label="Full Name *"
            name="username_signup"
            value={form.username_signup}
            onChange={handleChange}
            error={errors.username_signup}
          />
          <InputField
            label="Email *"
            name="useremail_signup"
            type="email"
            value={form.useremail_signup}
            onChange={handleChange}
            error={errors.useremail_signup}
          />
          <InputField
            label="Password *"
            name="userpass_signup"
            type="password"
            value={form.userpass_signup}
            onChange={handleChange}
            error={errors.userpass_signup}
          />
          {renderFileInput()}
        </>
      )}

      {/* === Error Feedback === */}
      {imageError && <p className="error">{imageError}</p>}
      {errors.submit && <p className="error">{errors.submit}</p>}

      {/* === Submit Button === */}
      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? 'Signing up…' : 'Sign Up'}
      </Button>

      {/* === Mode Switch + Navigation === */}
      <p className="switch-mode">
        Already have an account? <span onClick={() => onSwitch('login')}>Log in</span>
      </p>
      <Button type="button" variant="secondary" onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </form>
  );
}