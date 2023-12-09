import mongoose from "mongoose";

// Creating a Mongoose schema for comments
const CommentSchema = mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming your user model is named 'User'
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

  const Comment = mongoose.model("Comment", CommentSchema);

  export default Comment;