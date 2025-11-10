import { pool } from "../../config/db.js"
import { User } from "../entities/User.js"

export class UserRepository {
    async getAllUsers() {
        const sql = 'SELECT userid, username, useremail, userpoints, userpic FROM users';
        const { rows } = await pool.query(sql);
        return rows.map(row => new User(row));
    }

    async getUserById(userid) {
        const sql = 'SELECT userid, username, useremail, userpoints, userpic FROM users WHERE userid = $1';
        const { rows } = await pool.query(sql, [userid]);
        return rows[0] ? new User(rows[0]) : null;
    }

    async getUserByEmail(useremail) {
        const sql = 'SELECT userid, username, useremail, userpass, userpoints, userpic FROM users WHERE useremail = $1';
        const { rows } = await pool.query(sql, [useremail]);
        return rows[0] ? new User(rows[0]) : null;
    }

    async getUserByUsername(username) {
        const sql = 'SELECT userid, username, useremail, userpoints, userpic FROM users WHERE username = $1';
        const { rows } = await pool.query(sql, [username]);
        return rows[0] ? new User(rows[0]) : null;
    }

    async getUserBySearch(query) {
        const sql = 'SELECT userid, username, useremail, userpoints, userpic FROM users WHERE username ILIKE $1 OR useremail ILIKE $1';
        const { rows } = await pool.query(sql, [`%${query}%`]);
        return rows.map(row => new User(row));
    }

    async createUser({ username, useremail, userpass, userpic }) {
        const sql = 'INSERT INTO users (username, useremail, userpass, userpoints, userpic, usercdate) VALUES ($1, $2, $3, 0, $4, NOW()) RETURNING userid, username, useremail, userpoints, userpic';
        const { rows } = await pool.query(sql, [username, useremail, userpass, userpic]);
        return new User(rows[0]);
    }

    async updateUser(userid, { username, userpic }) {
        const sql = 'UPDATE users SET username = $1, userpic = $2, updated_at = NOW() WHERE userid = $3 RETURNING userid, username, useremail, userpoints, userpic';
        const { rows } = await pool.query(sql, [username, userpic, userid]);
        return rows[0] ? new User(rows[0]) : null;
    }

    async updateUserPoints(userid, delta) {
        const sql = 'UPDATE users SET userpoints = userpoints + $1, updated_at = NOW() WHERE userid = $2 RETURNING userid, username, useremail, userpoints, userpic';
        const { rows } = await pool.query(sql, [delta, userid]);
        return rows[0] ? new User(rows[0]) : null;
    }

    async deleteUser(userid) {
        const sql = 'DELETE FROM users WHERE userid = $1 RETURNING userid, username, useremail, userpoints, userpic';
        const { rows } = await pool.query(sql, [userid]);
        return rows.length > 0;
    }

    async countUsers() {
        const sql = 'SELECT COUNT(*) FROM users';
        const { rows } = await pool.query(sql);
        return parseInt(rows[0].count, 10);
    }

    async getTopUsers(limit) {
        const sql = 'SELECT userid, username, useremail, userpoints, userpic FROM users ORDER BY userpoints DESC LIMIT $1';
        const { rows } = await pool.query(sql, [limit]);
        return rows.map(row => new User(row));
    }

    async getRank(userid){
        const sql = 'SELECT COUNT(*) + 1 AS rank FROM users WHERE userpoints > (SELECT userpoints FROM users WHERE userid = $1)';
        const { rows } = await pool.query(sql, [userid]);
        return rows[0]?.rank ?? null;
    }

    async existsUserByUsername(username) {
        const sql = 'SELECT 1 FROM users WHERE username = $1';
        const { rows } = await pool.query(sql, [username]);
        return rows.length > 0;
    }

    async existsUserByEmail(useremail) {
        const sql = 'SELECT 1 FROM users WHERE useremail = $1';
        const { rows } = await pool.query(sql, [useremail]);
        return rows.length > 0;
    }
}