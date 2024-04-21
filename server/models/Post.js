import mongoose from 'mongoose';

// The schema for replies to comments
const ReplySchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
}, { timestamps: true });

// The schema for comments on posts
const CommentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
    replies: [ReplySchema], // Embed ReplySchema for handling replies
  },
  { timestamps: true }
);

// The schema for posts
const PostSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    text: String,
    picturePath: String,
    profileImage: String,
    likes: {
      type: Map, // Map of users who liked the post
      of: Boolean,
    },
    dislikes: {
      type: Map, // Map of users who disliked the post
      of: Boolean,
    },
    comments: [CommentSchema], // Embed CommentSchema for handling comments
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);

export default Post;
