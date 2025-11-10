import { pool } from '../../config/db.js';
import { Notification } from '../entities/Notification.js';

export class NotificationRepository {
    async getAllNotifications() {
        const sql = 'SELECT notifid, userid, notiftype, notifcontent, notifstatus FROM notifications';
        const { rows } = await pool.query(sql);
        return rows.map(row => new Notification(row));
    }

    async getNotificationsById(notifid) {
        const sql = 'SELECT notifid, userid, notiftype, notifcontent, notifstatus FROM notifications WHERE notifid = $1';
        const { rows } = await pool.query(sql, [notifid]);
        return rows[0] ? new Notification(rows[0]) : null;
    }

    async getNotificationsByUserId(userid) {
        const sql = 'SELECT notifid, userid, notiftype, notifcontent, notifstatus FROM notifications WHERE userid = $1';
        const { rows } = await pool.query(sql, [userid]);
        return rows.map(row => new Notification(row));
    }

    async getNotificationsByStatusAndUserId(userid, notifstatus) {
        const sql = 'SELECT notifid, userid, notiftype, notifcontent, notifstatus FROM notifications WHERE userid = $1 AND notifstatus = $2';
        const { rows } = await pool.query(sql, [userid, notifstatus]);
        return rows.map(row => new Notification(row));
    }

    async getNotificationsByTypeAndUserId(userid, notiftype) {
        const sql = 'SELECT notifid, userid, notiftype, notifcontent, notifstatus FROM notifications WHERE userid = $1 AND notiftype = $2';
        const { rows } = await pool.query(sql, [userid, notiftype]);
        return rows.map(row => new Notification(row));
    }

    async getNotificationsByBeforeDateandUserId(userid, beforeDate) {
        const sql = 'SELECT notifid, userid, notiftype, notifcontent, notifstatus FROM notifications WHERE userid = $1 AND notifcdate < $2';
        const { rows } = await pool.query(sql, [userid, beforeDate]);
        return rows.map(row => new Notification(row));
    }

    async getNotificationsByAfterDateandUserId(userid, afterDate) {
        const sql = 'SELECT notifid, userid, notiftype, notifcontent, notifstatus FROM notifications WHERE userid = $1 AND notifcdate > $2';
        const { rows } = await pool.query(sql, [userid, afterDate]);
        return rows.map(row => new Notification(row));
    }

    async getNotificationsByDateRangeandUserId(userid, startDate, endDate) {
        const sql = 'SELECT notifid, userid, notiftype, notifcontent, notifstatus FROM notifications WHERE userid = $1 AND notifcdate >= $2::timestamp AND notifcdate <= $3::timestamp';
        const { rows } = await pool.query(sql, [userid, startDate, endDate]);
        return rows.map(row => new Notification(row));
    }

    async getNotificationsBySearch(userid, query){
        const sql = 'SELECT notifid, userid, notiftype, notifcontent, notifstatus FROM notifications WHERE userid = $1 AND notifcontent ILIKE $2';
        const { rows } = await pool.query(sql, [userid, `%${query}%`]);
        return rows.map(row => new Notification(row));
    }

    async createNotification({ userid, notiftype, notifcontent, notifstatus = 'unread' }) {
        const sql = 'INSERT INTO notifications (userid, notiftype, notifcontent, notifstatus, notifcdate) VALUES ($1, $2, $3, $4, NOW()) RETURNING notifid, userid, notiftype, notifcontent, notifstatus';
        const { rows } = await pool.query(sql, [userid, notiftype, notifcontent, notifstatus]);
        return new Notification(rows[0]);
    }

    async updateNotificationStatus(notifid, notifstatus) {
        const sql = 'UPDATE notifications SET notifstatus = $1, updated_at = NOW() WHERE notifid = $2 RETURNING notifid, userid, notiftype, notifcontent, notifstatus';
        const { rows } = await pool.query(sql, [notifstatus, notifid]);
        return rows[0] ? new Notification(rows[0]) : null;
    }

