export class AchievementController {
  constructor(achievementService) {
    this.achievementService = achievementService;
  }

  getAllAchievements = async (req, res, next) => {
    try {
      const achievements = await this.achievementService.getAllAchievements();
      res.status(200).json(achievements);
    } catch (err) {
      next(err);
    }
  };

  getAchievementById = async (req, res, next) => {
    try {
      const achievement = await this.achievementService.getAchievementById(req.params.achid);
      res.status(200).json(achievement);
    } catch (err) {
      next(err);
    }
  };

  getAchievementByTitle = async (req, res, next) => {
    try {
      const achievement = await this.achievementService.getAchievementByTitle(req.body.achtitle);
      res.status(200).json(achievement);
    } catch (err) {
      next(err);
    }
  };

  getachievementBySearch = async (req, res, next) => {
    try {
      const achievements = await this.achievementService.getachievementBySearch(req.body.search);
      res.status(200).json(achievements);
    } catch (err) {
      next(err);
    }
  };

  getAchievementsByPointsRequired = async (req, res, next) => {
    try {
      const achievements = await this.achievementService.getAchievementsByPointsRequired(req.body.achpointsreq);
      res.status(200).json(achievements);
    } catch (err) {
      next(err);
    }
  };

  createAchievement = async (req, res, next) => {
    try {
      const achievement = await this.achievementService.createAchievement(req.body);
      res.status(201).json(achievement);
    } catch (err) {
      next(err);
    }
  };

  updateAchievement = async (req, res, next) => {
    try {
      const achievement = await this.achievementService.updateAchievement(req.params.achid, req.body);
      res.status(200).json(achievement);
    } catch (err) {
      next(err);
    }
  };

  updateAchievementPoints = async (req, res, next) => {
    try {
      const achievement = await this.achievementService.updateAchievementPoints(req.params.achid, req.body.achpointsreq);
      res.status(200).json(achievement);
    } catch (err) {
      next(err);
    }
  };

  deleteAchievement = async (req, res, next) => {
    try {
      const result = await this.achievementService.deleteAchievement(req.params.achid);
      res.status(200).json({ success: result });
    } catch (err) {
      next(err);
    }
  };

  countAchievements = async (req, res, next) => {
    try {
      const count = await this.achievementService.countAchievements();
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  countAchievementsByPointsRequired = async (req, res, next) => {
    try {
      const count = await this.achievementService.countAchievementsByPointsRequired(req.body.achpointsreq);
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  existsAchievementByTitle = async (req, res, next) => {
    try {
      const exists = await this.achievementService.existsAchievementByTitle(req.body.achtitle);
      res.status(200).json({ exists });
    } catch (err) {
      next(err);
    }
  };
}