import { StudyGroup } from '@seba/backend/models';
import { Server } from 'socket.io';

export const handleSocket = (io: Server) => {
  io.on('connection', (socket) => {
    socket.on('groupConnect', async (group_id, callback) => {
      try {
        const group = await StudyGroup.findById(group_id);

        if (group) {
          socket.join(group_id);
          callback(group);
        } else {
          callback(null);
        }
      } catch (err) {
        callback(null);
      }
    });

    socket.on('message', async (data) => {
      const newMessage = {
        author: data.author,
        message: data.message,
      };
      const group = await StudyGroup.findByIdAndUpdate(
        data.group_id,
        { $push: { chat: { $each: [newMessage], $sort: { timestamp: -1 } } } },
        { new: true }
      );
      io.to(data.group_id).emit('message', group.chat[0]);
    });

    socket.on('sync', (data) => {
      console.log(data);
      io.to(data.group_id).emit('sync', {
        syncEvent: data.syncEvent,
        currentTime: data.currentTime,
      });
    });

    socket.on('update', (data) => {
      console.log(data);
      io.to(data.group_id).emit('update', {
        privateStatus: data.privateStatus,
      });
    });
  });
};
