import express from "express";
import {
  getUserById,
  getUserFollowersList,
  addOrRemoveFollowers,
} from "../controller/user.js"
import { checkToken } from "../middleware/auth.js";

const router = express.Router();

// Get user information by ID
router.get("/:id", checkToken, getUserById);

// Get user's friend list by ID
router.get("/:id/followers", checkToken, getUserFollowersList);

// Add or remove a friend for a user
router.patch("/:id/:followerId", checkToken, addOrRemoveFollowers);

export default router;
