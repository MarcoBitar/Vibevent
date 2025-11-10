import React from 'react';
import LeaderboardRow from '../LeaderboardRow/LeaderboardRow.jsx';
import './LeaderboardList.css';

// LeaderboardList renders a list of ranked users or clubs based on activeTab
export default function LeaderboardList({ data = [], activeTab }) {
  return (
    <div className="leaderboard-list">
      {data.map((item, index) => {
        const rank = index + 1;

        // Extract fields based on tab context
        const pic = activeTab === 'clubs' ? item.clubpic : item.userpic;
        const name = activeTab === 'clubs' ? item.clubname : item.username;
        const events = activeTab === 'clubs' ? item.eventsCreated : item.eventsAttended;
        const points = activeTab === 'clubs' ? item.clubpoints : item.userpoints;

        return (
          <LeaderboardRow
            key={item.id || item.userid || item.clubid} // fallback-safe key
            rank={rank}
            pic={pic}
            name={name}
            events={events}
            points={points}
          />
        );
      })}
    </div>
  );
}