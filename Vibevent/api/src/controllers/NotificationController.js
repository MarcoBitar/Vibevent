export class NotificationController {
  constructor(notificationService) {
    this.notificationService = notificationService;
  }

  getAllNotifications = async (req, res, next) => {
    try {
      const notifs = await this.notificationService.getAllNotifications();
      res.status(200).json(notifs);
    } catch (err) {
      next(err);
    }
  };

  getNotificationsById = async (req, res, next) => {
    try {
      const notif = await this.notificationService.getNotificationsById(req.params.notifid);
      res.status(200).json(notif);
    } catch (err) {
      next(err);
    }
  };

  getNotificationsByUserId = async (req, res, next) => {
    try {
      const notifs = await this.notificationService.getNotificationsByUserId(req.params.userid);
      res.status(200).json(notifs);
    } catch (err) {
      next(err);
    }
  };

  getNotificationsByStatusAndUserId = async (req, res, next) => {
    try {
      const { userid, notifstatus } = req.body;
      const notifs = await this.notificationService.getNotificationsByStatusAndUserId(userid, notifstatus);
      res.status(200).json(notifs);
    } catch (err) {
      next(err);
    }
  };

  getNotificationsByTypeAndUserId = async (req, res, next) => {
    try {
      const { userid, notiftype } = req.body;
      const notifs = await this.notificationService.getNotificationsByTypeAndUserId(userid, notiftype);
      res.status(200).json(notifs);
    } catch (err) {
      next(err);
    }
  };

  getNotificationsByBeforeDateandUserId = async (req, res, next) => {
    try {
      const { userid, beforeDate } = req.body;
      const notifs = await this.notificationService.getNotificationsByBeforeDateandUserId(userid, beforeDate);
      res.status(200).json(notifs);
    } catch (err) {
      next(err);
    }
  };

  getNotificationsByAfterDateandUserId = async (req, res, next) => {
    try {
      const { userid, afterDate } = req.body;
      const notifs = await this.notificationService.getNotificationsByAfterDateandUserId(userid, afterDate);
      res.status(200).json(notifs);
    } catch (err) {
      next(err);
    }
  };

  getNotificationsByDateRangeandUserId = async (req, res, next) => {
    try {
      const { userid, startDate, endDate } = req.body;

      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Missing startDate or endDate' });
      }

      const normalizeDate = (d, isStart) => {
        const date = new Date(d);
        if (isNaN(date)) return null;

        date.setHours(isStart ? 0 : 23, isStart ? 0 : 59, isStart ? 0 : 59, isStart ? 0 : 999);

        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');

        return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
      };

      const start = normalizeDate(startDate, true);
      const end = normalizeDate(endDate, false);

      if (!start || !end) {
        return res.status(400).json({ error: 'Invalid date format' });
      }

      const notifs = await this.notificationService.getNotificationsByDateRangeandUserId(userid, start, end);
      res.status(200).json(notifs);
    } catch (err) {
      next(err);
    }
  };

  getNotificationsBySearch = async (req, res, next) => {
    try {
      const { userid, search } = req.body;
      const notifs = await this.notificationService.getNotificationsBySearch(userid, search);
      res.status(200).json(notifs);
    } catch (err) {
      next(err);
    }
  };

  createNotification = async (req, res, next) => {
    try {
      const notif = await this.notificationService.createNotification(req.body);
      res.status(201).json(notif);
    } catch (err) {
      next(err);
    }
  };

  updateNotificationStatus = async (req, res, next) => {
    try {
      const notif = await this.notificationService.updateNotificationStatus(req.params.notifid, req.body.notifstatus);
      res.status(200).json(notif);
    } catch (err) {
      next(err);
    }
  };

  deleteNotification = async (req, res, next) => {
    try {
      const result = await this.notificationService.deleteNotification(req.params.notifid);
      res.status(200).json({ success: result });
    } catch (err) {
      next(err);
    }
  };

  deleteNotificationsByUserId = async (req, res, next) => {
    try {
      const result = await this.notificationService.deleteNotificationsByUserId(req.params.userid);
      res.status(200).json({ success: result });
    } catch (err) {
      next(err);
    }
  };

  deleteNotificationsByStatusAndUserId = async (req, res, next) => {
    try {
      const { userid, notifstatus } = req.body;
      const result = await this.notificationService.deleteNotificationsByStatusAndUserId(userid, notifstatus);
      res.status(200).json({ success: result });
    } catch (err) {
      next(err);
    }
  };

  deleteNotificationsByTypeAndUserId = async (req, res, next) => {
    try {
      const { userid, notiftype } = req.body;
      const result = await this.notificationService.deleteNotificationsByTypeAndUserId(userid, notiftype);
      res.status(200).json({ success: result });
    } catch (err) {
      next(err);
    }
  };

  deleteNotificationsByDateandUserId = async (req, res, next) => {
    try {
      const { userid, beforeDate } = req.body;
      const result = await this.notificationService.deleteNotificationsByDateandUserId(userid, beforeDate);
      res.status(200).json({ success: result });
    } catch (err) {
      next(err);
    }
  };

  countNotificationsByUserId = async (req, res, next) => {
    try {
      const count = await this.notificationService.countNotificationsByUserId(req.params.userid);
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  countNotificationsByStatusAndUserId = async (req, res, next) => {
    try {
      const { userid, notifstatus } = req.body;
      const count = await this.notificationService.countNotificationsByStatusAndUserId(userid, notifstatus);
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  countNotificationsByTypeAndUserId = async (req, res, next) => {
    try {
      const { userid, notiftype } = req.body;
      const count = await this.notificationService.countNotificationsByTypeAndUserId(userid, notiftype);
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  countNotificationsByBeforeDateandUserId = async (req, res, next) => {
    try {
      const { userid, beforeDate } = req.body;
      const count = await this.notificationService.countNotificationsByBeforeDateandUserId(userid, beforeDate);
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  countNotificationsByAfterDateandUserId = async (req, res, next) => {
    try {
      const { userid, afterDate } = req.body;
      const count = await this.notificationService.countNotificationsByAfterDateandUserId(userid, afterDate);
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  countNotifcationsByDateRangeAndUserId = async (req, res, next) => {
    try {
      const { userid, startDate, endDate } = req.body;

      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Missing startDate or endDate' });
      }

      const normalizeDate = (d, isStart) => {
        const date = new Date(d);
        if (isNaN(date)) return null;

        date.setHours(isStart ? 0 : 23, isStart ? 0 : 59, isStart ? 0 : 59, isStart ? 0 : 999);

        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');

        return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
      };

      const start = normalizeDate(startDate, true);
      const end = normalizeDate(endDate, false);

      if (!start || !end) {
        return res.status(400).json({ error: 'Invalid date format' });
      }

      const count = await this.notificationService.countNotifcationsByDateRangeAndUserId(userid, start, end);
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  existsNotificationsByUserId = async (req, res, next) => {
    try {
      const exists = await this.notificationService.existsNotificationsByUserId(req.params.userid);
      res.status(200).json({ exists });
    } catch (err) {
      next(err);
    }
  };

  existsNotificationsByStatusAndUserId = async (req, res, next) => {
    try {
      const { userid, notifstatus } = req.body;
      const exists = await this.notificationService.existsNotificationsByStatusAndUserId(userid, notifstatus);
      res.status(200).json({ exists });
    } catch (err) {
      next(err);
    }
  };
}