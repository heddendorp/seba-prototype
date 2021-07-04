import * as express from "express";
import {Request} from "express";
import * as passport from "passport";
import {genToken} from "@seba/auth";

const router = express.Router();

router.post(
  "/register",
  async (req: Request, res) => {
    if (!req.user)
      res.status(409).json({
        message: "Signup failed - Username already exists."
      });
    else
      res.status(201).json({
        message: "Signup success."
      });
  }
);

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    if (err || !user)
      return res.status(401).json({
        message: info.message
      });

    req.login(user, function (err) {
      if (err)
        return next(err);

      const body = {id: user._id}
      const token = genToken(body);

      res.cookie("token", token);
      return res.json({
        user: user,
        token: token
      })
    });
  })(req, res, next);
});

router.get(
  "/current",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    res.status(200).json(req.user);
  }
);

export const userRouter = router;
