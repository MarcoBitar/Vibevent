export class ClubAchController {
  constructor(clubAchService) {
    this.clubAchService = clubAchService;
  }

  getAllClubAchs = async (req, res, next) => {
    try {
      const clubAchs = await this.clubAchService.getAllClubAchs();
      res.status(200).json(clubAchs);
    } catch (err) {
      next(err);
    }
  };

  getClubAchById = async (req, res, next) => {
    try {
      const clubAch = await this.clubAchService.getClubAchById(req.params.caid);
      res.status(200).json(clubAch);
    } catch (err) {
      next(err);
    }
  };

  getClubAchsByClubId = async (req, res, next) => {
    try {
      const clubAchs = await this.clubAchService.getClubAchsByClubId(req.params.clubid);
      res.status(200).json(clubAchs);
    } catch (err) {
      next(err);
    }
  };

  getClubAchsByAchId = async (req, res, next) => {
    try {
      const clubAchs = await this.clubAchService.getClubAchsByAchId(req.params.achid);
      res.status(200).json(clubAchs);
    } catch (err) {
      next(err);
    }
  };

  getClubAchByClubAndAchId = async (req, res, next) => {
    try {
      const { clubid, achid } = req.body;
      const clubAch = await this.clubAchService.getClubAchByClubAndAchId(clubid, achid);
      res.status(200).json(clubAch);
    } catch (err) {
      next(err);
    }
  };

  createClubAch = async (req, res, next) => {
    try {
      const clubAch = await this.clubAchService.createClubAch(req.body);
      res.status(201).json(clubAch);
    } catch (err) {
      next(err);
    }
  };

  deleteClubAch = async (req, res, next) => {
    try {
      const result = await this.clubAchService.deleteClubAch(req.params.caid);
      res.status(200).json({ success: result });
    } catch (err) {
      next(err);
    }
  };

  deleteClubAchsByClubId = async (req, res, next) => {
    try {
      const result = await this.clubAchService.deleteClubAchsByClubId(req.params.clubid);
      res.status(200).json({ success: result });
    } catch (err) {
      next(err);
    }
  };

  deleteClubAchsByAchId = async (req, res, next) => {
    try {
      const result = await this.clubAchService.deleteClubAchsByAchId(req.params.achid);
      res.status(200).json({ success: result });
    } catch (err) {
      next(err);
    }
  };

  countClubAchs = async (req, res, next) => {
    try {
      const count = await this.clubAchService.countClubAchs();
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  countClubAchsByClubId = async (req, res, next) => {
    try {
      const count = await this.clubAchService.countClubAchsByClubId(req.params.clubid);
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  countClubAchsByAchId = async (req, res, next) => {
    try {
      const count = await this.clubAchService.countClubAchsByAchId(req.params.achid);
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  existsClubAchByClubAndAchId = async (req, res, next) => {
    try {
      const { clubid, achid } = req.body;
      const exists = await this.clubAchService.existsClubAchByClubAndAchId(clubid, achid);
      res.status(200).json({ exists });
    } catch (err) {
      next(err);
    }
  };
}