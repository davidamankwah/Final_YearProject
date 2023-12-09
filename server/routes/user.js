import express from "express";
import {
  getUserById,
  getUserFollowers,
  addOrRemoveFollowers,
  searchUsers,
} from "../controller/user.js"
import { checkToken } from "../middleware/auth.js";

const router = express.Router();

// Get user information by ID
router.get("/:id", checkToken, getUserById);

// Get user's friend list by ID
router.get("/:id/followers", checkToken, getUserFollowers);

// Add or remove a friend for a user
router.patch("/:id/:followerId", checkToken, addOrRemoveFollowers);

// Define a route for user search
router.get("/search", searchUsers);


export default router;
