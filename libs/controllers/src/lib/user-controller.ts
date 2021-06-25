import * as express from "express";
import * as passport from "passport";
import {genToken} from "@seba/auth";

const router = express.Router();

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    if (err || !user)
      return res.status(401).json({
        message: info.message
      });

    req.login(user, function(err) {
      if (err)
        return next(err);

      const body = { id: user._id }
      const token = genToken(body);

      res.cookie("token", token);
      return res.json({
        user: user,
        token: token
      })
    });
  })(req, res, next);
});

router.post(
  "/register",
  passport.authenticate("register", {session: false}),
  async (req, res) => {
    // IDE marks an error here but user property is added by passport
    if (req.user.statusCode === 409)
      res.status(409).json({
        message: "Signup failed - username already exists."
      });
    else
      res.status(201).json({
        message: "Signup success."
      });
  }
);

export const userRouter = router;
