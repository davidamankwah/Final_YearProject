import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { checkToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", checkToken, getUser);
router.get("/:id/friends", checkToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", checkToken, addRemoveFriend);

export default router;