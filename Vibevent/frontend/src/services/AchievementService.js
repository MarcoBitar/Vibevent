import { BaseService } from './BaseService.js';

function getAuthHeaders() {
  const token = localStorage.getItem('jwt');
  return token
    ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };
}

export default class AchievementService extends BaseService {
  constructor() {
    super('http://localhost:4000/api/achs');
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
   * @param   {number} achid
   * @returns {Promise<Object>}
   */
  async getById(achid) {
    return this.request(`/${achid}`, { headers: getAuthHeaders() });
  }

  /**
   * @param   {string} achtitle
   * @returns {Promise<Object>}
   */
  async getByTitle(achtitle) {
    return this.request('/title', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ achtitle })
    });
  }

  /**
   * @param   {string} search
   * @returns {Promise<Array>}
   */
  async search(search) {
    return this.request('/search', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ search })
    });
  }

  /**
   * @param   {number} achpointsreq
   * @returns {Promise<Array>}
   */
  async getByPointsRequired(achpointsreq) {
    return this.request('/points', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ achpointsreq })
    });
  }

  /**
   * @param   {Object} achData
   * @returns {Promise<Object>}
   */
  async create(achData) {
    return this.request('/create', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(achData)
    });
  }

  /**
   * @param   {number} achpointsreq
   * @returns {Promise<number>}
   */
  async countByPointsRequired(achpointsreq) {
    return this.request('/count/points', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ achpointsreq })
    });
  }

  /**
   * @param   {string} achtitle
   * @returns {Promise<boolean>}
   */
  async existsByTitle(achtitle) {
    return this.request('/exists/title', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ achtitle })
    });
  }

  /**
   * @param   {number} achid
   * @param   {Object} updateData
   * @returns {Promise<Object>}
   */
  async update(achid, updateData) {
    return this.request(`/${achid}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData)
    });
  }

  /**
   * @param   {number} achid
   * @param   {number} achpointsreq
   * @returns {Promise<Object>}
   */
  async updatePoints(achid, achpointsreq) {
    return this.request(`/${achid}/points`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ achpointsreq })
    });
  }

  /**
   * @param   {number} achid
   * @returns {Promise<Object>}
   */
  async delete(achid) {
    return this.request(`/${achid}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
  }
}