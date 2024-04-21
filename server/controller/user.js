import User from "../models/User.js";

// Controller function to get user information by ID
export const getUserInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Controller function to get followers of a user
export const getUserFollowers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    // Retrieve followers' information
    const followers = await Promise.all(
      user.followers.map((id) => User.findById(id))
    );
    // Format followers' information for response
    const formattedFollowers = followers.map(
      ({ _id, userName, picturePath }) => {
        return { _id, userName, picturePath };
      }
    );
    res.status(200).json(formattedFollowers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
// Controller function to modify follower status (follow/unfollow)
export const modifyFollowerStatus = async (req, res) => {
  try {
    const { id, followerId: followerId } = req.params;
    const user = await User.findById(id);
    const follower = await User.findById(followerId);

    // If follower already exists, unfollow; otherwise, follow
    if (user.followers.includes(followerId)) {
      user.followers = user.followers.filter((id) => id !== followerId);
      follower.followers = follower.followers.filter((id) => id !== id);
    } else {
      user.followers.push(followerId);
      follower.followers.push(id);
    }

    // Save changes to database
    await user.save();
    await follower.save();

     // Retrieve updated followers' information
    const followers = await Promise.all(
      user.followers.map((id) => User.findById(id))
    );

    // Format followers' information for response
    const formattedFollowers = followers.map(
      ({ _id, userName, picturePath }) => {
        return { _id, userName, picturePath };
      }
    );

    res.status(200).json(formattedFollowers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Controller function to get recommended users excluding current user and users already followed
export const getRecommendedUsers = async (req, res) => {
  try {
    // Exclude the current user and users the current user is already following
    const { _id, followers } = req.user;
    const recommendedUsers = await User.find({
      _id: { $ne: _id, $nin: followers },
    }).limit(4); // Limit the number of recommended users

    res.status(200).json(recommendedUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller function for user search
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.params;
    console.log('Search Query:', query);

    // Case-insensitive regular expression to perform the search
    const users = await User.find({
      userName: { $regex: new RegExp(query, 'i') },
    });

    console.log('Search Result:', users);

    res.status(200).json(users);
  } catch (error) {
    console.error('Error in searchUsers:', error);
    res.status(500).json({ error: error.message });
  }
};
