import { EventDTO } from '../domain/dto/EventDTO.js';
import { NotificationFactory } from '../domain/factory/NotificationFactory.js'

export class EventService {
  constructor(eventRepository, notificationRepository, clubRepository, userRepository) {
    this.eventRepository = eventRepository;
    this.notificationRepository = notificationRepository;
    this.clubRepository = clubRepository;
    this.userRepository = userRepository;
  }

  async getAllEvents() {
    const events = await this.eventRepository.getAllEvents();
    return events.map(EventDTO.fromEntity);
  }

  async getEventById(eventid) {
    const event = await this.eventRepository.getEventById(eventid);
    if (!event) throw new Error('Event not found');
    return EventDTO.fromEntity(event);
  }

  async getEventsByClubId(clubid) {
    const events = await this.eventRepository.getEventsByClubId(clubid);
    return events.map(EventDTO.fromEntity);
  }

  async getUpcomingEvents() {
    const events = await this.eventRepository.getUpcomingEvents();
    return events.map(EventDTO.fromEntity);
  }

  async getPastEvents() {
    const events = await this.eventRepository.getPastEvents();
    return events.map(EventDTO.fromEntity);
  }

  async getUpcomingEventsByClubId(clubid) {
    const events = await this.eventRepository.getUpcomingEventsByClubId(clubid);
    return events.map(EventDTO.fromEntity);
  }

  async getPastEventsByClubId(clubid) {
    const events = await this.eventRepository.getPastEventsByClubId(clubid);
    return events.map(EventDTO.fromEntity);
  }

  async getEventsByLocation(eventlocation) {
    const events = await this.eventRepository.getEventsByLocation(eventlocation);
    return events.map(EventDTO.fromEntity);
  }

  async getEventsByLocationSearch(eventlocation) {
    const events = await this.eventRepository.getEventsByLocationSearch(eventlocation);
    return events.map(EventDTO.fromEntity);
  }

  async getEventsBySearch(query) {
    if (!query) return [];
    const events = await this.eventRepository.getEventsBySearch(query);
    return events.map(EventDTO.fromEntity);
  }

  async createEvent(eventData) {
    if (!eventData || !eventData.clubid || !eventData.eventtitle || !eventData.eventdate || !eventData.eventlocation)
      throw new Error('Missing event data');

    const exists = await this.eventRepository.existsEventByTitleAndDate(eventData.eventtitle, eventData.eventdate);
    if (exists) throw new Error('Event already exists on this date');

    const event = await this.eventRepository.createEvent(eventData);
    const club = await this.clubRepository.getClubById(event.clubid);
    const users = (await this.userRepository.getAllUsers()).filter(u => u.userid != null);

    await Promise.all(users.map(async (user) => {
      const notif = {
        ...NotificationFactory.forEventCreated(user.userid, event, club),
        userid: user.userid // ensure userid exists
      };
      try {
        await this.notificationRepository.createNotification(notif);
      } catch (err) {
        console.error('[Event Creation Notification Error]', err, notif);
      }
    }));

    return EventDTO.fromEntity(event);
  }

  async updateEvent(eventid, updateData) {
    if (!updateData) throw new Error('No update data provided');

    const event = await this.eventRepository.getEventById(eventid);
    if (!event) throw new Error('Event not found');

    const finalData = {
      eventtitle: updateData.eventtitle?.trim() || event.eventtitle,
      eventdesc: updateData.eventdesc || event.eventdesc,
      eventdate: updateData.eventdate || event.eventdate,
      eventlocation: updateData.eventlocation || event.eventlocation,
      clubid: updateData.clubid ?? event.clubid,
      eventpic: updateData.eventpic || event.eventpic
    };

    const updated = await this.eventRepository.updateEvent(eventid, finalData);
    const club = await this.clubRepository.getClubById(updated.clubid);
    const users = (await this.userRepository.getAllUsers()).filter(u => u.userid != null);

    await Promise.all(users.map(async (user) => {
      const notif = {
        ...NotificationFactory.forEventUpdated(user.userid, updated, club),
        userid: user.userid
      };
      try {
        await this.notificationRepository.createNotification(notif);
      } catch (err) {
        console.error('[Event Update Notification Error]', err, notif);
      }
    }));

    return EventDTO.fromEntity(updated);
  }

  async updateEventDate(eventid, eventdate) {
    const event = await this.eventRepository.getEventById(eventid);
    if (!event) throw new Error('Event not found');

    const updated = await this.eventRepository.updateEventDate(eventid, eventdate);
    const club = await this.clubRepository.getClubById(updated.clubid);
    const users = (await this.userRepository.getAllUsers()).filter(u => u.userid != null);

    await Promise.all(users.map(async (user) => {
      const notif = {
        ...NotificationFactory.forEventUpdated(user.userid, updated, club),
        userid: user.userid
      };
      try {
        await this.notificationRepository.createNotification(notif);
      } catch (err) {
        console.error('[Event Date Update Notification Error]', err, notif);
      }
    }));

    return EventDTO.fromEntity(updated);
  }

  async deleteEvent(eventid) {
    const event = await this.eventRepository.getEventById(eventid);
    if (!event) throw new Error('Event not found');

    const club = await this.clubRepository.getClubById(event.clubid);
    const users = (await this.userRepository.getAllUsers()).filter(u => u.userid != null);

    await this.eventRepository.deleteEvent(eventid);

    await Promise.all(
      users.map(async (user) => {
        const notif = {
          ...NotificationFactory.forEventDeleted(user.userid, event, club),
          userid: user.userid
        };
        try {
          await this.notificationRepository.createNotification(notif);
        } catch (err) {
          console.error('[Event Delete Notification Error]', err, notif);
        }
      })
    );

    return { success: true };
  }

  async countEvents() {
    const count = await this.eventRepository.countEvents();
    return typeof count === 'number' ? count : 0;
  }

  async countEventsByClubId(clubid) {
    const count = await this.eventRepository.countEventsByClubId(clubid);
    return typeof count === 'number' ? count : 0;
  }

  async countUpcomingEvents() {
    const count = await this.eventRepository.countUpcomingEvents();
    return typeof count === 'number' ? count : 0;
  }

  async countPastEvents() {
    const count = await this.eventRepository.countPastEvents();
    return typeof count === 'number' ? count : 0;
  }

  async countUpcomingEventsByClubId(clubid) {
    const count = await this.eventRepository.countUpcomingEventsByClubId(clubid);
    return typeof count === 'number' ? count : 0;
  }

  async countPastEventsByClubId(clubid) {
    const count = await this.eventRepository.countPastEventsByClubId(clubid);
    return typeof count === 'number' ? count : 0;
  }

  async countEventsByLocation(eventlocation) {
    const count = await this.eventRepository.countEventsByLocation(eventlocation);
    return typeof count === 'number' ? count : 0;
  }

  async existsEventByTitleAndDate(eventtitle, eventdate) {
    return await this.eventRepository.existsEventByTitleAndDate(eventtitle, eventdate);
  }
}