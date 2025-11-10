import { BaseService } from './BaseService.js';

function getAuthHeaders() {
  const token = localStorage.getItem('jwt');
  return token
    ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };
}

export default class NotificationService extends BaseService {
  constructor() {
    super('http://localhost:4000/api/notifs');
  }

  /**
   * @returns {Promise<Array>}
   */
  async getAll() {
    return this.request('/', { headers: getAuthHeaders() });
  }

  /**
   * @param   {number} notifid
   * @returns {Promise<Object>}
   */
  async getById(notifid) {
    return this.request(`/${notifid}`, { headers: getAuthHeaders() });
  }

  /**
   * @param   {number} userid
   * @returns {Promise<Array>}
   */
  async getByUser(userid) {
    return this.request(`/user/${userid}`, { headers: getAuthHeaders() });
  }

  /**
   * @param   {number} userid
   * @returns {Promise<number>}
   */
  async countByUser(userid) {
    return this.request(`/user/${userid}/count`, { headers: getAuthHeaders() });
  }

  /**
   * @param   {number} userid
   * @returns {Promise<boolean>}
   */
  async existsByUser(userid) {
    return this.request(`/user/${userid}/exists`, { headers: getAuthHeaders() });
  }

  /**
   * @param   {Object} notifData
   * @returns {Promise<Object>}
   */
  async create(notifData) {
    return this.request('/create', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(notifData)
    });
  }

  /**
   * @param   {number} userid
   * @param   {string} notifstatus
   * @returns {Promise<Array>}
   */
  async getByStatusAndUser(userid, notifstatus) {
    return this.request('/user/status', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userid, notifstatus })
    });
  }

  /**
   * @param   {number} userid
   * @param   {string} notiftype
   * @returns {Promise<Array>}
   */
  async getByTypeAndUser(userid, notiftype) {
    return this.request('/user/type', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userid, notiftype })
    });
  }

  /**
   * @param   {number} userid
   * @param   {string} notifcdate
   * @returns {Promise<Array>}
   */
  async getByBeforeDateAndUser(userid, notifcdate) {
    return this.request('/user/date/before', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userid, notifcdate })
    });
  }

  /**
   * @param   {number} userid
   * @param   {string} notifcdate
   * @returns {Promise<Array>}
   */
  async getByAfterDateAndUser(userid, notifcdate) {
    return this.request('/user/date/after', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userid, notifcdate })
    });
  }

  /**
   * @param   {number} userid
   * @param   {string} notifstartdate
   * @param   {string} notifenddate
   * @returns {Promise<Array>}
   */
  async getByDateRangeAndUser(userid, notifstartdate, notifenddate) {
    return this.request('/user/date/range', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userid, notifstartdate, notifenddate })
    });
  }

  /**
   * @param   {string} search
   * @returns {Promise<Array>}
   */
  async search(search) {
    return this.request('/user/search', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ search })
    });
  }

  /**
   * @param   {number} userid
   * @param   {string} notifstatus
   * @returns {Promise<number>}
   */
  async countByStatusAndUser(userid, notifstatus) {
    return this.request('/user/status/count', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userid, notifstatus })
    });
  }

  /**
   * @param   {number} userid
   * @param   {string} notiftype
   * @returns {Promise<number>}
   */
  async countByTypeAndUser(userid, notiftype) {
    return this.request('/user/type/count', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userid, notiftype })
    });
  }

  /**
   * @param   {number} userid
   * @param   {string} notifcdate
   * @returns {Promise<number>}
   */
  async countByBeforeDateAndUser(userid, notifcdate) {
    return this.request('/user/date/before/count', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userid, notifcdate })
    });
  }

  /**
   * @param   {number} userid
   * @param   {string} notifcdate
   * @returns {Promise<number>}
   */
  async countByAfterDateAndUser(userid, notifcdate) {
    return this.request('/user/date/after/count', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userid, notifcdate })
    });
  }

  /**
   * @param   {number} userid
   * @param   {string} notifstartdate
   * @param   {string} notifenddate
   * @returns {Promise<number>}
   */
  async countByDateRangeAndUser(userid, notifstartdate, notifenddate) {
    return this.request('/user/date/range/count', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userid, notifstartdate, notifenddate })
    });
  }

  /**
   * @param   {number} userid
   * @param   {string} notifstatus
   * @returns {Promise<boolean>}
   */
  async existsByStatusAndUser(userid, notifstatus) {
    return this.request('/user/status/exists', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userid, notifstatus })
    });
  }

  /**
   * @param   {number} notifid
   * @param   {string} notifstatus
   * @returns {Promise<Object>}
   */
  async updateStatus(notifid, notifstatus) {
    return this.request(`/${notifid}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ notifstatus })
    });
  }

  /**
   * @param   {number} notifid
   * @returns {Promise<Object>}
   */
  async delete(notifid) {
    return this.request(`/${notifid}`, {
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
   * @param   {number} userid
   * @param   {string} notifstatus
   * @returns {Promise<Object>}
   */
  async deleteByStatusAndUser(userid, notifstatus) {
    return this.request('/user/status/delete', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userid, notifstatus })
    });
  }

  /**
   * @param   {number} userid
   * @param   {string} notiftype
   * @returns {Promise<Object>}
   */
  async deleteByTypeAndUser(userid, notiftype) {
    return this.request('/user/type/delete', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userid, notiftype })
    });
  }

  /**
   * @param   {number} userid
   * @param   {string} notifcdate
   * @returns {Promise<Object>}
   */
  async deleteByDateAndUser(userid, notifcdate) {
    return this.request('/user/date/delete', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userid, notifcdate })
    });
  }
}