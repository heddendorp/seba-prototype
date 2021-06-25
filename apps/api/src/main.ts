import * as express from 'express';
import * as mongoose from "mongoose";
import {userRouter} from "@seba/controllers";
import * as passport from "passport";
import {initializePassport} from "@seba/auth";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import {lectureRouter} from "../../../libs/controllers/src/lib/lecture-controller";
import {lectureUnitRouter} from "../../../libs/controllers/src/lib/lecture-unit-controller";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({type: ["application/json", "text/plain"]}));

app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport);
app.use("/user", userRouter);
app.use("/lecture", lectureRouter);
app.use("/lecture-unit", lectureUnitRouter);

const port = process.env.port || 3333;
const server = app.listen(port, async () => {
  console.log('Listening at http://localhost:' + port + '/api');

  const url = "mongodb://localhost:27017/learn-with-me";
  mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to database"))
    .catch(console.error.bind(console, "Connection error:"))
  });

server.on('error', console.error);
