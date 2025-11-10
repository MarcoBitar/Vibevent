import { BaseService } from './BaseService.js';

function getAuthHeaders() {
    const token = localStorage.getItem('jwt');
    return token
        ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        : { 'Content-Type': 'application/json' };
}

export default class ClubAchService extends BaseService {
    constructor() {
        super('http://localhost:4000/api/clubachs');
    }

    /**
     * @returns {Promise<Array>}
     */
    async getAll() {
        return this.request('/', { headers: getAuthHeaders() });
    }

    /**
     * @returns {Promise<number>}
     */
    async count() {
        return this.request('/count', { headers: getAuthHeaders() });
    }

    /**
     * @param   {number} caid
     * @returns {Promise<Object>}
     */
    async getById(caid) {
        return this.request(`/${caid}`, { headers: getAuthHeaders() });
    }

    /**
     * @param   {number} clubid
     * @returns {Promise<Array>}
     */
    async getByClub(clubid) {
        return this.request(`/club/${clubid}`, { headers: getAuthHeaders() });
    }

    /**
     * @param   {number} achid
     * @returns {Promise<Array>}
     */
    async getByAch(achid) {
        return this.request(`/ach/${achid}`, { headers: getAuthHeaders() });
    }

    /**
     * @param   {number} clubid
     * @returns {Promise<number>}
     */
    async countByClub(clubid) {
        return this.request(`/club/${clubid}/count`, { headers: getAuthHeaders() });
    }

    /**
     * @param   {number} achid
     * @returns {Promise<number>}
     */
    async countByAch(achid) {
        return this.request(`/ach/${achid}/count`, { headers: getAuthHeaders() });
    }

    /**
     * @param   {Object} clubAchData
     * @returns {Promise<Object>}
     */
    async create(clubAchData) {
        return this.request('/create', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(clubAchData)
        });
    }

    /**
     * @param   {number} clubid
     * @param   {number} achid
     * @returns {Promise<Object>}
     */
    async getByClubAndAch(clubid, achid) {
        return this.request('/club-ach', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ clubid, achid })
        });
    }

    /**
     * @param   {number} clubid
     * @param   {number} achid
     * @returns {Promise<boolean>}
     */
    async existsByClubAndAch(clubid, achid) {
        return this.request('/club-ach/exists', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ clubid, achid })
        });
    }

    /**
     * @param   {number} caid
     * @returns {Promise<Object>}
     */
    async delete(caid) {
        return this.request(`/${caid}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
    }

    /**
     * @param   {number} clubid
     * @returns {Promise<Object>}
     */
    async deleteByClub(clubid) {
        return this.request(`/club/${clubid}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
    }

    /**
     * @param   {number} achid
     * @returns {Promise<Object>}
     */
    async deleteByAch(achid) {
        return this.request(`/ach/${achid}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
    }
}