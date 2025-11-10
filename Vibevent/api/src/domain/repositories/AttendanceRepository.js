import { pool } from '../../config/db.js';
import { Attendance } from '../entities/Attendance.js';
import { User } from '../entities/User.js';

export class AttendanceRepository {
    async getAllAttendances() {
        const sql = 'SELECT attendid, userid, eventid, attendmethod, attendstatus FROM attendance';
        const { rows } = await pool.query(sql);
        return rows.map(row => new Attendance(row));
    }

    async getAttendanceById(attendid) {
        const sql = 'SELECT attendid, userid, eventid, attendmethod, attendstatus FROM attendance WHERE attendid = $1';
        const { rows } = await pool.query(sql, [attendid]);
        return rows[0] ? new Attendance(rows[0]) : null;
    }

    async getAttendancesByEventId(eventid) {
        const sql = 'SELECT attendid, userid, eventid, attendmethod, attendstatus FROM attendance WHERE eventid = $1';
        const { rows } = await pool.query(sql, [eventid]);
        return rows.map(row => new Attendance(row));
    }

    async getAttendancesByUserId(userid) {
        const sql = 'SELECT attendid, userid, eventid, attendmethod, attendstatus FROM attendance WHERE userid = $1';
        const { rows } = await pool.query(sql, [userid]);
        return rows.map(row => new Attendance(row));
    }

    async getAttendanceByEventAndUser(eventid, userid) {
        const sql = 'SELECT attendid, userid, eventid, attendmethod, attendstatus FROM attendance WHERE eventid = $1 AND userid = $2';
        const { rows } = await pool.query(sql, [eventid, userid]);
        return rows[0] ? new Attendance(rows[0]) : null;
    }

    async getAttendeesByStatusAndEventId(attendstatus, eventid) {
        const sql = `
                SELECT u.userid, u.username, u.useremail, u.userpoints, u.userpic
                FROM attendance a
                JOIN users u ON a.userid = u.userid
                WHERE a.attendstatus = $1 AND a.eventid = $2
                `;
        const { rows } = await pool.query(sql, [attendstatus, eventid]);
        return rows.map(row => new User(row));
    }

    async createAttendance({ eventid, userid, attendmethod, attendstatus = 'present' }) {
        const sql = 'INSERT INTO attendance (eventid, userid, attendmethod, attendstatus, attendcdate) VALUES ($1, $2, $3, $4, NOW()) RETURNING attendid, userid, eventid, attendmethod, attendstatus';
        const { rows } = await pool.query(sql, [eventid, userid, attendmethod, attendstatus]);
        return new Attendance(rows[0]);
    }

    async updateAttendanceStatus(attendid, attendstatus) {
        const sql = 'UPDATE attendance SET attendstatus = $1, updated_at = NOW() WHERE attendanceid = $2 RETURNING attendid, userid, eventid, attendmethod, attendstatus';
        const { rows } = await pool.query(sql, [attendstatus, attendid]);
        return rows[0] ? new Attendance(rows[0]) : null;
    }

    async deleteAttendance(attendid) {
        const sql = 'DELETE FROM attendance WHERE attendanceid = $1 RETURNING attendid, userid, eventid, attendmethod, attendstatus';
        const { rows } = await pool.query(sql, [attendid]);
        return rows.length > 0;
    }

    async deleteAttendancesByEventId(eventid) {
        const sql = 'DELETE FROM attendance WHERE eventid = $1 RETURNING attendid, userid, eventid, attendmethod, attendstatus';
        const { rows } = await pool.query(sql, [eventid]);
        return rows.length > 0;
    }

    async deleteAttendancesByUserId(userid) {
        const sql = 'DELETE FROM attendance WHERE userid = $1 RETURNING attendid, userid, eventid, attendmethod, attendstatus';
        const { rows } = await pool.query(sql, [userid]);
        return rows.length > 0;
    }

    async countAttendanceByStatusandEventId(attendstatus, eventid) {
        const sql = 'SELECT COUNT(*) FROM attendance WHERE attendstatus = $1 AND eventid = $2';
        const { rows } = await pool.query(sql, [attendstatus, eventid]);
        return parseInt(rows[0].count, 10);
    }

    async countAttendanceByStatusandUserId(attendstatus, userid) {
        const sql = 'SELECT COUNT(*) FROM attendance WHERE attendstatus = $1 AND userid = $2';
        const { rows } = await pool.query(sql, [attendstatus, userid]);
        return parseInt(rows[0].count, 10);
    }

    async existsAttendanceByEventandUserId(eventid, userid) {
        const sql = 'SELECT 1 FROM attendance WHERE eventid = $1 AND userid = $2';
        const { rows } = await pool.query(sql, [eventid, userid]);
        return rows.length > 0;
    }
}