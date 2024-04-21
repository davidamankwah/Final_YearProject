import express from "express";
import { login} from "../controller/auth.js";

const router = express.Router();

// Route for user login
router.post("/login", login); // Handle POST requests to /login route using the login controller function


export default router;