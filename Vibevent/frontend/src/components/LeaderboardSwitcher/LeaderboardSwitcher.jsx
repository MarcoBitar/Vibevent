import React, { useState, useEffect } from 'react';
import LeaderboardList from '../LeaderboardList/LeaderboardList.jsx';
import LeaderboardStats from '../LeaderboardStats/LeaderboardStats.jsx';
import ClubService from '../../services/ClubService.js';
import EventService from '../../services/EventService.js';
import UserService from '../../services/UserService.js';
import RSVPService from '../../services/RSVPService.js';
import AttendanceService from '../../services/AttendanceService.js';
import './LeaderboardSwitcher.css';

// LeaderboardSwitcher toggles between club and student leaderboards, fetching data and rendering stats + list
export default function LeaderboardSwitcher() {
  // UI state
  const [activeTab, setActiveTab] = useState('clubs');
  const [clubs, setClubs] = useState([]);
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  // Service instances
  const clubService = new ClubService();
  const eventService = new EventService();
  const userService = new UserService();
  const rsvpService = new RSVPService();
  const attendanceService = new AttendanceService();

  // Fetch leaderboard data on tab change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // === CLUBS ===
        const allClubs = await clubService.getAll();
        const allEvents = await eventService.getAll();
        const topClubs = allClubs.length > 0 ? await clubService.getTop(10) : [];

        // Attach event count to each top club
        const clubsWithEvents = topClubs.map(club => ({
          ...club,
          eventsCreated: allEvents.filter(e => e.clubid === club.clubid).length
        }));

        // === STUDENTS ===
        const allStudents = await userService.getAll();
        const topStudents = allStudents.length > 0 ? await userService.getTop(10) : [];
        const allAttends = await attendanceService.getAll();
        const allRsvps = await rsvpService.getAll();

        // Attach attendance count to each top student
        const studentsWithEvents = topStudents.map(student => ({
          ...student,
          eventsAttended: allAttends.filter(a => a.userid === student.userid).length
        }));

        // === STATS ===
        const clubStats = {
          totalClubs: allClubs.length,
          totalEvents: allEvents.length,
          topClub: clubsWithEvents[0] || null
        };

        const studentStats = {
          totalStudents: allStudents.length,
          totalRsvps: allRsvps.length,
          topStudent: studentsWithEvents[0] || null
        };

        // Update state
        setClubs(clubsWithEvents);
        setStudents(studentsWithEvents);
        setStats(activeTab === 'clubs' ? clubStats : studentStats);
      } catch (err) {
        console.error('Failed to load leaderboard data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  // Loading fallback
  if (loading) return <div className="loading">Loading leaderboard...</div>;

  return (
    <div className="leaderboard-switcher">
      {/* Tab selector */}
      <div className="tabs">
        <button
          className={activeTab === 'clubs' ? 'active' : ''}
          onClick={() => setActiveTab('clubs')}
        >
          Club Championship
        </button>
        <button
          className={activeTab === 'students' ? 'active' : ''}
          onClick={() => setActiveTab('students')}
        >
          Student Hall of Fame
        </button>
      </div>

      {/* Stats summary */}
      <LeaderboardStats
        stats={stats}
        activeTab={activeTab}
      />

      {/* Ranked list */}
      <LeaderboardList
        data={activeTab === 'clubs' ? clubs : students}
        activeTab={activeTab}
      />
    </div>
  );
}