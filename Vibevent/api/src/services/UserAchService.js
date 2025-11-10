import { UserAchDTO } from '../domain/dto/UserAchDTO.js';
import { NotificationFactory } from '../domain/factory/NotificationFactory.js'

export class UserAchService {
  constructor(userAchRepository, achievementRepository, notificationRepository) {
    this.userAchRepository = userAchRepository;
    this.achievementRepository = achievementRepository;
    this.notificationRepository = notificationRepository;
  }

  async getAllUserAchs() {
    const userAchs = await this.userAchRepository.getAllUserAchs();
    return userAchs.map(UserAchDTO.fromEntity);
  }

  async getUserAchById(uaid) {
    const userAch = await this.userAchRepository.getUserAchById(uaid);
    if (!userAch) throw new Error('User achievement not found');
    return UserAchDTO.fromEntity(userAch);
  }

  async getUserAchsByUserId(userid) {
    const userAchs = await this.userAchRepository.getUserAchsByUserId(userid);
    return userAchs.map(UserAchDTO.fromEntity);
  }

  async getUserAchsByAchId(achid) {
    const userAchs = await this.userAchRepository.getUserAchsByAchId(achid);
    return userAchs.map(UserAchDTO.fromEntity);
  }

  async getUserAchByUserAndAchId(userid, achid) {
    const userAch = await this.userAchRepository.getUserAchByUserAndAchId(userid, achid);
    if (!userAch) throw new Error('User achievement not found');
    return UserAchDTO.fromEntity(userAch);
  }

  async createUserAch(userAchData) {
    if (!userAchData || !userAchData.userid || !userAchData.achid)
      throw new Error('Missing user achievement data');

    const exists = await this.userAchRepository.existsUserAchByUserAndAchId(userAchData.userid, userAchData.achid);
    if (exists) throw new Error('User already has this achievement');

    const userAch = await this.userAchRepository.createUserAch(userAchData);
    const achievement = await this.achievementRepository.getAchievementById(userAchData.achid);

    await Promise.all([
      this.notificationRepository.createNotification(
        NotificationFactory.forUserAchEarned(userAchData.userid, achievement)
      )
    ]);

    return UserAchDTO.fromEntity(userAch);
  }

  async deleteUserAchsByUserId(userid) {
    const userAchs = await this.userAchRepository.getUserAchsByUserId(userid);
    if (userAchs.length === 0) throw new Error('No achievements found for this user');
    return await this.userAchRepository.deleteUserAchsByUserId(userid);
  }

  async deleteUserAchsByAchId(achid) {
    const userAchs = await this.userAchRepository.getUserAchsByAchId(achid);
    if (userAchs.length === 0) throw new Error('No users found with this achievement');
    return await this.userAchRepository.deleteUserAchsByAchId(achid);
  }

  async countUserAchs() {
    const count = await this.userAchRepository.countUserAchs();
    return typeof count === 'number' ? count : 0;
  }

  async countUserAchsByUserId(userid) {
    const count = await this.userAchRepository.countUserAchsByUserId(userid);
    return typeof count === 'number' ? count : 0;
  }

  async countUserAchsByAchId(achid) {
    const count = await this.userAchRepository.countUserAchsByAchId(achid);
    return typeof count === 'number' ? count : 0;
  }

  async existsUserAchByUserAndAchId(userid, achid) {
    return await this.userAchRepository.existsUserAchByUserAndAchId(userid, achid);
  }
}