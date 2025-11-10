import { pool } from '../../config/db.js';
import { Event } from '../entities/Event.js';

export class EventRepository {
    async getAllEvents() {
        const sql = 'SELECT eventid, eventtitle, eventdesc, eventdate, eventlocation, eventpic, clubid FROM events';
        const { rows } = await pool.query(sql);
        return rows.map(row => new Event(row));
    }

    async getEventById(eventid) {
        const sql = 'SELECT eventid, eventtitle, eventdesc, eventdate, eventlocation, eventpic, clubid FROM events WHERE eventid = $1';
        const { rows } = await pool.query(sql, [eventid]);
        return rows[0] ? new Event(rows[0]) : null;
    }

    async getEventsByClubId(clubid) {
        const sql = 'SELECT eventid, eventtitle, eventdesc, eventdate, eventlocation, eventpic, clubid FROM events WHERE clubid = $1';
        const { rows } = await pool.query(sql, [clubid]);
        return rows.map(row => new Event(row));
    }

    async getUpcomingEvents() {
        const sql = 'SELECT eventid, eventtitle, eventdesc, eventdate, eventlocation, eventpic, clubid FROM events WHERE eventdate >= NOW() ORDER BY eventdate ASC';
        const { rows } = await pool.query(sql);
        return rows.map(row => new Event(row));
    }

    async getPastEvents() {
        const sql = 'SELECT eventid, eventtitle, eventdesc, eventdate, eventlocation, eventpic, clubid FROM events WHERE eventdate < NOW() ORDER BY eventdate DESC';
        const { rows } = await pool.query(sql);
        return rows.map(row => new Event(row));
    }

    async getUpcomingEventsByClubId(clubid) {
        const sql = 'SELECT eventid, eventtitle, eventdesc, eventdate, eventlocation, eventpic, clubid FROM events WHERE clubid = $1 AND eventdate >= NOW() ORDER BY eventdate ASC';
        const { rows } = await pool.query(sql, [clubid]);
        return rows.map(row => new Event(row));
    }

    async getPastEventsByClubId(clubid) {
        const sql = 'SELECT eventid, eventtitle, eventdesc, eventdate, eventlocation, eventpic, clubid FROM events WHERE clubid = $1 AND eventdate < NOW() ORDER BY eventdate DESC';
        const { rows } = await pool.query(sql, [clubid]);
        return rows.map(row => new Event(row));
    }

    async getEventsByLocation(eventlocation) {
        const sql = 'SELECT eventid, eventtitle, eventdesc, eventdate, eventlocation, eventpic, clubid FROM events WHERE eventlocation = $1';
        const { rows } = await pool.query(sql, [eventlocation]);
        return rows.map(row => new Event(row));
    }

    async getEventsByLocationSearch(eventlocation) {
        const sql = 'SELECT eventid, eventtitle, eventdesc, eventdate, eventlocation, eventpic, clubid FROM events WHERE eventlocation ILIKE $1';
        const { rows } = await pool.query(sql, [`%${eventlocation}%`]);
        return rows.map(row => new Event(row));
    }

    async getEventsBySearch(query) {
        const sql = 'SELECT eventid, eventtitle, eventdesc, eventdate, eventlocation, eventpic, clubid FROM events WHERE eventname ILIKE $1 OR eventdesc ILIKE $1';
        const { rows } = await pool.query(sql, [`%${query}%`]);
        return rows.map(row => new Event(row));
    }

    async createEvent({ clubid, eventtitle, eventdesc, eventdate, eventlocation, eventpic }) {
        const sql = 'INSERT INTO events (clubid, eventtitle, eventdesc, eventdate, eventlocation, eventpic, eventcdate) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING eventid, eventtitle, eventdesc, eventdate, eventlocation, eventpic, clubid';
        const { rows } = await pool.query(sql, [clubid, eventtitle, eventdesc, eventdate, eventlocation, eventpic]);
        return new Event(rows[0]);
    }

    async updateEvent(eventid, { clubid, eventtitle, eventdesc, eventdate, eventlocation, eventpic }) {
        const sql = 'UPDATE events SET clubid = $1, eventtitle = $2, eventdesc = $3, eventdate = $4, eventlocation = $5, eventpic = $6, updated_at = NOW() WHERE eventid = $7 RETURNING eventid, eventtitle, eventdesc, eventdate, eventlocation, eventpic, clubid';
        const { rows } = await pool.query(sql, [clubid, eventtitle, eventdesc, eventdate, eventlocation, eventpic, eventid]);
        return rows[0] ? new Event(rows[0]) : null;
    }

    async updateEventDate(eventid, eventdate) {
        const sql = 'UPDATE events SET eventdate = $1, updated_at = NOW() WHERE eventid = $2 RETURNING eventid, eventtitle, eventdesc, eventdate, eventlocation, eventpic, clubid';
        const { rows } = await pool.query(sql, [eventdate, eventid]);
        return rows[0] ? new Event(rows[0]) : null;
    }

    async deleteEvent(eventid) {
        const sql = 'DELETE FROM events WHERE eventid = $1 RETURNING eventid, eventtitle, eventdesc, eventdate, eventlocation, eventpic, clubid';
        const { rows } = await pool.query(sql, [eventid]);
        return rows.length > 0;
    }

    async countEvents() {
        const sql = 'SELECT COUNT(*) FROM events';
        const { rows } = await pool.query(sql);
        return parseInt(rows[0].count, 10);
    }

    async countEventsByClubId(clubid) {
        const sql = 'SELECT COUNT(*) FROM events WHERE clubid = $1';
        const { rows } = await pool.query(sql, [clubid]);
        return parseInt(rows[0].count, 10);
    }

    async countUpcomingEvents() {
        const sql = 'SELECT COUNT(*) FROM events WHERE eventdate >= NOW()';
        const { rows } = await pool.query(sql);
        return parseInt(rows[0].count, 10);
    }

    async countPastEvents() {
        const sql = 'SELECT COUNT(*) FROM events WHERE eventdate < NOW()';
        const { rows } = await pool.query(sql);
        return parseInt(rows[0].count, 10);
    }

    async countUpcomingEventsByClubId(clubid) {
        const sql = 'SELECT COUNT(*) FROM events WHERE clubid = $1 AND eventdate >= NOW()';
        const { rows } = await pool.query(sql, [clubid]);
        return parseInt(rows[0].count, 10);
    }

    async countPastEventsByClubId(clubid) {
        const sql = 'SELECT COUNT(*) FROM events WHERE clubid = $1 AND eventdate < NOW()';
        const { rows } = await pool.query(sql, [clubid]);
        return parseInt(rows[0].count, 10);
    }

    async countEventsByLocation(eventlocation) {
        const sql = 'SELECT COUNT(*) FROM events WHERE eventlocation = $1';
        const { rows } = await pool.query(sql, [eventlocation]);
        return parseInt(rows[0].count, 10);
    }

    async existsEventByTitleAndDate(eventtitle, eventdate) {
        const sql = 'SELECT 1 FROM events WHERE eventtitle = $1 AND eventdate = $2';
        const { rows } = await pool.query(sql, [eventtitle, eventdate]);
        return rows.length > 0;
    }
}