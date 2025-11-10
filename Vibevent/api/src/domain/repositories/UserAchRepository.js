import { pool } from '../../config/db.js';
import { UserAch } from '../entities/UserAch.js';

export class UserAchRepository {
    async getAllUserAchs() {
        const sql = 'SELECT uaid, userid, achid FROM user_ach';
        const { rows } = await pool.query(sql);
        return rows.map(row => new UserAch(row));
    }

    async getUserAchById(uaid) {
        const sql = 'SELECT uaid, userid, achid FROM user_ach WHERE uaid = $1';
        const { rows } = await pool.query(sql, [uaid]);
        return rows[0] ? new UserAch(rows[0]) : null;
    }

    async getUserAchsByUserId(userid) {
        const sql = 'SELECT uaid, userid, achid FROM user_ach WHERE userid = $1';
        const { rows } = await pool.query(sql, [userid]);
        return rows.map(row => new UserAch(row));
    }

    async getUserAchsByAchId(achid) {
        const sql = 'SELECT uaid, userid, achid FROM user_ach WHERE achid = $1';
        const { rows } = await pool.query(sql, [achid]);
        return rows.map(row => new UserAch(row));
    }

    async getUserAchByUserAndAchId(userid, achid) {
        const sql = 'SELECT uaid, userid, achid FROM user_ach WHERE userid = $1 AND achid = $2';
        const { rows } = await pool.query(sql, [userid, achid]);
        return rows[0] ? new UserAch(rows[0]) : null;
    }

    async createUserAch({ userid, achid }) {
        const sql = 'INSERT INTO user_ach (userid, achid, userachdate) VALUES ($1, $2, NOW()) RETURNING uaid, userid, achid';
        const { rows } = await pool.query(sql, [userid, achid]);
        return new UserAch(rows[0]);
    }

    async deleteUserAch(uaid) {
        const sql = 'DELETE FROM user_ach WHERE uaid = $1 RETURNING uaid, userid, achid';
        const { rows } = await pool.query(sql, [uaid]);
        return rows.length > 0;
    }

    async deleteUserAchsByUserId(userid) {
        const sql = 'DELETE FROM user_ach WHERE userid = $1 RETURNING uaid, userid, achid';
        const { rows } = await pool.query(sql, [userid]);
        return rows.length > 0;
    }

    async deleteUserAchsByAchId(achid) {
        const sql = 'DELETE FROM user_ach WHERE achid = $1 RETURNING uaid, userid, achid';
        const { rows } = await pool.query(sql, [achid]);
        return rows.length > 0;
    }

    async countUserAchs() {
        const sql = 'SELECT COUNT(*) FROM user_ach';
        const { rows } = await pool.query(sql);
        return parseInt(rows[0].count, 10);
    }

    async countUserAchsByUserId(userid) {
        const sql = 'SELECT COUNT(*) FROM user_ach WHERE userid = $1';
        const { rows } = await pool.query(sql, [userid]);
        return parseInt(rows[0].count, 10);
    }

    async countUserAchsByAchId(achid) {
        const sql = 'SELECT COUNT(*) FROM user_ach WHERE achid = $1';
        const { rows } = await pool.query(sql, [achid]);
        return parseInt(rows[0].count, 10);
    }

    async existsUserAchByUserAndAchId(userid, achid) {
        const sql = 'SELECT 1 FROM user_ach WHERE userid = $1 AND achid = $2';
        const { rows } = await pool.query(sql, [userid, achid]);
        return rows.length > 0;
    }
}