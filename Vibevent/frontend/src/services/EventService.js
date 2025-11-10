import { BaseService } from './BaseService.js';

function getAuthHeaders() {
  const token = localStorage.getItem('jwt');
  return token
    ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };
}

export default class EventService extends BaseService {
  constructor() {
    super('http://localhost:4000/api/events');
  }

  /**
   * @returns {Promise<Array>}
   */
  async getAll() {
    return this.request('/', { headers: getAuthHeaders() });
  }

  /**
   * @returns {Promise<Array>}
   */
  async getUpcoming() {
    return this.request('/upcoming', { headers: getAuthHeaders() });
  }

  /**
   * @returns {Promise<Array>}
   */
  async getPast() {
    return this.request('/past', { headers: getAuthHeaders() });
  }

  /**
   * @returns {Promise<number>}
   */
  async count() {
    return this.request('/count', { headers: getAuthHeaders() });
  }

  /**
   * @param {number} eventid
   * @returns {Promise<Object>}
   */
  async getById(eventid) {
    return this.request(`/${eventid}`, { headers: getAuthHeaders() });
  }

  /**
   * @param {number} clubid
   * @returns {Promise<Array>}
   */
  async getByClub(clubid) {
    return this.request(`/club/${clubid}`, { headers: getAuthHeaders() });
  }

  /**
   * @param {number} clubid
   * @returns {Promise<Array>}
   */
  async getUpcomingByClub(clubid) {
    return this.request(`/club/${clubid}/upcoming`, { headers: getAuthHeaders() });
  }

  /**
   * @param {number} clubid
   * @returns {Promise<Array>}
   */
  async getPastByClub(clubid) {
    return this.request(`/club/${clubid}/past`, { headers: getAuthHeaders() });
  }

  /**
   * @param {number} clubid
   * @returns {Promise<number>}
   */
  async countByClub(clubid) {
    return this.request(`/club/${clubid}/count`, { headers: getAuthHeaders() });
  }

  /**
   * @param {number} clubid
   * @returns {Promise<number>}
   */
  async countUpcomingByClub(clubid) {
    return this.request(`/club/${clubid}/count/upcoming`, { headers: getAuthHeaders() });
  }

  /**
   * @param {number} clubid
   * @returns {Promise<number>}
   */
  async countPastByClub(clubid) {
    return this.request(`/club/${clubid}/count/past`, { headers: getAuthHeaders() });
  }

  /**
   * @returns {Promise<number>}
   */
  async countUpcoming() {
    return this.request('/count/upcoming', { headers: getAuthHeaders() });
  }

  /**
   * @returns {Promise<number>}
   */
  async countPast() {
    return this.request('/count/past', { headers: getAuthHeaders() });
  }

  /**
   * @param {string} eventlocation
   * @returns {Promise<Array>}
   */
  async getByLocation(eventlocation) {
    return this.request('/location', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(eventlocation)
    });
  }

  /**
   * @param {string} search
   * @returns {Promise<Array>}
   */
  async searchByLocation(search) {
    return this.request('/location/search', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(search)
    });
  }

  /**
   * @param {string} search
   * @returns {Promise<Array>}
   */
  async search(search) {
    return this.request('/search', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(search)
    });
  }

  /**
   * @param {Object} eventData
   * @returns {Promise<Object>}
   */
  async create(eventData) {
    return this.request('/create', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(eventData)
    });
  }

  /**
   * @param {string} eventlocation
   * @returns {Promise<number>}
   */
  async countByLocation(eventlocation) {
    return this.request('/count/location', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(eventlocation)
    });
  }

  /**
   * @param {string} eventtitle
   * @param {string} eventdate
   * @returns {Promise<boolean>}
   */
  async existsByTitleAndDate(eventtitle, eventdate) {
    return this.request('/exists', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ eventtitle, eventdate })
    });
  }

  /**
   * @param {number} eventid
   * @param {Object} updateData
   * @returns {Promise<Object>}
   */
  async update({eventid, ...updateData}) {
    return this.request(`/${eventid}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData)
    });
  }

  /**
   * @param {number} eventid
   * @param {string} eventdate
   * @returns {Promise<Object>}
   */
  async updateDate(eventid, eventdate) {
    return this.request(`/${eventid}/date`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ eventdate })
    });
  }

  /**
   * @param {number} eventid
   * @returns {Promise<Object>}
   */
  async delete(eventid) {
    return this.request(`/${eventid}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
  }
}