import { RSVPDTO } from '../domain/dto/RSVPDTO.js';
import { NotificationFactory } from '../domain/factory/NotificationFactory.js';

export class RSVPService {
    constructor(rsvpRepository, eventRepository, userRepository, notificationRepository) {
        this.rsvpRepository = rsvpRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.notificationRepository = notificationRepository;
    }

    async getAllRSVPs() {
        const rsvps = await this.rsvpRepository.getAllRSVPs();
        return rsvps.map(RSVPDTO.fromEntity);
    }

    async getRSVPById(rsvpid) {
        const rsvp = await this.rsvpRepository.getRSVPById(rsvpid);
        if (!rsvp) throw new Error('RSVP not found');
        return RSVPDTO.fromEntity(rsvp);
    }

    async getRSVPsByEventId(eventid) {
        const rsvps = await this.rsvpRepository.getRSVPsByEventId(eventid);
        return rsvps.map(RSVPDTO.fromEntity);
    }

    async getRSVPsByUserId(userid) {
        const rsvps = await this.rsvpRepository.getRSVPsByUserId(userid);
        return rsvps.map(RSVPDTO.fromEntity);
    }

    async getRSVPByEventAndUser(eventid, userid) {
        const rsvp = await this.rsvpRepository.getRSVPByEventAndUser(eventid, userid);
        if (!rsvp) throw new Error('RSVP not found');
        return RSVPDTO.fromEntity(rsvp);
    }

    async getRSVPsByStatusandEventId(rsvpstatus, eventid) {
        const rsvps = await this.rsvpRepository.getRSVPsByStatusandEventId(rsvpstatus, eventid);
        return rsvps.map(RSVPDTO.fromEntity);
    }

    async getUserByRSVPStatusandEventId(rsvpstatus, eventid) {
        return await this.rsvpRepository.getUserByRSVPStatusandEventId(rsvpstatus, eventid);
    }

    async createRSVP(rsvpData) {
        if (!rsvpData || !rsvpData.userid || !rsvpData.eventid || !rsvpData.rsvpstatus)
            throw new Error('Missing RSVP data');

        const event = await this.eventRepository.getEventById(rsvpData.eventid);
        if (!event) throw new Error('Event not found');

        const now = new Date();
        if (new Date(event.eventdate) < now) throw new Error('Cannot RSVP to a completed event');

        const exists = await this.rsvpRepository.existsRSVPByEventandUserId(rsvpData.eventid, rsvpData.userid);
        if (exists) throw new Error('RSVP already exists');

        const rsvp = await this.rsvpRepository.createRSVP(rsvpData);
        const user = await this.userRepository.getUserById(rsvpData.userid);

        await Promise.all([
            this.notificationRepository.createNotification(
                NotificationFactory.forRSVPStatusChanged(event.clubid, user, event, rsvpData.rsvpstatus)
            )
        ]);

        return RSVPDTO.fromEntity(rsvp);
    }

    async updateRSVPStatus(rsvpid, rsvpstatus) {
        const rsvp = await this.rsvpRepository.getRSVPById(rsvpid);
        if (!rsvp) throw new Error('RSVP not found');

        const event = await this.eventRepository.getEventById(rsvp.eventid);
        if (!event) throw new Error('Event not found');

        const now = new Date();
        if (new Date(event.eventdate) < now) throw new Error('Cannot update RSVP for a completed event');

        const updated = await this.rsvpRepository.updateRSVPStatus(rsvpid, rsvpstatus);
        const user = await this.userRepository.getUserById(rsvp.userid);

        await Promise.all([
            this.notificationRepository.createNotification(
                NotificationFactory.forRSVPStatusChanged(event.clubid, user, event, rsvpstatus)
            )
        ]);

        return RSVPDTO.fromEntity(updated);
    }

    async deleteRSVP(rsvpid) {
        const rsvp = await this.rsvpRepository.getRSVPById(rsvpid);
        if (!rsvp) throw new Error('RSVP not found');
        return await this.rsvpRepository.deleteRSVP(rsvpid);
    }

    async deleteRSVPByEventId(eventid) {
        const rsvps = await this.rsvpRepository.countRSVPsByEventId(eventid);
        if (rsvps.length === 0) throw new Error('No RSVPs found for this event');
        return await this.rsvpRepository.deleteRSVPByEventId(eventid);
    }

    async deleteRSVPByUserId(userid) {
        const rsvps = await this.rsvpRepository.getRSVPsByUserId(userid);
        if (rsvps.length === 0) throw new Error('No RSVPs found for this user');
        return await this.rsvpRepository.deleteRSVPByUserId(userid);
    }

    async countRSVPsByEventId(eventid) {
        const count = await this.rsvpRepository.countRSVPsByEventId(eventid);
        return typeof count === 'number' ? count : 0;
    }

    async countRSVPsByStatusandUserId(userid, rsvpstatus) {
        const count = await this.rsvpRepository.countRSVPsByStatusandUserId(userid, rsvpstatus);
        return typeof count === 'number' ? count : 0;
    }

    async countRSVPsByStatusandEventId(eventid, rsvpstatus) {
        const count = await this.rsvpRepository.countRSVPsByStatusandEventId(eventid, rsvpstatus);
        return typeof count === 'number' ? count : 0;
    }

    async existsRSVPByEventandUserId(eventid, userid) {
        return await this.rsvpRepository.existsRSVPByEventandUserId(eventid, userid);
    }
}