    async deleteNotification(notifid) {
        const sql = 'DELETE FROM notifications WHERE notifid = $1 RETURNING notifid, userid, notiftype, notifcontent, notifstatus';
        const { rows } = await pool.query(sql, [notifid]);
        return rows.length > 0;
    }

    async deleteNotificationsByUserId(userid) {
        const sql = 'DELETE FROM notifications WHERE userid = $1 RETURNING notifid, userid, notiftype, notifcontent, notifstatus';
        const { rows } = await pool.query(sql, [userid]);
        return rows.length > 0;
    }

    async deleteNotificationsByStatusAndUserId(userid, notifstatus) {
        const sql = 'DELETE FROM notifications WHERE userid = $1 AND notifstatus = $2 RETURNING notifid, userid, notiftype, notifcontent, notifstatus';
        const { rows } = await pool.query(sql, [userid, notifstatus]);
        return rows.length > 0;
    }

    async deleteNotificationsByTypeAndUserId(userid, notiftype) {
        const sql = 'DELETE FROM notifications WHERE userid = $1 AND notiftype = $2 RETURNING notifid, userid, notiftype, notifcontent, notifstatus';
        const { rows } = await pool.query(sql, [userid, notiftype]);
        return rows.length > 0;
    }

    async deleteNotificationsByDateandUserId(userid, beforeDate) {
        const sql = 'DELETE FROM notifications WHERE userid = $1 AND notifcdate < $2 RETURNING notifid, userid, notiftype, notifcontent, notifstatus';
        const { rows } = await pool.query(sql, [userid, beforeDate]);
        return rows.length > 0;
    }

    async countNotificationsByUserId(userid) {
        const sql = 'SELECT COUNT(*) FROM notifications WHERE userid = $1';
        const { rows } = await pool.query(sql, [userid]);
        return parseInt(rows[0].count, 10);
    }

    async countNotificationsByStatusAndUserId(userid, notifstatus) {
        const sql = 'SELECT COUNT(*) FROM notifications WHERE userid = $1 AND notifstatus = $2';
        const { rows } = await pool.query(sql, [userid, notifstatus]);
        return parseInt(rows[0].count, 10);
    }

    async countNotificationsByTypeAndUserId(userid, notiftype) {
        const sql = 'SELECT COUNT(*) FROM notifications WHERE userid = $1 AND notiftype = $2';
        const { rows } = await pool.query(sql, [userid, notiftype]);
        return parseInt(rows[0].count, 10);
    }

    async countNotificationsByBeforeDateandUserId(userid, beforeDate) {
        const sql = 'SELECT COUNT(*) FROM notifications WHERE userid = $1 AND notifcdate < $2';
        const { rows } = await pool.query(sql, [userid, beforeDate]);
        return parseInt(rows[0].count, 10);
    }

    async countNotificationsByAfterDateandUserId(userid, afterDate) {
        const sql = 'SELECT COUNT(*) FROM notifications WHERE userid = $1 AND notifcdate > $2';
        const { rows } = await pool.query(sql, [userid, afterDate]);
        return parseInt(rows[0].count, 10);
    }

    async countNotifcationsByDateRangeAndUserId(userid, startDate, endDate) {
        const sql = 'SELECT COUNT(*) FROM notifications WHERE userid = $1 AND notifcdate >= $2::timestamp AND notifcdate <= $3::timestamp';
        const { rows } = await pool.query(sql, [userid, startDate, endDate]);
        return parseInt(rows[0].count, 10);
    }

    async existsNotificationsByUserId(userid) {
        const sql = 'SELECT 1 FROM notifications WHERE userid = $1';
        const { rows } = await pool.query(sql, [userid]);
        return rows.length > 0;
    }

    async existsNotificationsByStatusAndUserId(userid, notifstatus) {
        const sql = 'SELECT 1 FROM notifications WHERE userid = $1 AND notifstatus = $2';
        const { rows } = await pool.query(sql, [userid, notifstatus]);
        return rows.length > 0;
    }
}