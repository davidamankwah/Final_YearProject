import User from "../models/User.js";


export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFollowersList = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const followers = await Promise.all(
      user.followers.map((id) => User.findById(id))
    );
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
export const addOrRemoveFollowers = async (req, res) => {
  try {
    const { id, followerId: followerId } = req.params;
    const user = await User.findById(id);
    const follower = await User.findById(followerId);

    if (user.friends.includes(followerId)) {
      user.friends = user.followers.filter((id) => id !== followerId);
      follower.friends = follower.friends.filter((id) => id !== id);
    } else {
      user.followers.push(followerId);
      follower.followers.push(id);
    }
    await user.save();
    await follower.save();

    const followers = await Promise.all(
      user.followers.map((id) => User.findById(id))
    );
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