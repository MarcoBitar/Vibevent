import { AchievementDTO } from '../domain/dto/AchievementDTO.js';
import { NotificationFactory } from '../domain/factory/NotificationFactory.js'

export class AchievementService {
  constructor(achievementRepository, notificationRepository, userRepository, clubRepository) {
    this.achievementRepository = achievementRepository;
    this.notificationRepository = notificationRepository;
    this.userRepository = userRepository;
    this.clubRepository = clubRepository;
  }

  async getAllAchievements() {
    const achievements = await this.achievementRepository.getAllAchievements();
    return achievements.map(AchievementDTO.fromEntity);
  }

  async getAchievementById(achid) {
    const achievement = await this.achievementRepository.getAchievementById(achid);
    if (!achievement) throw new Error('Achievement not found');
    return AchievementDTO.fromEntity(achievement);
  }

  async getAchievementByTitle(achtitle) {
    const achievement = await this.achievementRepository.getAchievementByTitle(achtitle);
    if (!achievement) throw new Error('Achievement not found');
    return AchievementDTO.fromEntity(achievement);
  }

  async getachievementBySearch(query) {
    if (!query) return [];
    const achievements = await this.achievementRepository.getachievementBySearch(query);
    return achievements.map(AchievementDTO.fromEntity);
  }

  async getAchievementsByPointsRequired(achpointsreq) {
    const achievements = await this.achievementRepository.getAchievementsByPointsRequired(achpointsreq);
    return achievements.map(AchievementDTO.fromEntity);
  }

  async createAchievement(achievementData) {
    if (!achievementData || !achievementData.achtitle || !achievementData.achdesc || !achievementData.achpointsreq) {
      throw new Error('Missing achievement data');
    }

    const exists = await this.achievementRepository.existsAchievementByTitle(achievementData.achtitle);
    if (exists) throw new Error('Achievement title already exists');

    const achievement = await this.achievementRepository.createAchievement(achievementData);

    const users = await this.userRepository.getAllUsers();
    const clubs = await this.clubRepository.getAllClubs();

    await Promise.all([
      ...users.map(user =>
        this.notificationRepository.createNotification(
          NotificationFactory.forAchievementCreated(user.userid, achievement)
        )
      ),
      ...clubs.map(club =>
        this.notificationRepository.createNotification(
          NotificationFactory.forAchievementCreated(club.clubid, achievement)
        )
      )
    ]);

    return AchievementDTO.fromEntity(achievement);
  }

  async updateAchievement(achid, updateData) {
    if (!updateData) throw new Error('No update data provided');

    const achievement = await this.achievementRepository.getAchievementById(achid);
    if (!achievement) throw new Error('Achievement not found');

    const finalData = {
      achtitle: updateData.achtitle?.trim() || achievement.achtitle,
      achdesc: updateData.achdesc || achievement.achdesc,
      achpointsreq: updateData.achpointsreq ?? achievement.achpointsreq,
      achbadge: updateData.achbadge || achievement.achbadge
    };

    const updated = await this.achievementRepository.updateAchievement(achid, finalData);

    const users = await this.userRepository.getAllUsers();
    const clubs = await this.clubRepository.getAllClubs();

    await Promise.all([
      ...users.map(user =>
        this.notificationRepository.createNotification(
          NotificationFactory.forAchievementUpdated(user.userid, updated)
        )
      ),
      ...clubs.map(club =>
        this.notificationRepository.createNotification(
          NotificationFactory.forAchievementUpdated(club.clubid, updated)
        )
      )
    ]);

    return AchievementDTO.fromEntity(updated);
  }

  async updateAchievementPoints(achid, achpointsreq) {
    const achievement = await this.achievementRepository.getAchievementById(achid);
    if (!achievement) throw new Error('Achievement not found');

    const updated = await this.achievementRepository.updateAchievementPoints(achid, achpointsreq);

    const users = await this.userRepository.getAllUsers();
    const clubs = await this.clubRepository.getAllClubs();

    await Promise.all([
      ...users.map(user =>
        this.notificationRepository.createNotification(
          NotificationFactory.forAchievementUpdated(user.userid, updated)
        )
      ),
      ...clubs.map(club =>
        this.notificationRepository.createNotification(
          NotificationFactory.forAchievementUpdated(club.clubid, updated)
        )
      )
    ]);

    return AchievementDTO.fromEntity(updated);
  }

  async deleteAchievement(achid) {
    const achievement = await this.achievementRepository.getAchievementById(achid);
    if (!achievement) throw new Error('Achievement not found');

    const users = await this.userRepository.getAllUsers();
    const clubs = await this.clubRepository.getAllClubs();

    await Promise.all([
      ...users.map(user =>
        this.notificationRepository.createNotification(
          NotificationFactory.forAchievementDeleted(user.userid, achievement)
        )
      ),
      ...clubs.map(club =>
        this.notificationRepository.createNotification(
          NotificationFactory.forAchievementDeleted(club.clubid, achievement)
        )
      )
    ]);

    return await this.achievementRepository.deleteAchievement(achid);
  }

  async countAchievements() {
    const count = await this.achievementRepository.countAchievements();
    return typeof count === 'number' ? count : 0;
  }

  async countAchievementsByPointsRequired(achpointsreq) {
    const count = await this.achievementRepository.countAchievementsByPointsRequired(achpointsreq);
    return typeof count === 'number' ? count : 0;
  }

  async existsAchievementByTitle(achtitle) {
    return await this.achievementRepository.existsAchievementByTitle(achtitle);
  }
}