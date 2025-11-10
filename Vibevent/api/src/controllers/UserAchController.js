export class UserAchController {
  constructor(userAchService) {
    this.userAchService = userAchService;
  }

  getAllUserAchs = async (req, res, next) => {
    try {
      const userAchs = await this.userAchService.getAllUserAchs();
      res.status(200).json(userAchs);
    } catch (err) {
      next(err);
    }
  };

  getUserAchById = async (req, res, next) => {
    try {
      const userAch = await this.userAchService.getUserAchById(req.params.uaid);
      res.status(200).json(userAch);
    } catch (err) {
      next(err);
    }
  };

  getUserAchsByUserId = async (req, res, next) => {
    try {
      const userAchs = await this.userAchService.getUserAchsByUserId(req.params.userid);
      res.status(200).json(userAchs);
    } catch (err) {
      next(err);
    }
  };

  getUserAchsByAchId = async (req, res, next) => {
    try {
      const userAchs = await this.userAchService.getUserAchsByAchId(req.params.achid);
      res.status(200).json(userAchs);
    } catch (err) {
      next(err);
    }
  };

  getUserAchByUserAndAchId = async (req, res, next) => {
    try {
      const { userid, achid } = req.body;
      const userAch = await this.userAchService.getUserAchByUserAndAchId(userid, achid);
      res.status(200).json(userAch);
    } catch (err) {
      next(err);
    }
  };

  createUserAch = async (req, res, next) => {
    try {
      const userAch = await this.userAchService.createUserAch(req.body);
      res.status(201).json(userAch);
    } catch (err) {
      next(err);
    }
  };

  deleteUserAch = async (req, res, next) => {
    try {
      const result = await this.userAchService.deleteUserAch(req.params.uaid);
      res.status(200).json({ success: result });
    } catch (err) {
      next(err);
    }
  };

  deleteUserAchsByUserId = async (req, res, next) => {
    try {
      const result = await this.userAchService.deleteUserAchsByUserId(req.params.userid);
      res.status(200).json({ success: result });
    } catch (err) {
      next(err);
    }
  };

  deleteUserAchsByAchId = async (req, res, next) => {
    try {
      const result = await this.userAchService.deleteUserAchsByAchId(req.params.achid);
      res.status(200).json({ success: result });
    } catch (err) {
      next(err);
    }
  };

  countUserAchs = async (req, res, next) => {
    try {
      const count = await this.userAchService.countUserAchs();
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  countUserAchsByUserId = async (req, res, next) => {
    try {
      const count = await this.userAchService.countUserAchsByUserId(req.params.userid);
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  countUserAchsByAchId = async (req, res, next) => {
    try {
      const count = await this.userAchService.countUserAchsByAchId(req.params.achid);
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  existsUserAchByUserAndAchId = async (req, res, next) => {
    try {
      const { userid, achid } = req.body;
      const exists = await this.userAchService.existsUserAchByUserAndAchId(userid, achid);
      res.status(200).json({ exists });
    } catch (err) {
      next(err);
    }
  };
}