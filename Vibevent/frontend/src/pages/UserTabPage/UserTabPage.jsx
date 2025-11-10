import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import './UserTabPage.css';

import { useFilteredEvents } from '../../hooks/useFilteredEvents';
import FeaturedEventCard from '../../components/FeaturedEventCard/FeaturedEventCard';
import EventCard from '../../components/EventCard/EventCard';
import UserDashboard from '../../components/UserDashboard/UserDashboard.jsx';
import LeaderboardPage from '../LeaderboardPage/LeaderboardPage.jsx';
import { useClubs } from '../../hooks/useClubs.js';
import { useRSVPs } from '../../hooks/useRSVPs.js';

export default function UserTabPage() {
  const navigate = useNavigate();
  const { getClubById } = useClubs();
  const { getRSVPCountByEventId } = useRSVPs();

  // UI state
  const [activeTab, setActiveTab] = useState('Events');
  const [searchQuery, setSearchQuery] = useState('');

  // Event + club hydration state
  const { events, loading } = useFilteredEvents('upcoming');
  const [clubName, setClubName] = useState('');
  const [rsvpCount, setRsvpCount] = useState(0);
  const [clubNames, setClubNames] = useState({});
  const [rsvpCounts, setRsvpCounts] = useState({});

  // Filter events by search query
  const filteredEvents = useMemo(() => {
    if (!searchQuery) return events;
    const query = searchQuery.toLowerCase();
    return events.filter(event =>
      event.eventtitle.toLowerCase().includes(query) ||
      event.eventdesc.toLowerCase().includes(query)
    );
  }, [events, searchQuery]);

  // Pick one featured event at random
  const featuredEvent = useMemo(() => {
    if (!filteredEvents.length) return null;
    return filteredEvents[Math.floor(Math.random() * filteredEvents.length)];
  }, [filteredEvents]);

  // All other events (non-featured)
  const otherEvents = useMemo(
    () => filteredEvents.filter(e => e.eventid !== featuredEvent?.eventid),
    [filteredEvents, featuredEvent]
  );

  // Extract IDs for hydration
  const clubid = featuredEvent?.clubid;
  const eventid = featuredEvent?.eventid;

  // Format featured event date/time
  const FeventDateTime = featuredEvent?.eventdate ? new Date(featuredEvent.eventdate) : null;
  const FformattedDate = FeventDateTime ? FeventDateTime.toLocaleDateString() : 'Date not available';
  const FformattedTime = FeventDateTime ? FeventDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Time not available';

  // Hydrate featured event's club name and RSVP count
  useEffect(() => {
    async function hydrateFeatured() {
      if (clubid) {
        const club = await getClubById(clubid);
        setClubName(club?.clubname || 'Unknown Club');
      }
      if (eventid) {
        const result = await getRSVPCountByEventId(eventid);
        setRsvpCount(result?.count || 0);
      }
    }
    hydrateFeatured();
  }, [clubid, eventid, getClubById, getRSVPCountByEventId]);

  // Hydrate all other events' club names and RSVP counts
  useEffect(() => {
    async function hydrateEvents() {
      const clubMap = {};
      const rsvpMap = {};
      for (const event of otherEvents) {
        if (event.clubid && !clubMap[event.clubid]) {
          const club = await getClubById(event.clubid);
          clubMap[event.clubid] = club?.clubname || 'Unknown Club';
        }
        if (event.eventid && !rsvpMap[event.eventid]) {
          const result = await getRSVPCountByEventId(event.eventid);
          rsvpMap[event.eventid] = result?.count || 0;
        }
      }
      setClubNames(clubMap);
      setRsvpCounts(rsvpMap);
    }
    if (otherEvents.length) hydrateEvents();
  }, [otherEvents, getClubById, getRSVPCountByEventId]);

  const userId = localStorage.getItem('userid');

  return (
    <div className="user-tab-page">
      {/* Header with role switch */}
      <HeaderTop
        onSwitchRole={() => {
          const currentRole = localStorage.getItem('role') || 'user';
          const oppositeRole = currentRole === 'user' ? 'club' : 'user';
          navigate('/auth', { state: { role: oppositeRole } });
        }}
      />

      {/* Tab navigation */}
      <HeaderNav activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="content-area">
        {/* === Events Tab === */}
        {activeTab === 'Events' && !loading && (
          <>
            <div className="campus-events-banner"><h1>Campus Events</h1></div>

            {/* Search bar */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Search events..."
                className="event-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Featured event */}
            <div className='featured-event'>
              {featuredEvent && (
                <FeaturedEventCard
                  eventid={featuredEvent.eventid}
                  userid={userId}
                  image={featuredEvent.eventpic}
                  title={featuredEvent.eventtitle}
                  club={clubName}
                  description={featuredEvent.eventdesc}
                  date={FformattedDate}
                  time={FformattedTime}
                  location={featuredEvent.eventlocation}
                  rsvpCount={rsvpCount}
                />
              )}
            </div>

            {/* Grid of other events */}
            <div className="event-grid">
              {otherEvents.map(event => {
                const eventDateTime = event.eventdate ? new Date(event.eventdate) : null;
                const formattedDate = eventDateTime ? eventDateTime.toLocaleDateString() : 'Date not available';
                const formattedTime = eventDateTime ? eventDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Time not available';

                return (
                  <EventCard
                    key={event.eventid}
                    eventid={event.eventid}
                    userid={userId}
                    image={event.eventpic}
                    title={event.eventtitle}
                    club={clubNames[event.clubid]}
                    description={event.eventdesc}
                    date={formattedDate}
                    time={formattedTime}
                    location={event.eventlocation}
                    rsvpCount={rsvpCounts[event.eventid]}
                  />
                );
              })}
            </div>
          </>
        )}

        {/* === Dashboard Tab === */}
        {activeTab === 'Dashboard' && <UserDashboard />}

        {/* === Leaderboards Tab === */}
        {activeTab === 'Leaderboards' && <LeaderboardPage />}
      </div>
    </div>
  );
}