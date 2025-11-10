import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../LS_AuthForm/LoginForm/LoginForm.jsx';
import SignupForm from '../LS_AuthForm/SignupForm/SignupForm.jsx';
import '../AuthPanel/AuthPanel.css';

export default function AuthPanel() {
    // Track current mode: 'login' or 'signup'
    const [mode, setMode] = useState('login');

    // Get role from navigation state (default to 'user' if missing)
    const location = useLocation();
    const role = location.state?.role || 'user';

    // Toggle between login and signup modes
    const toggleMode = () => {
        setMode(mode === 'login' ? 'signup' : 'login');
    };

    return (
        <div className="auth-wrapper">
            {/* Semi-transparent background overlay */}
            <div className='auth-overlay'></div>

            {/* Main auth card with dynamic mode class */}
            <div className={`auth-card ${mode}`}>
                <div className={`form-side ${mode}`}>
                    {/* Login form (always rendered, visibility controlled via CSS) */}
                    <div className="form">
                        <LoginForm role={role} onSwitch={toggleMode} />
                    </div>

                    {/* Signup form (always rendered, visibility controlled via CSS) */}
                    <div className="form">
                        <SignupForm role={role} onSwitch={toggleMode} />
                    </div>

                    {/* Decorative image panel (mode-specific styling) */}
                    <div className={`image-panel ${mode}`}></div>
                </div>
            </div>
        </div>
    );
}