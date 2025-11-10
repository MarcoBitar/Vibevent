import React, { useEffect, useState } from 'react';
import StatBox from '../StatBox/StatBox.jsx';
import TrendChart from '../TrendChart/TrendChart.jsx';
import EventService from '../../services/EventService.js';
import AttendanceService from '../../services/AttendanceService.js';
import ClubService from '../../services/ClubService.js';
import './ClubDashboard.css';

export default function ClubDashboard() {
  // === State ===
  const [club, setClub] = useState(null);               // club profile info
  const [rank, setRank] = useState('-');                // leaderboard rank
  const [totalAttends, setTotalAttends] = useState(0);  // total attendees across all events
  const [totalEvents, setTotalEvents] = useState(0);    // total events created
  const [monthlyAttends, setMonthlyAttends] = useState([]); // monthly attendance trend
  const [loading, setLoading] = useState(false);        // loading state

  // === Service Instances ===
  const clubService = new ClubService();
  const eventService = new EventService();
  const attendanceService = new AttendanceService();

  // === Fetch Dashboard Data on Mount ===
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Load club info from localStorage
        const clubid = localStorage.getItem('clubid');
        const clubname = localStorage.getItem('clubname');
        const clubpoints = localStorage.getItem('clubpoints');
        const clubpic = localStorage.getItem('clubpic');
        setClub({ clubid, clubname, clubpoints, clubpic });

        // Fetch rank (fallback to raw value if no .rank key)
        const clubRank = await clubService.getRank(clubid);
        setRank(clubRank.rank || clubRank || '-');

        // Fetch all events created by this club
        const allEvents = await eventService.getByClub(clubid);
        setTotalEvents(allEvents.length);

        // Fetch attendance for each event and aggregate totals
        let totalAttendanceCount = 0;
        const eventsWithAttendance = await Promise.all(
          allEvents.map(async ev => {
            const attends = await attendanceService.getByEvent(ev.eventid);
            const attendanceCount = attends?.length || 0;
            totalAttendanceCount += attendanceCount;
            return { ...ev, attendanceCount };
          })
        );
        setTotalAttends(totalAttendanceCount);

        // Build month → attendance count map
        const monthMap = {};
        eventsWithAttendance.forEach(ev => {
          const monthNum = new Date(ev.eventdate).getMonth(); // 0–11
          monthMap[monthNum] = (monthMap[monthNum] || 0) + ev.attendanceCount;
        });

        // Format for chart: [{ month: 'Jan', attendees: 42 }, ...]
        const formatted = Object.keys(monthMap)
          .sort((a, b) => a - b)
          .map(monthNum => ({
            month: new Date(0, parseInt(monthNum)).toLocaleString('default', { month: 'short' }),
            attendees: monthMap[monthNum]
          }));

        setMonthlyAttends(formatted);
      } catch (err) {
        console.error('Error loading club dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // === Loading State ===
  if (loading || !club) {
    return <div className="loading">Loading club dashboard...</div>;
  }

  // === Dashboard UI ===
  return (
    <div className="club-dashboard">
      {/* Greeting Section */}
      <div className="club-greeting">
        <img src={club.clubpic} alt="Club Visual" className="pic" />
        <div>
          <h2>Welcome, {club.clubname}!</h2>
          <p>Here’s how your club is performing so far!</p>
        </div>
      </div>

      {/* Stat Summary */}
      <div className="club-stats">
        <StatBox label="Points" value={club.clubpoints || 0} variant="purple" />
        <StatBox label="Events Created" value={totalEvents} variant="green" />
        <StatBox label="Total Attendees" value={totalAttends} variant="blue" />
        <StatBox label="Rank" value={`#${rank}`} variant="pink" />
      </div>

      {/* Attendance Trend Chart */}
      <div className="club-attendance-section">
        <h3>Attendance Trend</h3>
        <p className="note">Monthly attendance for your events.</p>
        <TrendChart
          title="Monthly Attendance"
          data={monthlyAttends}
          dataKey="attendees"
          color="#6a00f4"
        />
      </div>
    </div>
  );
}