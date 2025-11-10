import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CoverPage.css";
import RoleSelectionForm from "../../components/RoleSelectorForm/RoleSelectorForm.jsx";
import Logo from "../../assets/Logo.png";

// Services for fetching counts
import UserService from "../../services/UserService.js";
import ClubService from "../../services/ClubService.js";
import EventService from "../../services/EventService.js";
import AchievementService from "../../services/AchievementService.js";

const CoverPage = () => {
  // UI state for role selection modal
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [role, setRole] = useState(null);

  // Stats for live campus activity
  const [stats, setStats] = useState({
    students: 0,
    clubs: 0,
    events: 0,
    achs: 0
  });

  const navigate = useNavigate();

  // Instantiate services
  const userService = new UserService();
  const clubService = new ClubService();
  const eventService = new EventService();
  const achService = new AchievementService();

  // Load stats on mount
  useEffect(() => {
    const loadStats = async () => {
      try {
        const [students, clubs, events, achs] = await Promise.all([
          userService.count(),
          clubService.count(),
          eventService.count(),
          achService.count()
        ]);

        setStats({
          students: students.count,
          clubs: clubs.count,
          events: events.count,
          achs: achs.count
        });
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    loadStats();
  }, []);

  // Navigate to auth page when role is selected
  useEffect(() => {
    if (!role) return;

    setShowRoleSelection(false);
    navigate("/auth", { state: { role } });
  }, [role]);

  return (
    <div className="cover-container">
      <div className="overlay"></div>

      {/* Header with logo and brand */}
      <header className="header">
        <div className="brand">
          <img src={Logo} alt="Vibevent Logo" className="logo" />
          <div>
            <h2>Vibevent</h2>
            <p>Campus Life, Amplified</p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="content">
        <span className="tagline">The Future of Campus Events</span>
        <h1>
          Where Campus <br />
          <span className="highlight">Comes Alive</span>
        </h1>
        <p className="desc">
          Join the revolution in campus engagement. Discover events, earn
          rewards, compete with friends, and make your mark on campus life.
        </p>

        {/* Feature cards */}
        <div className="features">
          <div className="feature-card">
            <i className="icon">📅</i>
            <h4>Smart Event Discovery</h4>
            <p>Find events that match your interests and schedule</p>
          </div>
          <div className="feature-card">
            <i className="icon">🏆</i>
            <h4>Gamified Engagement</h4>
            <p>Earn points, unlock achievements, and climb leaderboards</p>
          </div>
          <div className="feature-card">
            <i className="icon">🤝🏼</i>
            <h4>Community Building</h4>
            <p>Connect with clubs and fellow students across campus</p>
          </div>
        </div>

        {/* CTA button */}
        <button className="get-started" onClick={() => setShowRoleSelection(true)}>
          Get Started →
        </button>

        {/* Live stats block */}
        <div className="stats-card">
          <h4>⚡ Live Campus Activity</h4>
          <div className="stats">
            <div className="stats-feature">
              <i className="icon">👥</i>
              <h3>{stats.students}</h3>
              <p>Active Students</p>
            </div>
            <div className="stats-feature">
              <i className="icon">🏛️</i>
              <h3>{stats.clubs}</h3>
              <p>Campus Clubs</p>
            </div>
            <div className="stats-feature">
              <i className="icon">🏟️</i>
              <h3>{stats.events}</h3>
              <p>Total Events</p>
            </div>
            <div className="stats-feature">
              <i className="icon">🙏🏼</i>
              <h3>{stats.achs}</h3>
              <p>Total Achievements</p>
            </div>
          </div>
        </div>
      </div>

      {/* Role selection modal */}
      {showRoleSelection && !role && (
        <div className="role-form-wrapper">
          <RoleSelectionForm
            onSelect={(selectedRole) => {
              if (selectedRole) {
                setRole(selectedRole);
              } else {
                setShowRoleSelection(false);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CoverPage;