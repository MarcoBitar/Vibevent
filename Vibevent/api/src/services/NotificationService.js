import { NotificationDTO } from '../domain/dto/NotificationDTO.js';

export class NotificationService {
  constructor(notificationRepository) {
    this.notificationRepository = notificationRepository;
  }

  async getAllNotifications() {
    const notifications = await this.notificationRepository.getAllNotifications();
    return notifications.map(NotificationDTO.fromEntity);
  }

  async getNotificationsById(notificationid) {
    const notification = await this.notificationRepository.getNotificationsById(notificationid);
    if (!notification) throw new Error('Notification not found');
    return NotificationDTO.fromEntity(notification);
  }

  async getNotificationsByUserId(userid) {
    const notifications = await this.notificationRepository.getNotificationsByUserId(userid);
    return notifications.map(NotificationDTO.fromEntity);
  }

  async getNotificationsByStatusAndUserId(userid, notifstatus) {
    const notifications = await this.notificationRepository.getNotificationsByStatusAndUserId(userid, notifstatus);
    return notifications.map(NotificationDTO.fromEntity);
  }

  async getNotificationsByTypeAndUserId(userid, notiftype) {
    const notifications = await this.notificationRepository.getNotificationsByTypeAndUserId(userid, notiftype);
    return notifications.map(NotificationDTO.fromEntity);
  }

  async getNotificationsByBeforeDateandUserId(userid, beforeDate) {
    const notifications = await this.notificationRepository.getNotificationsByBeforeDateandUserId(userid, beforeDate);
    return notifications.map(NotificationDTO.fromEntity);
  }

  async getNotificationsByAfterDateandUserId(userid, afterDate) {
    const notifications = await this.notificationRepository.getNotificationsByAfterDateandUserId(userid, afterDate);
    return notifications.map(NotificationDTO.fromEntity);
  }

  async getNotificationsByDateRangeandUserId(userid, startDate, endDate) {
    const notifications = await this.notificationRepository.getNotificationsByDateRangeandUserId(userid, startDate, endDate);
    return notifications.map(NotificationDTO.fromEntity);
  }

  async getNotificationsBySearch(userid, search) {
    if (!search) return [];
    const notifications = await this.notificationRepository.getNotificationsBySearch(userid, search);
    return notifications.map(NotificationDTO.fromEntity);
  }

  async createNotification(notificationData) {
    if (!notificationData || !notificationData.userid || !notificationData.notifcontent) {
      throw new Error('Missing notification data');
    }

    const notification = await this.notificationRepository.createNotification(notificationData);
    return NotificationDTO.fromEntity(notification);
  }

  async updateNotificationStatus(notificationid, notifstatus) {
    const notification = await this.notificationRepository.getNotificationsById(notificationid);
    if (!notification) throw new Error('Notification not found');

    const updated = await this.notificationRepository.updateNotificationStatus(notificationid, notifstatus);
    return NotificationDTO.fromEntity(updated);
  }

  async deleteNotification(notificationid) {
    const notification = await this.notificationRepository.getNotificationsById(notificationid);
    if (!notification) throw new Error('Notification not found');
    return await this.notificationRepository.deleteNotification(notificationid);
  }

  async deleteNotificationsByUserId(userid) {
    const notifications = await this.notificationRepository.getNotificationsByUserId(userid);
    if (notifications.length === 0) throw new Error('No notifications found for this user');
    return await this.notificationRepository.deleteNotificationsByUserId(userid);
  }

  async deleteNotificationsByStatusAndUserId(userid, notifstatus) {
    const notifications = await this.notificationRepository.getNotificationsByStatusAndUserId(userid, notifstatus);
    if (notifications.length === 0) throw new Error('No matching notifications found');
    return await this.notificationRepository.deleteNotificationsByStatusAndUserId(userid, notifstatus);
  }

  async deleteNotificationsByTypeAndUserId(userid, notiftype) {
    const notifications = await this.notificationRepository.getNotificationsByTypeAndUserId(userid, notiftype);
    if (notifications.length === 0) throw new Error('No matching notifications found');
    return await this.notificationRepository.deleteNotificationsByTypeAndUserId(userid, notiftype);
  }

  async deleteNotificationsByDateandUserId(userid, beforeDate) {
    const notifications = await this.notificationRepository.getNotificationsByDateandUserId(userid, beforeDate);
    if (notifications.length === 0) throw new Error('No notifications found before this date');
    return await this.notificationRepository.deleteNotificationsByDateandUserId(userid, beforeDate);
  }

  async countNotificationsByUserId(userid) {
    const count = await this.notificationRepository.countNotificationsByUserId(userid);
    return typeof count === 'number' ? count : 0;
  }

  async countNotificationsByStatusAndUserId(userid, notifstatus) {
    const count = await this.notificationRepository.countNotificationsByStatusAndUserId(userid, notifstatus);
    return typeof count === 'number' ? count : 0;
  }

  async countNotificationsByTypeAndUserId(userid, notiftype) {
    const count = await this.notificationRepository.countNotificationsByTypeAndUserId(userid, notiftype);
    return typeof count === 'number' ? count : 0;
  }

  async countNotificationsByBeforeDateandUserId(userid, beforeDate) {
    const count = await this.notificationRepository.countNotificationsByBeforeDateandUserId(userid, beforeDate);
    return typeof count === 'number' ? count : 0;
  }

  async countNotificationsByAfterDateandUserId(userid, afterDate) {
    const count = await this.notificationRepository.countNotificationsByAfterDateandUserId(userid, afterDate);
    return typeof count === 'number' ? count : 0;
  }

  async countNotifcationsByDateRangeAndUserId(userid, startDate, endDate) {
    const count = await this.notificationRepository.countNotifcationsByDateRangeAndUserId(userid, startDate, endDate);
    return typeof count === 'number' ? count : 0;
  }

  async existsNotificationsByUserId(userid) {
    return await this.notificationRepository.existsNotificationsByUserId(userid);
  }

  async existsNotificationsByStatusAndUserId(userid, notifstatus) {
    return await this.notificationRepository.existsNotificationsByStatusAndUserId(userid, notifstatus);
  }
}