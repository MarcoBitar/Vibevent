import { BaseService } from './BaseService.js';

function getAuthHeaders() {
  const token = localStorage.getItem('jwt');
  return token
    ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };
}

export default class UserService extends BaseService {
  constructor() {
    super('http://localhost:4000/api/users');
  }

  /**
   * @returns {Promise<Array>} All users
   */
  async getAll() {
    return this.request('/', { headers: getAuthHeaders() });
  }

  /**
   * @returns {Promise<number>} Total user count
   */
  async count() {
    return this.request('/count', { headers: getAuthHeaders() });
  }

  /**
   * @param {number} userid
   * @returns {Promise<Object>} User data
   */
  async getById(userid) {
    return this.request(`/${userid}`, { headers: getAuthHeaders() });
  }

  /**
   * @param {number} userid
   * @returns {Promise<Object>} User rank info
   */
  async getRank(userid) {
    return this.request(`/${userid}/rank`, { headers: getAuthHeaders() });
  }

  /**
   * @param {string} useremail
   * @returns {Promise<Object>} User by email
   */
  async getByEmail(useremail) {
    return this.request('/email', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ useremail })
    });
  }

  /**
   * @param {string} username
   * @returns {Promise<Object>} User by username
   */
  async getByUsername(username) {
    return this.request('/username', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ username })
    });
  }

  /**
   * @param {string} search
   * @returns {Promise<Array>} Matching users
   */
  async search(search) {
    return this.request('/search', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ search })
    });
  }

  /**
   * @param {Object} userData
   * @returns {Promise<Object>} Created user
   */
  async create(userData) {
    const res = await this.request('/create', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });

    localStorage.setItem('jwt', res.token);
    localStorage.setItem('role', 'user');
    localStorage.setItem('userid', res.user.userid);
    localStorage.setItem('username', res.user.username);
    localStorage.setItem('userpoints', res.user.userpoints);
    localStorage.setItem('useremail', res.user.useremail);
    localStorage.setItem('userpic', res.user.userpic);
    return res.user;
  }

  /**
   * @param {number} [limit=3]
   * @returns {Promise<Array>} Top users
   */
  async getTop(limit = 3) {
    return this.request('/top', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ limit })
    });
  }

  /**
   * @param {string} username
   * @returns {Promise<boolean>} Username exists
   */
  async checkUsernameExists(username) {
    return this.request('/exists/username', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ username })
    });
  }

  /**
   * @param {string} useremail
   * @returns {Promise<boolean>} Email exists
   */
  async checkEmailExists(useremail) {
    return this.request('/exists/email', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ useremail })
    });
  }

  /**
   * @param {string} identifier
   * @returns {Promise<Object>} User by identifier
   */
  async getByIdentifier(identifier) {
    return this.request('/identifier', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ identifier })
    });
  }

  /**
   * @param {string} useremail
   * @param {string} userpass
   * @returns {Promise<Object>} Authenticated user
   */
  async authenticate(useremail, userpass) {
    const res = await this.request('/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ useremail, userpass })
    });

    localStorage.setItem('jwt', res.token);
    localStorage.setItem('role', 'user');
    localStorage.setItem('userid', res.user.userid);
    localStorage.setItem('username', res.user.username);
    localStorage.setItem('userpoints', res.user.userpoints);
    localStorage.setItem('useremail', res.user.useremail);
    localStorage.setItem('userpic', res.user.userpic);
    return res.user;
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
   * @param {number} userid
   * @param {Object} updateData
   * @returns {Promise<Object>} Updated user
   */
  async update(userid, updateData) {
    return this.request(`/${userid}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData)
    });
  }

  /**
   * @param {number} userid
   * @param {number} delta
   * @returns {Promise<Object>} Updated points
   */
  async updatePoints(userid, delta) {
    return this.request(`/${userid}/points`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ delta })
    });
  }

  /**
   * @param {number} userid
   * @returns {Promise<Object>} Deletion result
   */
  async delete(userid) {
    return this.request(`/${userid}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
  }
}