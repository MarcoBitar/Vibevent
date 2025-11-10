import { ClubDTO } from '../domain/dto/ClubDTO.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NotificationFactory } from '../domain/factory/NotificationFactory.js';

export class ClubService {
  constructor(clubRepository, eventRepository, attendanceRepository, notificationRepository) {
    this.clubRepository = clubRepository;
    this.eventRepository = eventRepository;
    this.attendanceRepository = attendanceRepository;
    this.notificationRepository = notificationRepository;
  }

  async getAllClubs() {
    const clubs = await this.clubRepository.getAllClubs();
    return clubs.map(ClubDTO.fromEntity);
  }

  async getClubById(clubid) {
    const club = await this.clubRepository.getClubById(clubid);
    if (!club) throw new Error('Club not found');
    return ClubDTO.fromEntity(club);
  }

  async getClubByName(clubname) {
    const club = await this.clubRepository.getClubByName(clubname);
    if (!club) throw new Error('Club not found');
    return ClubDTO.fromEntity(club);
  }

  async getClubByEmail(clubemail) {
    const club = await this.clubRepository.getClubByEmail(clubemail);
    if (!club) throw new Error('Club not found');
    return ClubDTO.fromEntity(club);
  }

  async getClubBySearch(query) {
    if (!query) return [];
    const clubs = await this.clubRepository.getClubBySearch(query);
    return clubs.map(ClubDTO.fromEntity);
  }

  async createClub(clubData) {
    if (!clubData || !clubData.clubname || !clubData.clubemail || !clubData.clubpass) throw new Error('Missing registration data');
    const [nameTaken, emailTaken] = await Promise.all([
      this.clubRepository.existsClubByName(clubData.clubname),
      this.clubRepository.existsClubByEmail(clubData.clubemail)
    ]);
    if (nameTaken || emailTaken) throw new Error('Club name or email already taken');
    const password_hash = await bcrypt.hash(clubData.clubpass, 10);
    const club = await this.clubRepository.createClub({ ...clubData, clubpass: password_hash });
    return ClubDTO.fromEntity(club);
  }

  async updateClub(clubid, updateData) {
    if (!updateData) throw new Error('No update data provided');
    const club = await this.clubRepository.getClubById(clubid);
    if (!club) throw new Error('Club not found');
    const finalData = {
      clubname: updateData.clubname?.trim() || club.clubname,
      clubemail: updateData.clubemail?.trim() || club.clubemail,
      clubdesc: updateData.clubdesc || club.clubdesc,
      clubpoints: updateData.clubpoints ?? club.clubpoints,
      clubpic: updateData.clubpic || club.clubpic,
      clubpass: updateData.clubpass ? await bcrypt.hash(updateData.clubpass, 10) : club.clubpass
    };
    const updated = await this.clubRepository.updateClub(clubid, finalData);
    return ClubDTO.fromEntity(updated);
  }

  async updateClubPoints(clubid, delta) {
    if (typeof delta !== 'number') throw new Error('Invalid delta value');
    const club = await this.clubRepository.updateClubPoints(clubid, delta);
    if (!club) throw new Error('Club not found');
    return ClubDTO.fromEntity(club);
  }

  async deleteClub(clubid) {
    const club = await this.clubRepository.getClubById(clubid);
    if (!club) throw new Error('Club not found');
    return await this.clubRepository.deleteClub(clubid);
  }

  async countClubs() {
    const count = await this.clubRepository.countClubs();
    return typeof count === 'number' ? count : 0;
  }

  async getTopClubs(limit) {
    const clubs = await this.clubRepository.getTopClubs(limit);
    return clubs.map(ClubDTO.fromEntity);
  }

  async getRank(clubid) {
    const rank = await this.clubRepository.getRank(clubid);
    if (rank === null || rank === undefined) throw new Error('Rank not found');
    return rank;
  }

  async existsClubByName(clubname) {
    return await this.clubRepository.existsClubByName(clubname);
  }

  async existsClubByEmail(clubemail) {
    return await this.clubRepository.existsClubByEmail(clubemail);
  }

  async authenticateClub(clubemail, clubpass) {
    if (!clubemail || !clubpass) throw new Error('Missing login credentials');
    const club = await this.clubRepository.getClubByEmail(clubemail);
    if (!club) throw new Error('Club not found');
    const isValid = await bcrypt.compare(clubpass, club.clubpass);
    if (!isValid) throw new Error('Invalid password');
    const token = jwt.sign({ clubid: club.clubid }, process.env.JWT_SECRET, { expiresIn: '6h' });
    return { token, club: ClubDTO.fromEntity(club) };
  }

  async awardPointsForEvent(eventid) {
    const event = await this.eventRepository.getEventById(eventid);
    if (!event) throw new Error('Event not found');
    const now = new Date();
    const eventStart = new Date(event.eventdate);
    const graceWindow = new Date(eventStart.getTime() + 30 * 60 * 1000);
    if (graceWindow > now) throw new Error('Event is still within the 30-minute grace window');

    const presentCount = await this.attendanceRepository.countAttendanceByStatusandEventId('yes', eventid);
    const points = Math.floor(presentCount / 5);

    if (points > 0) {
      await this.clubRepository.updateClubPoints(event.clubid, points);
      const notif = NotificationFactory.forClubPointsAwarded(event.clubid, event.eventtitle, points);
      await this.notificationRepository.createNotification(notif);
    }

    const updatedClub = await this.clubRepository.getClubById(event.clubid);
    return { club: ClubDTO.fromEntity(updatedClub), pointsAwarded: points };
  }
}
