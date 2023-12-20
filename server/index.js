//import dependecies 
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import { createPost } from "./controller/post.js"; // Importing controller functions to create a new post
import { getRecommendedUsers } from "./controller/user.js";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import chatRoutes from "./routes/chat.js";
import messageRoutes from "./routes/message.js";
import commentRouter from "./routes/comment.js";
import { checkToken } from "./middleware/auth.js";
import { register } from "./controller/auth.js";


//Configurations of dependecies 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

// Create Express app
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Allow cross-origin resource sharing
app.use(morgan("common")); // Log requests to the console
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Parse JSON requests with a maximum size of 30MB
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));  // Parse URL-encoded requests with a maximum size of 30MB
app.use(cors());  // Allow cross-origin requests
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // Serve static files from the public/assets directory


// File storage 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets"); // Store uploaded files in the public/assets directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename of the uploaded file
  },
});
const upload = multer({ storage });  // Create a multer middleware instance with the configured storage

// ROUTES WITH FILES 
app.post("/auth/register", upload.single("pic"), register); // Route for creating a new user and handling file upload
app.post("/posts", checkToken, upload.single("pic"), createPost); // Route for creating a new post, requiring authentication check and handling file upload
// route to get a list of recommended users
app.get("/users/recommended", checkToken, getRecommendedUsers);


 // ROUTES 
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use('/posts', commentRouter);
app.use('/chat', chatRoutes);
app.use('/message', messageRoutes);




//Mongoose set up
const PORT = process.env.PORT || 4001; // Set port to 4000 

// Connect to the database
mongoose
  .connect('mongodb+srv://marksarfo87:admin@cluster0.q7a5lbl.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    // Start the server
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`) );
  }).catch((error) => console.log(`${error} did not connect`))