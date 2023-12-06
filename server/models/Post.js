// Importing the mongoose library for MongoDB interactions
import mongoose from "mongoose";

// Creating a Mongoose schema for posts
const PostSchema = mongoose.Schema(
  {
     // User ID associated with the post, required field
    userId: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming your user model is named 'User'
      required: true,
    },
    // User name associated with the post, required field
    userName: {
      type: String,
      required: true,
    },
     // Text content of the post
    text: String,
    // File path for an optional picture associated with the post
    picturePath: String,
    // File path for the user's profile image
    profileImage: String,
     // Map to store user IDs who liked the post, with a boolean value indicating whether they liked it
    likes: {
      type: Map,
      of: Boolean,
    },
    // Array to store comments associated with the post, initialized with an empty array
    comments: {
      type: Array,
      default: [],
    },
  },
  // Adding timestamps to track when the post was created and last updated
  { timestamps: true }
);

// Creating a Mongoose model named "Post" using the defined schema
const Post = mongoose.model("Post", PostSchema);

// Exporting the Post model for use in other parts of the application
export default Post;