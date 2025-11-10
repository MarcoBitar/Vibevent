import { pool } from '../../config/db.js';
import { ClubAch } from '../entities/ClubAch.js';

export class ClubAchRepository {
    async getAllClubAchs() {
        const sql = 'SELECT caid, clubid, achid FROM club_ach';
        const { rows } = await pool.query(sql);
        return rows.map(row => new ClubAch(row));
    }

    async getClubAchById(caid) {
        const sql = 'SELECT caid, clubid, achid FROM club_ach WHERE caid = $1';
        const { rows } = await pool.query(sql, [caid]);
        return rows[0] ? new ClubAch(rows[0]) : null;
    }

    async getClubAchsByClubId(clubid) {
        const sql = 'SELECT caid, clubid, achid FROM club_ach WHERE clubid = $1';
        const { rows } = await pool.query(sql, [clubid]);
        return rows.map(row => new ClubAch(row));
    }

    async getClubAchsByAchId(achid) {
        const sql = 'SELECT caid, clubid, achid FROM club_ach WHERE achid = $1';
        const { rows } = await pool.query(sql, [achid]);
        return rows.map(row => new ClubAch(row));
    }

    async getClubAchByClubAndAchId(clubid, achid) {
        const sql = 'SELECT caid, clubid, achid FROM club_ach WHERE clubid = $1 AND achid = $2';
        const { rows } = await pool.query(sql, [clubid, achid]);
        return rows[0] ? new ClubAch(rows[0]) : null;
    }

    async createClubAch({ clubid, achid }) {
        const sql = 'INSERT INTO club_ach (clubid, achid, clubachdate) VALUES ($1, $2, NOW()) RETURNING caid, clubid, achid';
        const { rows } = await pool.query(sql, [clubid, achid]);
        return new ClubAch(rows[0]);
    }

    async deleteClubAch(caid) {
        const sql = 'DELETE FROM club_ach WHERE caid = $1 RETURNING caid, clubid, achid';
        const { rows } = await pool.query(sql, [caid]);
        return rows.length > 0;
    }

    async deleteClubAchsByClubId(clubid) {
        const sql = 'DELETE FROM club_ach WHERE clubid = $1 RETURNING caid, clubid, achid';
        const { rows } = await pool.query(sql, [clubid]);
        return rows.length > 0;
    }

    async deleteClubAchsByAchId(achid) {
        const sql = 'DELETE FROM club_ach WHERE achid = $1 RETURNING caid, clubid, achid';
        const { rows } = await pool.query(sql, [achid]);
        return rows.length > 0;
    }

    async countClubAchs() {
        const sql = 'SELECT COUNT(*) FROM club_ach';
        const { rows } = await pool.query(sql);
        return parseInt(rows[0].count, 10);
    }

    async countClubAchsByClubId(clubid) {
        const sql = 'SELECT COUNT(*) FROM club_ach WHERE clubid = $1';
        const { rows } = await pool.query(sql, [clubid]);
        return parseInt(rows[0].count, 10);
    }

    async countClubAchsByAchId(achid) {
        const sql = 'SELECT COUNT(*) FROM club_ach WHERE achid = $1';
        const { rows } = await pool.query(sql, [achid]);
        return parseInt(rows[0].count, 10);
    }

    async existsClubAchByClubAndAchId(clubid, achid) {
        const sql = 'SELECT 1 FROM club_ach WHERE clubid = $1 AND achid = $2';
        const { rows } = await pool.query(sql, [clubid, achid]);
        return rows.length > 0;
    }
}