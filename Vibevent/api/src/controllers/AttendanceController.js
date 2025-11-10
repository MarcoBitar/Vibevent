export class AttendanceController {
  constructor(attendanceService) {
    this.attendanceService = attendanceService;
  }

  getAllAttendances = async (req, res, next) => {
    try {
      const attendances = await this.attendanceService.getAllAttendances();
      res.status(200).json(attendances);
    } catch (err) {
      next(err);
    }
  };

  getAttendanceById = async (req, res, next) => {
    try {
      const attendance = await this.attendanceService.getAttendanceById(req.params.attendid);
      res.status(200).json(attendance);
    } catch (err) {
      next(err);
    }
  };

  getAttendancesByEventId = async (req, res, next) => {
    try {
      const attendances = await this.attendanceService.getAttendancesByEventId(req.params.eventid);
      res.status(200).json(attendances);
    } catch (err) {
      next(err);
    }
  };

  getAttendancesByUserId = async (req, res, next) => {
    try {
      const attendances = await this.attendanceService.getAttendancesByUserId(req.params.userid);
      res.status(200).json(attendances);
    } catch (err) {
      next(err);
    }
  };

  getAttendanceByEventAndUser = async (req, res, next) => {
    try {
      const { eventid, userid } = req.body;
      const attendance = await this.attendanceService.getAttendanceByEventAndUser(eventid, userid);
      res.status(200).json(attendance);
    } catch (err) {
      next(err);
    }
  };

  getAttendeesByStatusAndEventId = async (req, res, next) => {
    try {
      const { attendstatus, eventid } = req.body;
      const users = await this.attendanceService.getAttendeesByStatusAndEventId(attendstatus, eventid);
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };

  createAttendance = async (req, res, next) => {
    try {
      const attendance = await this.attendanceService.createAttendance(req.body);
      res.status(201).json(attendance);
    } catch (err) {
      next(err);
    }
  };

  updateAttendanceStatus = async (req, res, next) => {
    try {
      const attendance = await this.attendanceService.updateAttendanceStatus(req.params.attendid, req.body.attendstatus);
      res.status(200).json(attendance);
    } catch (err) {
      next(err);
    }
  };

  deleteAttendance = async (req, res, next) => {
    try {
      const result = await this.attendanceService.deleteAttendance(req.params.attendid);
      res.status(200).json({ success: result });
    } catch (err) {
      next(err);
    }
  };

  deleteAttendancesByEventId = async (req, res, next) => {
    try {
      const result = await this.attendanceService.deleteAttendancesByEventId(req.params.eventid);
      res.status(200).json({ success: result });
    } catch (err) {
      next(err);
    }
  };

  deleteAttendancesByUserId = async (req, res, next) => {
    try {
      const result = await this.attendanceService.deleteAttendancesByUserId(req.params.userid);
      res.status(200).json({ success: result });
    } catch (err) {
      next(err);
    }
  };

  countAttendanceByStatusandEventId = async (req, res, next) => {
    try {
      const { attendstatus, eventid } = req.body;
      const count = await this.attendanceService.countAttendanceByStatusandEventId(attendstatus, eventid);
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  countAttendanceByStatusandUserId = async (req, res, next) => {
    try {
      const { attendstatus, userid } = req.body;
      const count = await this.attendanceService.countAttendanceByStatusandUserId(attendstatus, userid);
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  existsAttendanceByEventandUserId = async (req, res, next) => {
    try {
      const { eventid, userid } = req.body;
      const exists = await this.attendanceService.existsAttendanceByEventandUserId(eventid, userid);
      res.status(200).json({ exists });
    } catch (err) {
      next(err);
    }
  };
}