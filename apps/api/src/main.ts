import * as express from 'express';
import * as http from 'http';
import * as mongoose from "mongoose";
import {Server} from "socket.io";
import {userRouter} from "@seba/controllers";
import * as passport from "passport";
import {initializePassport} from "@seba/auth";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as fileUpload from "express-fileupload";
import {lectureRouter} from "../../../libs/controllers/src/lib/lecture-controller";
import {lectureUnitRouter} from "../../../libs/controllers/src/lib/lecture-unit-controller";
import { questionRouter } from '../../../libs/controllers/src/lib/question-controller';

const app = express();
const server = http.createServer(app);
const io = new Server(server,{cors:{}});

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({type: ["application/json", "text/plain"]}));

app.use(fileUpload({createParentPath: true}));

app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport);
app.use("/user", userRouter);
app.use("/lecture", lectureRouter);
app.use("/lecture-unit", lectureUnitRouter);
app.use("/question", questionRouter);

const port = process.env.port || 3333;
server.listen(port, async () => {
  console.log('Listening at http://localhost:' + port + '/api');

  const url = "mongodb://localhost:27017/learn-with-me";
  mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to database"))
    .catch(console.error.bind(console, "Connection error:"))
  });

server.on('error', console.error);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.send('Connected');
  
  // on new chat message broadcast it to other users
  socket.on('chatMessage', (data) => { 
    const message = { text: data, id: new Date().getTime().toString(), userid: socket.id }; //extract the username here
    io.emit('chatMessage', message);
  });
});
