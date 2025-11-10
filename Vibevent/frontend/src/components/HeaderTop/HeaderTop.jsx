import React, { useState, useEffect } from 'react';
import './HeaderTop.css';
import Logo from '../../assets/logo.png';
import ProfileUpdate from '../ProfileUpdate/ProfileUpdate.jsx';
import NotificationList from '../NotificationList/NotificationList.jsx';
import UserService from '../../services/UserService.js';
import ClubService from '../../services/ClubService.js';

// HeaderTop displays logo, greeting, points, role switch, profile update, and notifications
export default function HeaderTop({ onSwitchRole }) {
  // UI state
  const [showProfileUpdate, setShowProfileUpdate] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Identity and profile state
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [pic, setPic] = useState('');
  const [points, setPoints] = useState(0);
  const [id, setId] = useState(null);

  // Hydrate identity from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem('role') || 'user';
    const storedId = storedRole === 'user'
      ? localStorage.getItem('userid')
      : localStorage.getItem('clubid');
    const storedName = storedRole === 'user'
      ? localStorage.getItem('username') || ''
      : localStorage.getItem('clubname') || '';
    const storedDesc = storedRole === 'club'
      ? localStorage.getItem('clubdesc') || ''
      : '';
    const storedPic = storedRole === 'user'
      ? localStorage.getItem('userpic') || ''
      : localStorage.getItem('clubpic') || '';
    const storedPoints = storedRole === 'user'
      ? parseInt(localStorage.getItem('userpoints')) || 0
      : parseInt(localStorage.getItem('clubpoints')) || 0;

    setRole(storedRole);
    setId(storedId);
    setName(storedName);
    setDesc(storedDesc);
    setPic(storedPic);
    setPoints(storedPoints);
  }, []);

  // Handle profile update submission
  const handleUpdateProfile = async (updatedData) => {
    try {
      const _name = role === 'user' ? updatedData.username : updatedData.clubname;
      const _desc = updatedData.clubdesc || '';
      const _pic = updatedData.pic;

      if (!id) throw new Error("Missing user/club ID");

      if (role === 'user') {
        await new UserService().update(id, { username: _name, userpic: _pic });
        localStorage.setItem('username', _name);
        localStorage.setItem('userpic', _pic);
      } else {
        await new ClubService().update(id, { clubname: _name, clubdesc: _desc, clubpic: _pic });
        localStorage.setItem('clubname', _name);
        localStorage.setItem('clubdesc', _desc);
        localStorage.setItem('clubpic', _pic);
        setDesc(_desc);
      }

      setName(_name);
      setPic(_pic);
      setShowProfileUpdate(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  return (
    <div className="header-top">
      {/* Logo + Greeting */}
      <div className="brand">
        <img src={Logo} alt="Vibevent Logo" className="logo" />
        <div>
          <h2>Vibevent</h2>
          <p>Welcome Back, {name}</p>
        </div>
      </div>

      {/* Points + Actions */}
      <div className="header-actions">
        <div className="points-display">
          <div className="trophy-icon">🏆</div>
          <span className="points-text">{points} points</span>
        </div>

        {/* Role switch */}
        <button className="switch-role" onClick={onSwitchRole}>Switch Role</button>

        {/* Profile update toggle */}
        <button className="update-profile" onClick={() => setShowProfileUpdate(prev => !prev)}>
          {showProfileUpdate ? 'Close' : 'Update Profile'}
        </button>

        {/* Notification bell */}
        <div className="bell-wrapper" onClick={() => setShowNotifications(prev => !prev)}>
          <div className="bell-icon">🔔</div>
          {showNotifications && id && <NotificationList id={id} />}
        </div>
      </div>

      {/* Profile update modal */}
      {showProfileUpdate && (
        <ProfileUpdate
          role={role}
          data={{ username: name, clubname: name, clubdesc: desc, pic }}
          onUpdate={handleUpdateProfile}
          onClose={() => setShowProfileUpdate(false)}
        />
      )}
    </div>
  );
}