export class EventController {
  constructor(eventService) {
    this.eventService = eventService;
  }

  getAllEvents = async (req, res, next) => {
    try {
      const events = await this.eventService.getAllEvents();
      res.status(200).json(events);
    } catch (err) {
      next(err);
    }
  };

  getEventById = async (req, res, next) => {
    try {
      const event = await this.eventService.getEventById(req.params.eventid);
      res.status(200).json(event);
    } catch (err) {
      next(err);
    }
  };

  getEventsByClubId = async (req, res, next) => {
    try {
      const events = await this.eventService.getEventsByClubId(req.params.clubid);
      res.status(200).json(events);
    } catch (err) {
      next(err);
    }
  };

  getUpcomingEvents = async (req, res, next) => {
    try {
      const events = await this.eventService.getUpcomingEvents();
      res.status(200).json(events);
    } catch (err) {
      next(err);
    }
  };

  getPastEvents = async (req, res, next) => {
    try {
      const events = await this.eventService.getPastEvents();
      res.status(200).json(events);
    } catch (err) {
      next(err);
    }
  };

  getUpcomingEventsByClubId = async (req, res, next) => {
    try {
      const events = await this.eventService.getUpcomingEventsByClubId(req.params.clubid);
      res.status(200).json(events);
    } catch (err) {
      next(err);
    }
  };

  getPastEventsByClubId = async (req, res, next) => {
    try {
      const events = await this.eventService.getPastEventsByClubId(req.params.clubid);
      res.status(200).json(events);
    } catch (err) {
      next(err);
    }
  };

  getEventsByLocation = async (req, res, next) => {
    try {
      const events = await this.eventService.getEventsByLocation(req.body.eventlocation);
      res.status(200).json(events);
    } catch (err) {
      next(err);
    }
  };

  getEventsByLocationSearch = async (req, res, next) => {
    try {
      const events = await this.eventService.getEventsByLocationSearch(req.body.eventlocation);
      res.status(200).json(events);
    } catch (err) {
      next(err);
    }
  };

  getEventsBySearch = async (req, res, next) => {
    try {
      const events = await this.eventService.getEventsBySearch(req.body.query);
      res.status(200).json(events);
    } catch (err) {
      next(err);
    }
  };

  createEvent = async (req, res, next) => {
    try {
      const event = await this.eventService.createEvent(req.body);
      res.status(201).json(event);
    } catch (err) {
      next(err);
    }
  };

  updateEvent = async (req, res, next) => {
    try {
      const event = await this.eventService.updateEvent(req.params.eventid, req.body);
      res.status(200).json(event);
    } catch (err) {
      next(err);
    }
  };

  updateEventDate = async (req, res, next) => {
    try {
      const event = await this.eventService.updateEventDate(req.params.eventid, req.body.eventdate);
      res.status(200).json(event);
    } catch (err) {
      next(err);
    }
  };

  deleteEvent = async (req, res, next) => {
    try {
      const result = await this.eventService.deleteEvent(req.params.eventid);
      res.status(200).json({ success: result });
    } catch (err) {
      next(err);
    }
  };

  countEvents = async (req, res, next) => {
    try {
      const count = await this.eventService.countEvents();
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  countEventsByClubId = async (req, res, next) => {
    try {
      const count = await this.eventService.countEventsByClubId(req.params.clubid);
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  countUpcomingEvents = async (req, res, next) => {
    try {
      const count = await this.eventService.countUpcomingEvents();
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  countPastEvents = async (req, res, next) => {
    try {
      const count = await this.eventService.countPastEvents();
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  countUpcomingEventsByClubId = async (req, res, next) => {
    try {
      const count = await this.eventService.countUpcomingEventsByClubId(req.params.clubid);
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  countPastEventsByClubId = async (req, res, next) => {
    try {
      const count = await this.eventService.countPastEventsByClubId(req.params.clubid);
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  countEventsByLocation = async (req, res, next) => {
    try {
      const count = await this.eventService.countEventsByLocation(req.body.eventlocation);
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  existsEventByTitleAndDate = async (req, res, next) => {
    try {
      const { eventtitle, eventdate } = req.body;
      const exists = await this.eventService.existsEventByTitleAndDate(eventtitle, eventdate);
      res.status(200).json({ exists });
    } catch (err) {
      next(err);
    }
  };
}