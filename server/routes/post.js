import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controller/post.js";
import {checkToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", checkToken, getFeedPosts);
router.get("/:userId/posts", checkToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", checkToken, likePost);

export default router;