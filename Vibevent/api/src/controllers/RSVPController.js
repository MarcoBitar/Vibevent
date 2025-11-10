export class RSVPController {
  constructor(rsvpService) {
    this.rsvpService = rsvpService;
  }

  getAllRSVPs = async (req, res, next) => {
    try {
      const rsvps = await this.rsvpService.getAllRSVPs();
      res.status(200).json(rsvps);
    } catch (err) {
      next(err);
    }
  };

  getRSVPById = async (req, res, next) => {
    try {
      const rsvp = await this.rsvpService.getRSVPById(req.params.rsvpid);
      res.status(200).json(rsvp);
    } catch (err) {
      next(err);
    }
  };

  getRSVPsByEventId = async (req, res, next) => {
    try {
      const rsvps = await this.rsvpService.getRSVPsByEventId(req.params.eventid);
      res.status(200).json(rsvps);
    } catch (err) {
      next(err);
    }
  };

  getRSVPsByUserId = async (req, res, next) => {
    try {
      const rsvps = await this.rsvpService.getRSVPsByUserId(req.params.userid);
      res.status(200).json(rsvps);
    } catch (err) {
      next(err);
    }
  };

  getRSVPByEventAndUser = async (req, res, next) => {
    try {
      const { eventid, userid } = req.body;
      const rsvp = await this.rsvpService.getRSVPByEventAndUser(eventid, userid);
      res.status(200).json(rsvp);
    } catch (err) {
      next(err);
    }
  };

  getRSVPsByStatusandEventId = async (req, res, next) => {
    try {
      const { rsvpstatus, eventid } = req.body;
      const rsvps = await this.rsvpService.getRSVPsByStatusandEventId(rsvpstatus, eventid);
      res.status(200).json(rsvps);
    } catch (err) {
      next(err);
    }
  };

  getUserByRSVPStatusandEventId = async (req, res, next) => {
    try {
      const { rsvpstatus, eventid } = req.body;
      const users = await this.rsvpService.getUserByRSVPStatusandEventId(rsvpstatus, eventid);
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };

  createRSVP = async (req, res, next) => {
    try {
      const rsvp = await this.rsvpService.createRSVP(req.body);
      res.status(201).json(rsvp);
    } catch (err) {
      next(err);
    }
  };

  updateRSVPStatus = async (req, res, next) => {
    try {
      const rsvp = await this.rsvpService.updateRSVPStatus(req.params.rsvpid, req.body.rsvpstatus);
      res.status(200).json(rsvp);
    } catch (err) {
      next(err);
    }
  };

  deleteRSVP = async (req, res, next) => {
    try {
      const result = await this.rsvpService.deleteRSVP(req.params.rsvpid);
      res.status(200).json({ success: result });
    } catch (err) {
      next(err);
    }
  };

  deleteRSVPByEventId = async (req, res, next) => {
    try {
      const result = await this.rsvpService.deleteRSVPByEventId(req.params.eventid);
      res.status(200).json({ success: result });
    } catch (err) {
      next(err);
    }
  };

  deleteRSVPByUserId = async (req, res, next) => {
    try {
      const result = await this.rsvpService.deleteRSVPByUserId(req.params.userid);
      res.status(200).json({ success: result });
    } catch (err) {
      next(err);
    }
  };

  countRSVPsByEventId = async (req, res, next) => {
    try {
      const count = await this.rsvpService.countRSVPsByEventId(req.params.eventid);
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  countRSVPsByStatusandUserId = async (req, res, next) => {
    try {
      const { userid, rsvpstatus } = req.body;
      const count = await this.rsvpService.countRSVPsByStatusandUserId(userid, rsvpstatus);
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  countRSVPsByStatusandEventId = async (req, res, next) => {
    try {
      const { eventid, rsvpstatus } = req.body;
      const count = await this.rsvpService.countRSVPsByStatusandEventId(eventid, rsvpstatus);
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  existsRSVPByEventandUserId = async (req, res, next) => {
    try {
      const { eventid, userid } = req.body;
      const exists = await this.rsvpService.existsRSVPByEventandUserId(eventid, userid);
      res.status(200).json({ exists });
    } catch (err) {
      next(err);
    }
  };
}