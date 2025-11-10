import { ClubAchDTO } from '../domain/dto/ClubAchDTO.js';
import { NotificationFactory } from '../domain/factory/NotificationFactory.js';

export class ClubAchService {
  constructor(clubAchRepository, achievementRepository, notificationRepository) {
    this.clubAchRepository = clubAchRepository;
    this.achievementRepository = achievementRepository;
    this.notificationRepository = notificationRepository;
  }

  async getAllClubAchs() {
    const clubAchs = await this.clubAchRepository.getAllClubAchs();
    return clubAchs.map(ClubAchDTO.fromEntity);
  }

  async getClubAchById(caid) {
    const clubAch = await this.clubAchRepository.getClubAchById(caid);
    if (!clubAch) throw new Error('Club achievement not found');
    return ClubAchDTO.fromEntity(clubAch);
  }

  async getClubAchsByClubId(clubid) {
    const clubAchs = await this.clubAchRepository.getClubAchsByClubId(clubid);
    return clubAchs.map(ClubAchDTO.fromEntity);
  }

  async getClubAchsByAchId(achid) {
    const clubAchs = await this.clubAchRepository.getClubAchsByAchId(achid);
    return clubAchs.map(ClubAchDTO.fromEntity);
  }

  async getClubAchByClubAndAchId(clubid, achid) {
    const clubAch = await this.clubAchRepository.getClubAchByClubAndAchId(clubid, achid);
    if (!clubAch) throw new Error('Club achievement not found');
    return ClubAchDTO.fromEntity(clubAch);
  }

  async createClubAch(clubAchData) {
    if (!clubAchData || !clubAchData.clubid || !clubAchData.achid)
      throw new Error('Missing club achievement data');

    const exists = await this.clubAchRepository.existsClubAchByClubAndAchId(clubAchData.clubid, clubAchData.achid);
    if (exists) throw new Error('Club already has this achievement');

    const clubAch = await this.clubAchRepository.createClubAch(clubAchData);
    const achievement = await this.achievementRepository.getAchievementById(clubAchData.achid);

    await Promise.all([
      this.notificationRepository.createNotification(
        NotificationFactory.forClubAchEarned(clubAchData.clubid, achievement)
      )
    ]);

    return ClubAchDTO.fromEntity(clubAch);
  }

  async deleteClubAch(caid) {
    const clubAch = await this.clubAchRepository.getClubAchById(caid);
    if (!clubAch) throw new Error('Club achievement not found');
    return await this.clubAchRepository.deleteClubAch(caid);
  }

  async deleteClubAchsByClubId(clubid) {
    const clubAchs = await this.clubAchRepository.getClubAchsByClubId(clubid);
    if (clubAchs.length === 0) throw new Error('No achievements found for this club');
    return await this.clubAchRepository.deleteClubAchsByClubId(clubid);
  }

  async deleteClubAchsByAchId(achid) {
    const clubAchs = await this.clubAchRepository.getClubAchsByAchId(achid);
    if (clubAchs.length === 0) throw new Error('No clubs found with this achievement');
    return await this.clubAchRepository.deleteClubAchsByAchId(achid);
  }

  async countClubAchs() {
    const count = await this.clubAchRepository.countClubAchs();
    return typeof count === 'number' ? count : 0;
  }

  async countClubAchsByClubId(clubid) {
    const count = await this.clubAchRepository.countClubAchsByClubId(clubid);
    return typeof count === 'number' ? count : 0;
  }

  async countClubAchsByAchId(achid) {
    const count = await this.clubAchRepository.countClubAchsByAchId(achid);
    return typeof count === 'number' ? count : 0;
  }

  async existsClubAchByClubAndAchId(clubid, achid) {
    return await this.clubAchRepository.existsClubAchByClubAndAchId(clubid, achid);
  }
}