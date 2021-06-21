import * as express from 'express';
import * as mongoose from "mongoose";
import {userRouter} from "@seba/controllers";
import * as passport from "passport";
import {initializePassport} from "@seba/auth";

const app = express();
app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport);
app.use("/user", userRouter);

const port = process.env.port || 3333;
const server = app.listen(port, async () => {
  console.log('Listening at http://localhost:' + port + '/api');

  const url = "mongodb://localhost:27017/learn-with-me";
  mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to database"))
    .catch(console.error.bind(console, "Connection error:"))
  });

server.on('error', console.error);
