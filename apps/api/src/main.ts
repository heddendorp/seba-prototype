import * as express from 'express';
import { Message } from '@seba/api-interfaces';
import * as mongoose from "mongoose";
import {Role} from "@seba/models";
import UserModel from 'libs/models/src/lib/user';
import {fill_default_model} from "./app/default-model";

const app = express();

const greeting: Message = { message: 'Welcome to api!' };

app.get('/api', (req, res) => {
  res.send(greeting);
});

const port = process.env.port || 3333;
const server = app.listen(port, async () => {
  console.log('Listening at http://localhost:' + port + '/api');

  const myUser = new UserModel({
    username: "August",
    role: Role.STUDENT
  });

  const url = "mongodb://localhost:27017/learn-with-me";
  mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to database"))
    .catch(console.error.bind(console, "Connection error:"))

  await fill_default_model();
  });
server.on('error', console.error);
