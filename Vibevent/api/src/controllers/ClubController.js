export class ClubController {
  constructor(clubService) {
    this.clubService = clubService;
  }

  getAllClubs = async (req, res, next) => {
    try {
      const clubs = await this.clubService.getAllClubs();
      res.status(200).json(clubs);
    } catch (err) {
      next(err);
    }
  };

  getClubById = async (req, res, next) => {
    try {
      const club = await this.clubService.getClubById(req.params.clubid);
      res.status(200).json(club);
    } catch (err) {
      next(err);
    }
  };

  getClubByName = async (req, res, next) => {
    try {
      const club = await this.clubService.getClubByName(req.body.clubname);
      res.status(200).json(club);
    } catch (err) {
      next(err);
    }
  };

  getClubByEmail = async (req, res, next) => {
    try {
      const club = await this.clubService.getClubByEmail(req.body.clubemail);
      res.status(200).json(club);
    } catch (err) {
      next(err);
    }
  };

  getClubBySearch = async (req, res, next) => {
    try {
      const clubs = await this.clubService.getClubBySearch(req.body.q);
      res.status(200).json(clubs);
    } catch (err) {
      next(err);
    }
  };

  createClub = async (req, res, next) => {
    try {
      const club = await this.clubService.createClub(req.body);
      res.status(201).json(club);
    } catch (err) {
      next(err);
    }
  };

  updateClub = async (req, res, next) => {
    try {
      const club = await this.clubService.updateClub(req.params.clubid, req.body);
      res.status(200).json(club);
    } catch (err) {
      next(err);
    }
  };

  updateClubPoints = async (req, res, next) => {
    try {
      const club = await this.clubService.updateClubPoints(req.params.clubid, req.body.delta);
      res.status(200).json(club);
    } catch (err) {
      next(err);
    }
  };

  deleteClub = async (req, res, next) => {
    try {
      const result = await this.clubService.deleteClub(req.params.clubid);
      res.status(200).json({ success: result });
    } catch (err) {
      next(err);
    }
  };

  countClubs = async (req, res, next) => {
    try {
      const count = await this.clubService.countClubs();
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  getTopClubs = async (req, res, next) => {
    try {
      const clubs = await this.clubService.getTopClubs(req.body.limit);
      res.status(200).json(clubs);
    } catch (err) {
      next(err);
    }
  };

  getRank = async (req, res, next) => {
    try {
      const rank = await this.clubService.getRank(req.params.clubid);
      res.status(200).json({ rank });
    } catch (err) {
      next(err);
    }
  };

  existsClubByName = async (req, res, next) => {
    try {
      const exists = await this.clubService.existsClubByName(req.body.clubname);
      res.status(200).json({ exists });
    } catch (err) {
      next(err);
    }
  };

  existsClubByEmail = async (req, res, next) => {
    try {
      const exists = await this.clubService.existsClubByEmail(req.body.clubemail);
      res.status(200).json({ exists });
    } catch (err) {
      next(err);
    }
  };

  authenticateClub = async (req, res, next) => {
    try {
      const { clubemail, clubpass } = req.body;
      const result = await this.clubService.authenticateClub(clubemail, clubpass);
      res.status(200).json(result);
    } catch (err) {
      console.error('Login error:', err.message);
      res.status(401).json({ message: err.message });
    }
  };

  awardPointsForEvent = async (req, res, next) => {
    try {
      const { eventid } = req.params;
      const result = await this.clubService.awardPointsForEvent(eventid);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}