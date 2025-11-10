import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../UI/InputField/InputField.jsx';
import Button from '../../UI/Button/Button.jsx';
import '../../LS_AuthForm/SignupForm/LS_AuthForm.css';
import { useUserAuth } from '../../../hooks/useUserAuth.js';
import { useClubAuth } from '../../../hooks/useClubAuth.js';

// LoginForm handles authentication for both users and clubs based on role
export default function LoginForm({ role, onSwitch }) {
  // Form state
  const [form, setForm] = useState({
    useremail_login: '',
    userpass_login: '',
    clubemail_login: '',
    clubpass_login: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Auth services
  const userAuth = useUserAuth();
  const clubAuth = useClubAuth();
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' })); // clear field error
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = {};
    setLoading(true);

    // === Validation ===
    if (role === 'user') {
      if (!form.useremail_login) newErrors.useremail_login = 'Email is required';
      if (!form.userpass_login) newErrors.userpass_login = 'Password is required';
    } else {
      if (!form.clubemail_login) newErrors.clubemail_login = 'Email is required';
      if (!form.clubpass_login) newErrors.clubpass_login = 'Password is required';
    }

    setErrors(newErrors);

    // === Submit if valid ===
    if (Object.keys(newErrors).length === 0) {
      try {
        if (role === 'user') {
          await userAuth.loginUser(form.useremail_login, form.userpass_login);
        } else {
          await clubAuth.loginClub(form.clubemail_login, form.clubpass_login);
        }
        navigate(`/${role}/dashboard`);
      } catch (err) {
        setErrors({ submit: err.message || 'Login failed' });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleLogin} noValidate>
      <h2>{role === 'club' ? 'Club Login' : 'Student Login'}</h2>

      {/* === Role-specific login fields === */}
      {role === 'club' ? (
        <>
          <InputField
            label="Email"
            name="clubemail_login"
            value={form.clubemail_login}
            onChange={handleChange}
            error={errors.clubemail_login}
          />
          <InputField
            label="Password"
            name="clubpass_login"
            type="password"
            value={form.clubpass_login}
            onChange={handleChange}
            error={errors.clubpass_login}
          />
        </>
      ) : (
        <>
          <InputField
            label="Email"
            name="useremail_login"
            type="email"
            value={form.useremail_login}
            onChange={handleChange}
            error={errors.useremail_login}
          />
          <InputField
            label="Password"
            name="userpass_login"
            type="password"
            value={form.userpass_login}
            onChange={handleChange}
            error={errors.userpass_login}
          />
        </>
      )}

      {/* === Error Feedback === */}
      {errors.submit && <p className="error">{errors.submit}</p>}

      {/* === Submit Button === */}
      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? 'Logging in…' : 'Log In'}
      </Button>

      {/* === Mode Switch + Navigation === */}
      <p className="switch-mode">
        Don’t have an account? <span onClick={() => onSwitch('signup')}>Sign up</span>
      </p>
      <Button type="button" variant="secondary" onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </form>
  );
}