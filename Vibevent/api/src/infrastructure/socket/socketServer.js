import { Server } from 'socket.io';

let socketServer = null;

export function initSocketServer(httpServer) {
  socketServer = new Server(httpServer, {
    cors: { origin: '*', methods: ['GET', 'POST'] }
  });

  socketServer.on('connection', (socket) => {
    const { userid, clubid } = socket.handshake.query;
    if (userid) socket.join(userid);
    if (clubid) socket.join(clubid);
  });
}

export { socketServer };