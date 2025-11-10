import { pool } from '../../config/db.js';
import { Achievement } from '../entities/Achievement.js';

export class AchievementRepository {
    async getAllAchievements() {
        const sql = 'SELECT achid, achtitle, achdesc, achbadge, achpointsreq FROM achievement';
        const { rows } = await pool.query(sql);
        return rows.map(row => new Achievement(row));
    }

    async getAchievementById(achid) {
        const sql = 'SELECT achid, achtitle, achdesc, achbadge, achpointsreq FROM achievement WHERE achid = $1';
        const { rows } = await pool.query(sql, [achid]);
        return rows[0] ? new Achievement(rows[0]) : null;
    }

    async getAchievementByTitle(achtitle) {
        const sql = 'SELECT achid, achtitle, achdesc, achbadge, achpointsreq FROM achievement WHERE achtitle = $1';
        const { rows } = await pool.query(sql, [achtitle]);
        return rows[0] ? new Achievement(rows[0]) : null;
    }

    async getachievementBySearch(query){
        const sql = 'SELECT achid, achtitle, achdesc, achbadge, achpointsreq FROM achievement WHERE achtitle ILIKE $1 OR achdesc ILIKE $1';
        const { rows } = await pool.query(sql, [`%${query}%`]);
        return rows.map(row => new Achievement(row));
    }

    async getAchievementsByPointsRequired(achpointsreq) {
        const sql = 'SELECT achid, achtitle, achdesc, achbadge, achpointsreq FROM achievement WHERE achpointsreq = $1';
        const { rows } = await pool.query(sql, [achpointsreq]);
        return rows.map(row => new Achievement(row));
    }

    async createAchievement({ achtitle, achdesc, achbadge, achpointsreq }) {
        const sql = 'INSERT INTO achievement (achtitle, achdesc, achbadge, achpointsreq, achcdate) VALUES ($1, $2, $3, $4, NOW()) RETURNING achid, achtitle, achdesc, achbadge, achpointsreq';
        const { rows } = await pool.query(sql, [achtitle, achdesc, achbadge, achpointsreq]);
        return new Achievement(rows[0]);
    }

    async updateAchievement(achid, { achtitle, achdesc, achbadge, achpointsreq }) {
        const sql = 'UPDATE achievement SET achtitle = $1, achdesc = $2, achbadge = $3, achpointsreq = $4, updated_at = NOW() WHERE achid = $5 RETURNING achid, achtitle, achdesc, achbadge, achpointsreq';
        const { rows } = await pool.query(sql, [achtitle, achdesc, achbadge, achpointsreq, achid]);
        return rows[0] ? new Achievement(rows[0]) : null;
    }

    async updateAchievementPoints(achid, achpointsreq) {
        const sql = 'UPDATE achievement SET achpointsreq = $1, updated_at = NOW() WHERE achid = $2 RETURNING achid, achtitle, achdesc, achbadge, achpointsreq';
        const { rows } = await pool.query(sql, [achpointsreq, achid]);
        return rows[0] ? new Achievement(rows[0]) : null;
    }

    async deleteAchievement(achid) {
        const sql = 'DELETE FROM achievement WHERE achid = $1 RETURNING achid, achtitle, achdesc, achbadge, achpointsreq';
        const { rows } = await pool.query(sql, [achid]);
        return rows.length > 0;
    }

    async countAchievements() {
        const sql = 'SELECT COUNT(*) FROM achievement';
        const { rows } = await pool.query(sql);
        return parseInt(rows[0].count, 10);
    }

    async countAchievementsByPointsRequired(achpointsreq) {
        const sql = 'SELECT COUNT(*) FROM achievement WHERE achpointsreq = $1';
        const { rows } = await pool.query(sql, [achpointsreq]);
        return parseInt(rows[0].count, 10);
    }

    async existsAchievementByTitle(achtitle) {
        const sql = 'SELECT 1 FROM achievement WHERE achtitle = $1';
        const { rows } = await pool.query(sql, [achtitle]);
        return rows.length > 0;
    }
}