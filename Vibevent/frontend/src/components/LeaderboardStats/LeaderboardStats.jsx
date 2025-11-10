import React from 'react';
import StatBox from '../StatBox/StatBox.jsx';
import './LeaderboardStats.css';

// LeaderboardStats displays summary metrics based on activeTab context (clubs vs students)
export default function LeaderboardStats({ stats, activeTab }) {
  return (
    <div className="leaderboard-stats">
      {/* === Club Stats View === */}
      {activeTab === 'clubs' && (
        <>
          <StatBox label="Total Clubs" value={stats.totalClubs} variant="purple" />
          <StatBox label="Total Events" value={stats.totalEvents} variant="green" />
          <StatBox
            label="Champion Club"
            value={stats.topClub ? stats.topClub.clubname : 'N/A'}
            variant="orange"
          />
        </>
      )}

      {/* === Student Stats View === */}
      {activeTab === 'students' && (
        <>
          <StatBox label="Active Students" value={stats.totalStudents} variant="pink" />
          <StatBox label="Total RSVPs" value={stats.totalRsvps} variant="purple" />
          <StatBox
            label="Top Student"
            value={stats.topStudent ? stats.topStudent.username : 'N/A'}
            variant="green"
          />
        </>
      )}
    </div>
  );
}