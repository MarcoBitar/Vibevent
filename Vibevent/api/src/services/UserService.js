import { UserDTO } from '../domain/dto/UserDTO.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NotificationFactory } from '../domain/factory/NotificationFactory.js';

export class UserService {
    constructor(userRepository, eventRepository, attendanceRepository, notificationRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.attendanceRepository = attendanceRepository;
        this.notificationRepository = notificationRepository;
    }

    async getAllUsers() {
        const users = await this.userRepository.getAllUsers();
        return users.map(UserDTO.fromEntity);
    }

    async getUserById(userid) {
        const user = await this.userRepository.getUserById(userid);
        if (!user) throw new Error('User not found');
        return UserDTO.fromEntity(user);
    }

    async getUserByEmail(useremail) {
        const user = await this.userRepository.getUserByEmail(useremail);
        if (!user) throw new Error('User not found');
        return UserDTO.fromEntity(user);
    }

    async getUserByUsername(username) {
        const user = await this.userRepository.getUserByUsername(username);
        if (!user) throw new Error('User not found');
        return UserDTO.fromEntity(user);
    }

    async getUserBySearch(query) {
        if (!query) return [];
        const users = await this.userRepository.getUserBySearch(query);
        return users.map(UserDTO.fromEntity);
    }

    async createUser(userData) {
        if (!userData || !userData.username || !userData.useremail || !userData.userpass) throw new Error('Missing registration data');
        const [usernameTaken, emailTaken] = await Promise.all([
            this.userRepository.existsUserByUsername(userData.username),
            this.userRepository.existsUserByEmail(userData.useremail)
        ]);
        if (usernameTaken || emailTaken) throw new Error('Username or Email already taken');
        const password_hash = await bcrypt.hash(userData.userpass, 10);
        const user = await this.userRepository.createUser({ ...userData, userpass: password_hash });
        return UserDTO.fromEntity(user);
    }

    async updateUser(userid, updateData) {
        if (!updateData) throw new Error('No update data provided');
        const user = await this.userRepository.getUserById(userid);
        if (!user) throw new Error('User not found');
        const finalData = {
            username: updateData.username?.trim() || user.username,
            useremail: updateData.useremail?.trim() || user.useremail,
            userpass: updateData.userpass ? await bcrypt.hash(updateData.userpass, 10) : user.userpass,
            userpoints: updateData.userpoints ?? user.userpoints,
            userpic: updateData.userpic || user.userpic
        };
        const updated = await this.userRepository.updateUser(userid, finalData);
        return UserDTO.fromEntity(updated);
    }

    async updateUserPoints(userid, delta) {
        if (typeof delta !== 'number') throw new Error('Invalid delta value');
        const user = await this.userRepository.updateUserPoints(userid, delta);
        if (!user) throw new Error('User not found');
        return UserDTO.fromEntity(user);
    }

    async deleteUser(userid) {
        const user = await this.userRepository.getUserById(userid);
        if (!user) throw new Error('User not found');
        return await this.userRepository.deleteUser(userid);
    }

    async countUsers() {
        const count = await this.userRepository.countUsers();
        return typeof count === 'number' ? count : 0;
    }

    async getTopUsers(limit) {
        const users = await this.userRepository.getTopUsers(limit);
        return users.map(UserDTO.fromEntity);
    }

    async getRank(userid) {
        const rank = await this.userRepository.getRank(userid);
        if (rank === null || rank === undefined) throw new Error('Rank not found');
        return rank;
    }

    async existsUserByUsername(username) {
        return await this.userRepository.existsUserByUsername(username);
    }

    async existsUserByEmail(useremail) {
        return await this.userRepository.existsUserByEmail(useremail);
    }

    async getUserByIdentifier(identifier) {
        const user = await this.userRepository.getUserByEmail(identifier) || await this.userRepository.getUserByUsername(identifier);
        if (!user) throw new Error('User not found');
        return UserDTO.fromEntity(user);
    }

    async authenticateUser(useremail, userpass) {
        if (!useremail || !userpass) throw new Error('Missing login credentials');
        const user = await this.userRepository.getUserByEmail(useremail);
        if (!user) throw new Error('User not found');
        const isValid = await bcrypt.compare(userpass, user.userpass);
        if (!isValid) throw new Error('Invalid password');
        const token = jwt.sign({ userid: user.userid }, process.env.JWT_SECRET, { expiresIn: '6h' });
        return { token, user: UserDTO.fromEntity(user) };
    }

    async awardPointsForEventAttendance(eventid) {
        const event = await this.eventRepository.getEventById(eventid);
        if (!event) throw new Error('Event not found');
        const now = new Date();
        const eventStart = new Date(event.eventdate);
        const graceWindow = new Date(eventStart.getTime() + 30 * 60 * 1000);
        if (graceWindow > now) throw new Error('Event is still within the 30-minute grace window');
        const userids = await this.attendanceRepository.getAttendeesByStatusAndEventId('yes', eventid);
        await Promise.all(userids.map(async userid => {
            await this.userRepository.updateUserPoints(userid, 1);
            const notif = NotificationFactory.forUserPointsAwarded(userid, event.eventtitle);
            await this.notificationRepository.createNotification(notif);
        }));
        return { eventid, usersAwarded: userids.length };
    }
}
