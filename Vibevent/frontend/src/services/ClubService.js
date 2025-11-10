import { BaseService } from './BaseService.js';

function getAuthHeaders() {
  const token = localStorage.getItem('jwt');
  return token
    ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };
}

export default class ClubService extends BaseService {
  constructor() {
    super('http://localhost:4000/api/clubs');
  }

  /**
   * @returns {Promise<Array>} All clubs
   */
  async getAll() {
    return this.request('/', { headers: getAuthHeaders() });
  }

  /**
   * @returns {Promise<number>} Total club count
   */
  async count() {
    return this.request('/count', { headers: getAuthHeaders() });
  }

  /**
   * @param {number} clubid
   * @returns {Promise<Object>} Club data
   */
  async getById(clubid) {
    return this.request(`/${clubid}`, { headers: getAuthHeaders() });
  }

  /**
   * @param {number} clubid
   * @returns {Promise<Object>} Club rank info
   */
  async getRank(clubid) {
    return this.request(`/${clubid}/rank`, { headers: getAuthHeaders() });
  }

  /**
   * @param {string} clubname
   * @returns {Promise<Object>} Club by name
   */
  async getByName(clubname) {
    return this.request('/name', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ clubname })
    });
  }

  /**
   * @param {string} clubemail
   * @returns {Promise<Object>} Club by email
   */
  async getByEmail(clubemail) {
    return this.request('/email', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ clubemail })
    });
  }

  /**
   * @param {string} search
   * @returns {Promise<Array>} Matching clubs
   */
  async search(search) {
    return this.request('/search', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ search })
    });
  }

  /**
   * @param {Object} clubData
   * @returns {Promise<Object>} Created club
   */
  async create(clubData) {
    const res = await this.request('/create', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(clubData)
    });

    localStorage.setItem('jwt', res.token);
    localStorage.setItem('role', 'club');
    localStorage.setItem('clubid', res.club.clubid);
    localStorage.setItem('clubname', res.club.clubname);
    localStorage.setItem('clubemail', res.club.clubemail);
    localStorage.setItem('clubpoints', res.club.clubpoints);
    localStorage.setItem('clubpic', res.club.clubpic);
    localStorage.setItem('clubdesc', res.club.clubdesc);
    return res.club;
  }

  /**
   * @param {number} [limit=3]
   * @returns {Promise<Array>} Top clubs
   */
  async getTop(limit = 3) {
    return this.request('/top', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ limit })
    });
  }

  /**
   * @param {string} clubname
   * @returns {Promise<boolean>} Name exists
   */
  async checkNameExists(clubname) {
    return this.request('/exists/name', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ clubname })
    });
  }

  /**
   * @param {string} clubemail
   * @returns {Promise<boolean>} Email exists
   */
  async checkEmailExists(clubemail) {
    return this.request('/exists/email', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ clubemail })
    });
  }

  /**
   * @param {string} clubemail
   * @param {string} clubpass
   * @returns {Promise<Object>} Authenticated club
   */
  async authenticate(clubemail, clubpass) {
    const res = await this.request('/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clubemail, clubpass })
    });

    localStorage.setItem('jwt', res.token);
    localStorage.setItem('role', 'club');
    localStorage.setItem('clubid', res.club.clubid);
    localStorage.setItem('clubname', res.club.clubname);
    localStorage.setItem('clubemail', res.club.clubemail);
    localStorage.setItem('clubpoints', res.club.clubpoints);
    localStorage.setItem('clubpic', res.club.clubpic);
    localStorage.setItem('clubdesc', res.club.clubdesc);
    return res.club;
  }

  /**
   * @param {number} eventid
   * @returns {Promise<Object>} Award result
   */
  async awardPoints(eventid) {
    return this.request(`/event/${eventid}/award`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
  }

  /**
   * @param {number} clubid
   * @param {Object} updateData - Updated club fields
   * @returns {Promise<Object>} Updated club
   */
  async update(clubid, updateData) {
    return this.request(`/${clubid}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData)
    });
  }

  /**
   * @param {number} clubid
   * @param {number} delta
   * @returns {Promise<Object>} Updated points
   */
  async updatePoints(clubid, delta) {
    return this.request(`/${clubid}/points`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ delta })
    });
  }

  /**
   * @param {number} clubid
   * @returns {Promise<Object>} Deletion result
   */
  async delete(clubid) {
    return this.request(`/${clubid}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
  }
}