import React, { useEffect, useState } from 'react';
import StatBox from '../StatBox/StatBox.jsx';
import TrendChart from '../TrendChart/TrendChart.jsx';
import UserService from '../../services/UserService.js';
import RSVPService from '../../services/RSVPService.js';
import EventService from '../../services/EventService.js';
import AttendanceService from '../../services/AttendanceService.js';
import './UserDashboard.css';

export default function UserDashboard() {
  // === State ===
  const [user, setUser] = useState(null);             // user profile info
  const [rank, setRank] = useState('-');              // leaderboard rank
  const [totalRSVPs, setTotalRSVPs] = useState(0);    // total RSVPs
  const [attends, setAttends] = useState(0);          // total attended events
  const [monthlyRSVPs, setMonthlyRSVPs] = useState([]); // RSVP trend data
  const [loading, setLoading] = useState(false);      // loading state

  // === Service Instances ===
  const userService = new UserService();
  const rsvpService = new RSVPService();
  const eventService = new EventService();
  const attendanceService = new AttendanceService();

  // === Fetch Dashboard Data on Mount ===
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Load user info from localStorage
        const userid = localStorage.getItem('userid');
        const username = localStorage.getItem('username');
        const userpoints = localStorage.getItem('userpoints');
        const userpic = localStorage.getItem('userpic');
        setUser({ userid, username, userpoints, userpic });

        // Fetch rank (fallback to raw value if no .rank key)
        const userRank = await userService.getRank(userid);
        setRank(userRank.rank || userRank || '-');

        // Fetch RSVP and attendance counts
        const rsvps = await rsvpService.getByUser(userid);
        setTotalRSVPs(rsvps.length);

        const attendance = await attendanceService.getByUser(userid);
        setAttends(attendance.length);

        // Fetch event dates for RSVP trend chart
        const eventsWithDates = await Promise.all(
          rsvps.map(async rsvp => {
            const event = await eventService.getById(rsvp.eventid);
            return event?.eventdate ? new Date(event.eventdate) : null;
          })
        );

        // Build month → count map
        const monthMap = {};
        eventsWithDates.forEach(date => {
          if (date) {
            const monthNum = date.getMonth(); // 0–11
            monthMap[monthNum] = (monthMap[monthNum] || 0) + 1;
          }
        });

        // Format for chart: [{ month: 'Jan', rsvps: 3 }, ...]
        const formatted = Object.keys(monthMap)
          .sort((a, b) => a - b)
          .map(monthNum => ({
            month: new Date(0, parseInt(monthNum)).toLocaleString('default', { month: 'short' }),
            rsvps: monthMap[monthNum]
          }));

        setMonthlyRSVPs(formatted);
      } catch (err) {
        console.error('Error loading user dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // === Loading State ===
  if (loading || !user) {
    return <div className="loading">Loading your dashboard...</div>;
  }

  // === Dashboard UI ===
  return (
    <div className="user-dashboard">
      {/* Greeting Section */}
      <div className="user-greeting">
        <img src={user.userpic} alt="Dashboard Visual" className="pic" />
        <div>
          <h2>Hey {user.username}!</h2>
          <p>Here’s how your journey’s looking so far!</p>
        </div>
      </div>

      {/* Stat Summary */}
      <div className="user-stats">
        <StatBox label="Points" value={user.userpoints || 0} variant="purple" />
        <StatBox label="Attends" value={attends} variant="blue" />
        <StatBox label="RSVPs" value={totalRSVPs} variant="orange" />
        <StatBox label="Rank" value={`#${rank}`} variant="pink" />
      </div>

      {/* RSVP Trend Chart */}
      <div className="user-rsvp-section">
        <h3>Your RSVP Activity</h3>
        <p className="note">Monthly RSVP trend for your events.</p>
        <TrendChart
          title="Monthly RSVPs"
          data={monthlyRSVPs}
          dataKey="rsvps"
          color="#b47aea"
        />
      </div>
    </div>
  );
}