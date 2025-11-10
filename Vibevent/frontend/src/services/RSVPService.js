import { BaseService } from './BaseService.js';

function getAuthHeaders() {
  const token = localStorage.getItem('jwt');
  return token
    ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };
}

export default class RSVPService extends BaseService {
  constructor() {
    super('http://localhost:4000/api/rsvps');
  }

  /**
   * @returns {Promise<Array>}
   */
  async getAll() {
    return this.request('/', { headers: getAuthHeaders() });
  }

  /**
   * @param   {number} rsvpid
   * @returns {Promise<Object>}
   */
  async getById(rsvpid) {
    return this.request(`/${rsvpid}`, { headers: getAuthHeaders() });
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
   * @param   {number} eventid
   * @returns {Promise<number>}
   */
  async countByEvent(eventid) {
    return this.request(`/event/${eventid}/count`, { headers: getAuthHeaders() });
  }

  /**
   * @param   {Object} rsvpData
   * @returns {Promise<Object>}
   */
  async create(rsvpData) {
    return this.request('/create', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(rsvpData)
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
   * @param   {number} userid
   * @param   {string} rsvpstatus
   * @returns {Promise<Array>}
   */
  async getByStatusAndEvent(userid, rsvpstatus) {
    return this.request('/event/status', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userid, rsvpstatus })
    });
  }

  /**
   * @param   {number} eventid
   * @param   {string} rsvpstatus
   * @returns {Promise<Array>}
   */
  async getUsersByStatusAndEvent(eventid, rsvpstatus) {
    return this.request('/event/status/users', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ eventid, rsvpstatus })
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
   * @param   {number} userid
   * @param   {string} rsvpstatus
   * @returns {Promise<number>}
   */
  async countByStatusAndUser(userid, rsvpstatus) {
    return this.request('/user/status/count', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userid, rsvpstatus })
    });
  }

  /**
   * @param   {number} eventid
   * @param   {string} rsvpstatus
   * @returns {Promise<number>}
   */
  async countByStatusAndEvent(eventid, rsvpstatus) {
    return this.request('/event/status/count', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ eventid, rsvpstatus })
    });
  }

  /**
   * @param   {number} rsvpid
   * @param   {string} rsvpstatus
   * @returns {Promise<Object>}
   */
  async updateStatus(rsvpid, rsvpstatus) {
    return this.request(`/${rsvpid}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ rsvpstatus })
    });
  }

  /**
   * @param   {number} rsvpid
   * @returns {Promise<Object>}
   */
  async delete(rsvpid) {
    return this.request(`/${rsvpid}`, {
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