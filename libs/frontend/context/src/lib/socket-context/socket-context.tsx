import React from 'react';
import socketIo from 'socket.io-client';

const ENDPOINT = 'http://localhost:3333';

export const socket = socketIo(ENDPOINT);
export const SocketContext = React.createContext(undefined);
