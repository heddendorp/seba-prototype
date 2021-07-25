import * as express from 'express';
import * as http from 'http';
import * as mongoose from 'mongoose';
import { Server } from 'socket.io';
import {
  lectureRouter,
  lectureUnitRouter,
  questionRouter,
  quizRouter,
  studyGroupRouter,
  userRouter,
} from '@seba/backend/controllers';
import * as passport from 'passport';
import { initializePassport } from '@seba/backend/auth';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as fileUpload from 'express-fileupload';
import * as path from 'path';
import { statisticRouter } from '../../../libs/backend/controllers/src/lib/statistic-controller';
import { handleSocket } from './app/socketHandler';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: {} });
mongoose.set('useFindAndModify', false);

// Server config
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: ['application/json', 'text/plain'] }));
app.use(fileUpload({ createParentPath: true }));

// Authentication via Passport.js
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

// Controller routing
app.use('/user', userRouter);
app.use('/lecture', lectureRouter);
app.use('/lecture-unit', lectureUnitRouter);
app.use('/question', questionRouter);
app.use('/quiz', quizRouter);
app.use('/study-group', studyGroupRouter);
app.use('/statistic', statisticRouter);

// File streaming
app.use(express.static(path.join(__dirname, '/assets')));

// Start server
const port = process.env.port || 3333;
server.listen(port, async () => {
  console.log('Listening at http://localhost:' + port);

  // Connect to database
  const url = 'mongodb://localhost:27017/learn-with-me';
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch(console.error.bind(console, 'Connection error:'));
});

server.on('error', console.error);

// Setup and configure sockets for study groups
handleSocket(io);
