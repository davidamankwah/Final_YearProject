//import dependecies 
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import { register } from "./controller/auth.js";
import User from "./models/User.js";



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

app.post("/auth/register", upload.single("pic"), register);

 // ROUTES 
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

//Mongoose set up
const PORT = process.env.PORT || 6001; // Set port to 4000 or 6001 as backup

// Connect to the database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    // Start the server
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`) );
  }).catch((error) => console.log(`${error} did not connect`))
  
