import { socketServer } from '../../infrastructure/socket/socketServer.js';

export class NotificationFactory {
    static pushToSocket(targetid, notif) {
        if (socketServer && socketServer.to) {
            socketServer.to(String(targetid)).emit('notification', notif);
        }
    }

    static broadcastExcept(excludedSocketId, notif) {
        if (socketServer && socketServer.sockets) {
            socketServer.sockets.sockets.forEach((socket) => {
                if (socket.id !== excludedSocketId) {
                    socket.emit('notification', notif);
                }
            });
        }
    }

    static forEventCreated(excludedSocketId, event, club) {
        const notif = {
            notiftype: 'event-created',
            notifcontent: `${club.clubname} Club posted a new event: ${event.eventtitle}`,
            notifstatus: 'unread'
        };
        NotificationFactory.broadcastExcept(excludedSocketId, notif);
        return notif;
    }

    static forEventUpdated(excludedSocketId, event, club) {
        const notif = {
            notiftype: 'event-updated',
            notifcontent: `${club.clubname} Club updated the event: ${event.eventtitle}`,
            notifstatus: 'unread'
        };
        NotificationFactory.broadcastExcept(excludedSocketId, notif);
        return notif;
    }

    static forEventDeleted(excludedSocketId, event, club) {
        const notif = {
            notiftype: 'event-deleted',
            notifcontent: `${club.clubname} Club deleted the event: ${event.eventtitle}`,
            notifstatus: 'unread'
        };
        NotificationFactory.broadcastExcept(excludedSocketId, notif);
        return notif;
    }

    static forAchievementCreated(userid, achievement) {
        const notif = {
            userid,
            notiftype: 'achievement-created',
            notifcontent: `New achievement available: ${achievement.achtitle}`,
            notifstatus: 'unread'
        };
        NotificationFactory.pushToSocket(userid, notif);
        return notif;
    }

    static forAchievementUpdated(userid, achievement) {
        const notif = {
            userid,
            notiftype: 'achievement-updated',
            notifcontent: `Achievement updated: ${achievement.achtitle}`,
            notifstatus: 'unread'
        };
        NotificationFactory.pushToSocket(userid, notif);
        return notif;
    }

    static forAchievementDeleted(userid, achievement) {
        const notif = {
            userid,
            notiftype: 'achievement-deleted',
            notifcontent: `Achievement removed: ${achievement.achtitle}`,
            notifstatus: 'unread'
        };
        NotificationFactory.pushToSocket(userid, notif);
        return notif;
    }

    static forUserAchEarned(userid, achievement) {
        const notif = {
            userid,
            notiftype: 'user-ach-earned',
            notifcontent: `You earned the achievement: ${achievement.achtitle}`,
            notifstatus: 'unread'
        };
        NotificationFactory.pushToSocket(userid, notif);
        return notif;
    }

    static forClubAchEarned(clubid, achievement) {
        const notif = {
            userid: clubid,
            notiftype: 'club-ach-earned',
            notifcontent: `Your club earned the achievement: ${achievement.achtitle}`,
            notifstatus: 'unread'
        };
        NotificationFactory.pushToSocket(clubid, notif);
        return notif;
    }

    static forRSVPStatusChanged(clubid, user, event, rsvpstatus) {
        let verb = '';
        switch (rsvpstatus.toLowerCase()) {
            case 'yes':
                verb = 'confirmed attendance';
                break;
            case 'maybe':
                verb = 'might attend';
                break;
            case 'no':
                verb = 'declined the invitation';
                break;
            default:
                verb = `updated RSVP to "${rsvpstatus}"`;
        }

        const notif = {
            userid: clubid,
            notiftype: 'rsvp-status-changed',
            notifcontent: `${user.username} ${verb} for your event: ${event.eventtitle}`,
            notifstatus: 'unread'
        };
        NotificationFactory.pushToSocket(clubid, notif);
        return notif;
    }

    static forClubPointsAwarded(clubid, eventtitle, points) {
        const notif = {
            userid: clubid,
            notiftype: 'club-points-awarded',
            notifcontent: `Your club has been awarded ${points} point${points !== 1 ? 's' : ''} for hosting ${eventtitle}!`,
            notifstatus: 'unread'
        };
        NotificationFactory.pushToSocket(clubid, notif);
        return notif;
    }

    static forUserPointsAwarded(userid, eventtitle) {
        const notif = {
            userid,
            notiftype: 'user-points-awarded',
            notifcontent: `You earned 1 point for attending ${eventtitle}!`,
            notifstatus: 'unread'
        };
        NotificationFactory.pushToSocket(userid, notif);
        return notif;
    }

    static forAttendanceMarked(user, event, attendstatus) {
        const statusText = attendstatus.toLowerCase() === 'yes' ? 'attended' : 'did not attend';

        const notif = {
            userid: event.clubid,
            notiftype: 'attendance-marked',
            notifcontent: `${user.username} ${statusText} your event: ${event.eventtitle}`,
            notifstatus: 'unread'
        };

        NotificationFactory.pushToSocket(event.clubid, notif);
        return notif;
    }

    static forUserAttendanceUpdated(user, event, attendstatus) {
        const statusText = attendstatus.toLowerCase() === 'yes' ? 'marked as present' : 'marked as absent';

        const notif = {
            userid: user.userid,
            notiftype: 'attendance-updated',
            notifcontent: `Your attendance for ${event.eventtitle} was ${statusText}`,
            notifstatus: 'unread'
        };

        NotificationFactory.pushToSocket(user.userid, notif);
        return notif;
    }

}
