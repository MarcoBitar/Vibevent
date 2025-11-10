import { BaseService } from './BaseService.js';

function getAuthHeaders() {
  const token = localStorage.getItem('jwt');
  return token
    ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };
}

export default class UserAchService extends BaseService {
  constructor() {
    super('http://localhost:4000/api/userachs');
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
   * @param   {number} uaid
   * @returns {Promise<Object>}
   */
  async getById(uaid) {
    return this.request(`/${uaid}`, { headers: getAuthHeaders() });
  }

  /**
   * @param   {number} userid
   * @returns {Promise<Array>}
   */
  async getByUser(userid) {
    return this.request(`/user/${userid}`, { headers: getAuthHeaders() });
  }

  /**
   * @param   {number} achid
   * @returns {Promise<Array>}
   */
  async getByAch(achid) {
    return this.request(`/ach/${achid}`, { headers: getAuthHeaders() });
  }

  /**
   * @param   {number} userid
   * @returns {Promise<number>}
   */
  async countByUser(userid) {
    return this.request(`/user/${userid}/count`, { headers: getAuthHeaders() });
  }

  /**
   * @param   {number} achid
   * @returns {Promise<number>}
   */
  async countByAch(achid) {
    return this.request(`/ach/${achid}/count`, { headers: getAuthHeaders() });
  }

  /**
   * @param   {Object} userAchData
   * @returns {Promise<Object>}
   */
  async create(userAchData) {
    return this.request('/create', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userAchData)
    });
  }

  /**
   * @param   {number} userid
   * @param   {number} achid
   * @returns {Promise<Object>}
   */
  async getByUserAndAch(userid, achid) {
    return this.request('/user-ach', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userid, achid })
    });
  }

  /**
   * @param   {number} userid
   * @param   {number} achid
   * @returns {Promise<boolean>}
   */
  async existsByUserAndAch(userid, achid) {
    return this.request('/user-ach/exists', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userid, achid })
    });
  }

  /**
   * @param   {number} uaid
   * @returns {Promise<Object>}
   */
  async delete(uaid) {
    return this.request(`/${uaid}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
  }

  /**
   * @param   {number} userid
   * @returns {Promise<Object>}
   */
  async deleteByUser(userid) {
    return this.request(`/user/${userid}`, {
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