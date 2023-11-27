// RecommendedUsers.js
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Follower from "./Follower";
import { useSelector } from "react-redux";

const RecommendedUsers = ({ token }) => {
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const currentUserID = useSelector((state) => state.user?._id);

  useEffect(() => {
    const fetchRecommendedUsers = async () => {
      try {
        const response = await fetch("http://localhost:4000/users/recommended", {
          method: "GET",
          headers: { Permitted: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recommended users");
        }

        const data = await response.json();
        // Filter out the current user from the recommended users
        const filteredUsers = data.filter(user => user._id !== currentUserID);
        setRecommendedUsers(filteredUsers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecommendedUsers();
  }, [token, currentUserID]);

  return (
    <div className="recommended-users">
      <Typography variant="h6">Recommended to Follow:</Typography>
      {recommendedUsers.map((recommendedUser) => (
        <Follower
          key={recommendedUser._id}
          followerId={recommendedUser._id}
          name={recommendedUser.userName}
          profileImage={recommendedUser.picturePath}
        />
      ))}
    </div>
  );
};

export default RecommendedUsers;