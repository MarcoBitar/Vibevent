import { pool } from '../../config/db.js';
import { Club } from '../entities/Club.js';

export class ClubRepository {
    async getAllClubs() {
        const sql = 'SELECT clubid, clubname, clubemail, clubdesc, clubpoints, clubpic FROM clubs';
        const { rows } = await pool.query(sql);
        return rows.map(row => new Club(row));
    }

    async getClubById(clubid) {
        const sql = 'SELECT clubid, clubname, clubemail, clubdesc, clubpoints, clubpic FROM clubs WHERE clubid = $1';
        const { rows } = await pool.query(sql, [clubid]);
        return rows[0] ? new Club(rows[0]) : null;
    }

    async getClubByName(clubname) {
        const sql = 'SELECT clubid, clubname, clubemail, clubdesc, clubpoints, clubpic FROM clubs WHERE clubname = $1';
        const { rows } = await pool.query(sql, [clubname]);
        return rows[0] ? new Club(rows[0]) : null;
    }

    async getClubByEmail(clubemail) {
        const sql = 'SELECT clubid, clubname, clubemail, clubpass, clubdesc, clubpoints, clubpic FROM clubs WHERE clubemail = $1';
        const { rows } = await pool.query(sql, [clubemail]);
        return rows[0] ? new Club(rows[0]) : null;
    }

    async getClubBySearch(query) {
        const sql = 'SELECT clubid, clubname, clubemail, clubdesc, clubpoints, clubpic FROM clubs WHERE clubname ILIKE $1 OR clubemail ILIKE $1';
        const { rows } = await pool.query(sql, [`%${query}%`]);
        return rows.map(row => new Club(row));
    }

    async createClub({ clubname, clubemail, clubpass, clubdesc, clubpic }) {
        const sql = 'INSERT INTO clubs (clubname, clubemail, clubpass, clubdesc, clubpic, clubcdate) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING clubid, clubname, clubemail, clubdesc, clubpoints, clubpic';
        const { rows } = await pool.query(sql, [clubname, clubemail, clubpass, clubdesc, clubpic]);
        return new Club(rows[0]);
    }

    async updateClub(clubid, { clubname, clubdesc, clubpic }) {
        const sql = 'UPDATE clubs SET clubname = $1, clubdesc = $2, clubpic = $3, updated_at = NOW() WHERE clubid = $4 RETURNING clubid, clubname, clubemail, clubdesc, clubpoints, clubpic';
        const { rows } = await pool.query(sql, [clubname, clubdesc, clubpic, clubid]);
        return rows[0] ? new Club(rows[0]) : null;
    }

    async updateClubPoints(clubid, delta) {
        const sql = 'UPDATE clubs SET clubpoints = clubpoints + $1, updated_at = NOW() WHERE clubid = $2 RETURNING clubid, clubname, clubemail, clubdesc, clubpoints, clubpic';
        const { rows } = await pool.query(sql, [delta, clubid]);
        return rows[0] ? new Club(rows[0]) : null;
    }

    async deleteClub(clubid) {
        const sql = 'DELETE FROM clubs WHERE clubid = $1 RETURNING clubid, clubname, clubemail, clubdesc, clubpoints, clubpic';
        const { rows } = await pool.query(sql, [clubid]);
        return rows.length > 0;
    }

    async countClubs() {
        const sql = 'SELECT COUNT(*) FROM clubs';
        const { rows } = await pool.query(sql);
        return parseInt(rows[0].count, 10);
    }

    async getTopClubs(limit) {
        const sql = 'SELECT clubid, clubname, clubemail, clubdesc, clubpoints, clubpic FROM clubs ORDER BY clubpoints DESC LIMIT $1';
        const { rows } = await pool.query(sql, [limit]);
        return rows.map(row => new Club(row));
    }

    async getRank(clubid) {
        const sql = 'SELECT COUNT(*) + 1 AS rank FROM clubs WHERE clubpoints > (SELECT clubpoints FROM clubs WHERE clubid = $1)';
        const { rows } = await pool.query(sql, [clubid]);
        return rows[0]?.rank ?? null;
    }

    async existsClubByName(clubname) {
        const sql = 'SELECT 1 FROM clubs WHERE clubname = $1';
        const { rows } = await pool.query(sql, [clubname]);
        return rows.length > 0;
    }

    async existsClubByEmail(clubemail) {
        const sql = 'SELECT 1 FROM clubs WHERE clubemail = $1';
        const { rows } = await pool.query(sql, [clubemail]);
        return rows.length > 0;
    }
}