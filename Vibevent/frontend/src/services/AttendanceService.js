import { BaseService } from './BaseService.js';

function getAuthHeaders() {
  const token = localStorage.getItem('jwt');
  return token
    ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };
}

export default class AttendanceService extends BaseService {
  constructor() {
    super('http://localhost:4000/api/attends');
  }

  /**
   * @returns {Promise<Array>}
   */
  async getAll() {
    return this.request('/', { headers: getAuthHeaders() });
  }

  /**
   * @param   {number} attendid
   * @returns {Promise<Object>}
   */
  async getById(attendid) {
    return this.request(`/${attendid}`, { headers: getAuthHeaders() });
  }

  /**
   * @param   {number} eventid
   * @returns {Promise<Array>}
   */
  async getByEvent(eventid) {
    return this.request(`/event/${eventid}`, { headers: getAuthHeaders() });
  }

  /**
   * @param   {number} userid
   * @returns {Promise<Array>}
   */
  async getByUser(userid) {
    return this.request(`/user/${userid}`, { headers: getAuthHeaders() });
  }

  /**
   * @param   {Object} attendData
   * @returns {Promise<Object>}
   */
  async create(attendData) {
    return this.request('/create', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(attendData)
    });
  }

  /**
   * @param   {number} eventid
   * @param   {number} userid
   * @returns {Promise<Object>}
   */
  async getByEventAndUser(eventid, userid) {
    return this.request('/event-user', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ eventid, userid })
    });
  }

  /**
   * @param   {number} eventid
   * @param   {string} attendstatus
   * @returns {Promise<Array>}
   */
  async getUsersByStatusAndEvent(eventid, attendstatus) {
    return this.request('/event/status/users', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ eventid, attendstatus })
    });
  }

  /**
   * @param   {number} eventid
   * @param   {string} attendstatus
   * @returns {Promise<number>}
   */
  async countByStatusAndEvent(eventid, attendstatus) {
    return this.request('/event/status/count', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ eventid, attendstatus })
    });
  }

  /**
   * @param   {number} userid
   * @param   {string} attendstatus
   * @returns {Promise<number>}
   */
  async countByStatusAndUser(userid, attendstatus) {
    return this.request('/user/status/count', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userid, attendstatus })
    });
  }

  /**
   * @param   {number} eventid
   * @param   {number} userid
   * @returns {Promise<boolean>}
   */
  async existsByEventAndUser(eventid, userid) {
    return this.request('/event-user/exists', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ eventid, userid })
    });
  }

  /**
   * @param   {number} attendid
   * @param   {string} attendstatus
   * @returns {Promise<Object>}
   */
  async updateStatus(attendid, attendstatus) {
    return this.request(`/${attendid}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ attendstatus })
    });
  }

  /**
   * @param   {number} attendid
   * @returns {Promise<Object>}
   */
  async delete(attendid) {
    return this.request(`/${attendid}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
  }

  /**
   * @param   {number} eventid
   * @returns {Promise<Object>}
   */
  async deleteByEvent(eventid) {
    return this.request(`/event/${eventid}`, {
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
}