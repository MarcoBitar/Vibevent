import { pool } from '../../config/db.js';
import { RSVP } from '../entities/RSVP.js';
import { User } from '../entities/User.js';

export class RSVPRepository {
    async getAllRSVPs() {
        const sql = 'SELECT rsvpid, rsvpstatus, userid, eventid FROM rsvp';
        const { rows } = await pool.query(sql);
        return rows.map(row => new RSVP(row));
    }

    async getRSVPById(rsvpid) {
        const sql = 'SELECT rsvpid, rsvpstatus, userid, eventid FROM rsvp WHERE rsvpid = $1';
        const { rows } = await pool.query(sql, [rsvpid]);
        return rows[0] ? new RSVP(rows[0]) : null;
    }

    async getRSVPsByEventId(eventid) {
        const sql = 'SELECT rsvpid, rsvpstatus, userid, eventid FROM rsvp WHERE eventid = $1';
        const { rows } = await pool.query(sql, [eventid]);
        return rows.map(row => new RSVP(row));
    }

    async getRSVPsByUserId(userid) {
        const sql = 'SELECT rsvpid, rsvpstatus, userid, eventid FROM rsvp WHERE userid = $1';
        const { rows } = await pool.query(sql, [userid]);
        return rows.map(row => new RSVP(row));
    }

    async getRSVPByEventAndUser(eventid, userid) {
        const sql = 'SELECT rsvpid, rsvpstatus, userid, eventid FROM rsvp WHERE eventid = $1 AND userid = $2';
        const { rows } = await pool.query(sql, [eventid, userid]);
        return rows[0] ? new RSVP(rows[0]) : null;
    }

    async getRSVPsByStatusandEventId(rsvpstatus, eventid) {
        const sql = 'SELECT rsvpid, rsvpstatus, userid, eventid FROM rsvp WHERE rsvpstatus = $1 AND eventid = $2';
        const { rows } = await pool.query(sql, [rsvpstatus, eventid]);
        return rows.map(row => new RSVP(row));
    }

    async getUserByRSVPStatusandEventId(rsvpstatus, eventid) {
        const sql = `
            SELECT u.userid, u.username, u.useremail, u.userpoints, u.userpic
            FROM rsvp r
            JOIN users u ON r.userid = u.userid
            WHERE r.rsvpstatus = $1 AND r.eventid = $2
            `;
        const { rows } = await pool.query(sql, [rsvpstatus, eventid]);
        return rows.map(row => new User(row));
    }

    async createRSVP({ eventid, userid, rsvpstatus = 'maybe' }) {
        const sql = 'INSERT INTO rsvp (eventid, userid, rsvpstatus, rsvpcdate) VALUES ($1, $2, $3, NOW()) RETURNING rsvpid, rsvpstatus, userid, eventid';
        const { rows } = await pool.query(sql, [eventid, userid, rsvpstatus]);
        return new RSVP(rows[0]);
    }

    async updateRSVPStatus(rsvpid, rsvpstatus) {
        const sql = 'UPDATE rsvp SET rsvpstatus = $1, updated_at = NOW() WHERE rsvpid = $2 RETURNING rsvpid, rsvpstatus, userid, eventid';
        const { rows } = await pool.query(sql, [rsvpstatus, rsvpid]);
        return rows[0] ? new RSVP(rows[0]) : null;
    }

    async deleteRSVP(rsvpid) {
        const sql = 'DELETE FROM rsvp WHERE rsvpid = $1 RETURNING rsvpid, rsvpstatus, userid, eventid';
        const { rows } = await pool.query(sql, [rsvpid]);
        return rows.length > 0;
    }

    async deleteRSVPByEventId(eventid) {
        const sql = 'DELETE FROM rsvp WHERE eventid = $1 RETURNING rsvpid, rsvpstatus, userid, eventid';
        const { rows } = await pool.query(sql, [eventid]);
        return rows.length > 0;
    }

    async deleteRSVPByUserId(userid) {
        const sql = 'DELETE FROM rsvp WHERE userid = $1 RETURNING rsvpid, rsvpstatus, userid, eventid';
        const { rows } = await pool.query(sql, [userid]);
        return rows.length > 0;
    }

    async countRSVPsByEventId(eventid) {
        const sql = 'SELECT COUNT(*) FROM rsvp WHERE eventid = $1';
        const { rows } = await pool.query(sql, [eventid]);
        return parseInt(rows[0].count, 10);
    }

    async countRSVPsByStatusandUserId(userid, rsvpstatus) {
        const sql = 'SELECT COUNT(*) FROM rsvp WHERE userid = $1 AND rsvpstatus = $2';
        const { rows } = await pool.query(sql, [userid, rsvpstatus]);
        return parseInt(rows[0].count, 10);
    }

    async countRSVPsByStatusandEventId(eventid, rsvpstatus) {
        const sql = 'SELECT COUNT(*) FROM rsvp WHERE eventid = $1 AND rsvpstatus = $2';
        const { rows } = await pool.query(sql, [eventid, rsvpstatus]);
        return parseInt(rows[0].count, 10);
    }

    async existsRSVPByEventandUserId(eventid, userid) {
        const sql = 'SELECT 1 FROM rsvp WHERE eventid = $1 AND userid = $2';
        const { rows } = await pool.query(sql, [eventid, userid]);
        return rows.length > 0;
    }
}