import React from 'react';
import './LeaderboardRow.css';

// LeaderboardRow displays a single ranked entry with avatar, name, stats, and highlight styling
export default function LeaderboardRow({ rank, pic, name, events, points }) {
  // Apply highlight class for top 3 ranks
  const highlight =
    rank === 1 ? 'gold' :
    rank === 2 ? 'silver' :
    rank === 3 ? 'bronze' :
    '';

  return (
    <div className={`leaderboard-row ${highlight}`}>
      <div className="rank">#{rank}</div>               {/* Rank number */}
      <img src={pic} alt={`${name} pic`} className="avatar" /> {/* Profile image */}
      <div className="name">{name}</div>                {/* Display name */}
      <div className="events">{events} events</div>     {/* Event count */}
      <div className="points">{points} pts</div>        {/* Points total */}
    </div>
  );
}