import React from 'react';
import LeaderboardSwitcher from '../../components/LeaderboardSwitcher/LeaderboardSwitcher.jsx';
import './LeaderBoardPage.css';

export default function LeaderBoardPage() {
  return (
    <div className="leaderboard-page">
      <header className="leaderboard-header">
        <h1>Campus Leaderboards</h1>
        <p>See who's dominating the campus engagement scene!</p>
      </header>

      <LeaderboardSwitcher />
    </div>
  );
}
