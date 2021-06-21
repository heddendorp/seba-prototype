import * as express from "express";
import * as passport from "passport";
import {Role, User} from "@seba/models";

const router = express.Router();

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    if (err || !user)
      return res.status(400).json({
        message: info.message
      });

    switch (+user.role) {
      case Role.STUDENT:
        res.redirect("/student/home");
        break;
      case Role.LECTURER:
        res.redirect("/lecturer/home");
        break;
      default:
        throw new Error(`User-role ${user.role} not implemented yet.`);
    }

    res.json(user);
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

router.put(
  "/edit",
  async (req, res) => {
    if (!req.isAuthenticated())
      res.redirect("/login");
    else {
      const changes = {};
      if (req.body.display_name !== undefined)
        changes.display_name = req.body.display_name;
      if (req.body.role !== undefined)
        changes.role = req.body.role;

      await User.updateOne({_id: req.user._id}, changes, null);
      res.json(User.findOne({_id: req.user._id}));
    }
  }
);

export const userRouter = router;
