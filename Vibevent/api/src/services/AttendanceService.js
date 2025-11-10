import { AttendanceDTO } from '../domain/dto/AttendanceDTO.js';
import { NotificationFactory } from '../domain/factory/NotificationFactory.js';

export class AttendanceService {
  constructor(attendanceRepository, eventRepository, notificationRepository, userRepository) {
    this.attendanceRepository = attendanceRepository;
    this.eventRepository = eventRepository;
    this.notificationRepository = notificationRepository;
    this.userRepository = userRepository;
  }

  async getAllAttendances() {
    const attendances = await this.attendanceRepository.getAllAttendances();
    return attendances.map(AttendanceDTO.fromEntity);
  }

  async getAttendanceById(attendanceid) {
    const attendance = await this.attendanceRepository.getAttendanceById(attendanceid);
    if (!attendance) throw new Error('Attendance not found');
    return AttendanceDTO.fromEntity(attendance);
  }

  async getAttendancesByEventId(eventid) {
    const attendances = await this.attendanceRepository.getAttendancesByEventId(eventid);
    return attendances.map(AttendanceDTO.fromEntity);
  }

  async getAttendancesByUserId(userid) {
    const attendances = await this.attendanceRepository.getAttendancesByUserId(userid);
    return attendances.map(AttendanceDTO.fromEntity);
  }

  async getAttendanceByEventAndUser(eventid, userid) {
    const attendance = await this.attendanceRepository.getAttendanceByEventAndUser(eventid, userid);
    if (!attendance) throw new Error('Attendance not found');
    return AttendanceDTO.fromEntity(attendance);
  }

  async getAttendeesByStatusAndEventId(attendstatus, eventid) {
    return await this.attendanceRepository.getAttendeesByStatusAndEventId(attendstatus, eventid);
  }

  async createAttendance(attendanceData) {
    if (!attendanceData || !attendanceData.userid || !attendanceData.eventid || !attendanceData.attendmethod || !attendanceData.attendstatus)
      throw new Error('Missing attendance data');

    const event = await this.eventRepository.getEventById(attendanceData.eventid);
    if (!event) throw new Error('Event not found');

    const now = new Date();
    const eventDate = new Date(event.eventdate);
    if (eventDate < now) throw new Error('Cannot attend a completed event');

    const exists = await this.attendanceRepository.existsAttendanceByEventandUserId(attendanceData.eventid, attendanceData.userid);
    if (exists) throw new Error('Attendance already exists');

    const attendance = await this.attendanceRepository.createAttendance(attendanceData);

    // Fetch the user object to get the name
    const user = await this.userRepository.getUserById(attendanceData.userid);

    const notifs = [
      NotificationFactory.forAttendanceMarked(user, event, attendanceData.attendstatus)
    ];

    await Promise.all(notifs.map(async (notif) => {
      await this.notificationRepository.createNotification(notif);
    }));

    return AttendanceDTO.fromEntity(attendance);
  }

  async updateAttendanceStatus(attendid, attendstatus) {
    const attendance = await this.attendanceRepository.getAttendanceById(attendid);
    if (!attendance) throw new Error('Attendance not found');

    const event = await this.eventRepository.getEventById(attendance.eventid);
    if (!event) throw new Error('Event not found');

    const now = new Date();
    const eventDate = new Date(event.eventdate);
    if (eventDate < now) throw new Error('Cannot update attendance for a completed event');

    const updated = await this.attendanceRepository.updateAttendanceStatus(attendid, attendstatus);

    // Fetch the user object to get the name
    const user = await this.userRepository.getUserById(updated.userid);

    const notifs = [
      NotificationFactory.forAttendanceMarked(user, event, attendstatus),
      NotificationFactory.forUserAttendanceUpdated(user, event, attendstatus)
    ];

    await Promise.all(notifs.map(async (notif) => {
      await this.notificationRepository.createNotification(notif);
    }));

    return AttendanceDTO.fromEntity(updated);
  }

  async deleteAttendance(attendid) {
    const attendance = await this.attendanceRepository.getAttendanceById(attendid);
    if (!attendance) throw new Error('Attendance not found');
    return await this.attendanceRepository.deleteAttendance(attendid);
  }

  async deleteAttendancesByEventId(eventid) {
    const attendances = await this.attendanceRepository.getAttendancesByEventId(eventid);
    if (attendances.length === 0) throw new Error('No attendances found for this event');
    return await this.attendanceRepository.deleteAttendancesByEventId(eventid);
  }

  async deleteAttendancesByUserId(userid) {
    const attendances = await this.attendanceRepository.getAttendancesByUserId(userid);
    if (attendances.length === 0) throw new Error('No attendances found for this user');
    return await this.attendanceRepository.deleteAttendancesByUserId(userid);
  }

  async countAttendanceByStatusandEventId(attendstatus, eventid) {
    const count = await this.attendanceRepository.countAttendanceByStatusandEventId(attendstatus, eventid);
    return typeof count === 'number' ? count : 0;
  }

  async countAttendanceByStatusandUserId(attendstatus, userid) {
    const count = await this.attendanceRepository.countAttendanceByStatusandUserId(attendstatus, userid);
    return typeof count === 'number' ? count : 0;
  }

  async existsAttendanceByEventandUserId(eventid, userid) {
    return await this.attendanceRepository.existsAttendanceByEventandUserId(eventid, userid);
  }
}