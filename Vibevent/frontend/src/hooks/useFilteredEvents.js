import { useState, useEffect } from 'react';
import EventService from '../services/EventService.js';

// useFilteredEvents fetches events based on filter type ('upcoming', 'past', or 'all')
// refresh param triggers re-fetch when incremented externally
export function useFilteredEvents(filter = 'upcoming', refresh = 0) {
  const [events, setEvents] = useState([]);     // filtered event list
  const [loading, setLoading] = useState(true); // loading flag

  const eventService = new EventService();      // service instance

  useEffect(() => {
    async function fetchFiltered() {
      setLoading(true);
      try {
        let data = [];

        // === Filter logic ===
        if (filter === 'upcoming') {
          data = await eventService.getUpcoming();
        } else if (filter === 'past') {
          data = await eventService.getPast();
        } else {
          data = await eventService.getAll();
        }

        setEvents(data);
      } catch (err) {
        console.error(`Failed to fetch ${filter} events:`, err);
      } finally {
        setLoading(false);
      }
    }

    fetchFiltered();
  }, [filter, refresh]); // re-run when filter or refresh changes

  // === Hook API ===
  return { events, loading };
}