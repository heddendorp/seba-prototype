import * as express from "express";
import * as passport from "passport";

const router = express.Router();

router.post(
  "/create",
  async (req, res) => {
    res.json({message: "success."})
  }
);

router.post(
  "create-unit",
  async (req, res) => {

  }
)

export const lectureRouter = router;
