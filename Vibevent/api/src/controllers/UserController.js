export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getAllUsers = async (req, res, next) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };

  getUserById = async (req, res, next) => {
    try {
      const user = await this.userService.getUserById(req.params.userid);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  getUserByEmail = async (req, res, next) => {
    try {
      const user = await this.userService.getUserByEmail(req.body.useremail);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  getUserByUsername = async (req, res, next) => {
    try {
      const user = await this.userService.getUserByUsername(req.body.username);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  getUserBySearch = async (req, res, next) => {
    try {
      const users = await this.userService.getUserBySearch(req.body.search);
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };

  createUser = async (req, res, next) => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const user = await this.userService.updateUser(req.params.userid, req.body);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  updateUserPoints = async (req, res, next) => {
    try {
      const user = await this.userService.updateUserPoints(req.params.userid, req.body.delta);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const result = await this.userService.deleteUser(req.params.userid);
      res.status(200).json({ success: result });
    } catch (err) {
      next(err);
    }
  };

  countUsers = async (req, res, next) => {
    try {
      const count = await this.userService.countUsers();
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  getTopUsers = async (req, res, next) => {
    try {
      const users = await this.userService.getTopUsers(req.body.limit);
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };

  getRank = async (req, res, next) => {
    try {
      const rank = await this.userService.getRank(req.params.userid);
      res.status(200).json({ rank });
    } catch (err) {
      next(err);
    }
  };

  existsUserByUsername = async (req, res, next) => {
    try {
      const exists = await this.userService.existsUserByUsername(req.body.username);
      res.status(200).json({ exists });
    } catch (err) {
      next(err);
    }
  };

  existsUserByEmail = async (req, res, next) => {
    try {
      const exists = await this.userService.existsUserByEmail(req.body.useremail);
      res.status(200).json({ exists });
    } catch (err) {
      next(err);
    }
  };

  getUserByIdentifier = async (req, res, next) => {
    try {
      const user = await this.userService.getUserByIdentifier(req.body.identifier);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  authenticateUser = async (req, res, next) => {
    try {
      const { useremail, userpass } = req.body;
      const result = await this.userService.authenticateUser(useremail, userpass);
      res.status(200).json(result);
    } catch (err) {
      console.error('Login error:', err.message);
      res.status(401).json({ message: err.message });
    }
  };

  awardPointsForEventAttendance = async (req, res, next) => {
    try {
      const { eventid } = req.params;
      const result = await this.userService.awardPointsForEventAttendance(eventid);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}