// ProfilePage.js
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../navbar";
import RecommendedUsers from "../../components/RecommendedUsers";
import FollowersWidget from "../widget/FollowersWidget";
import CustomUserWidget from "../widget/customUserWidget";
import "./profile.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`http://localhost:4000/users/${userId}`, {
          method: "GET",
          headers: { Permitted: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, [userId, token]);

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <div className="profilePage">
        <div className="profilePageSection">
          <CustomUserWidget userId={userId} picturePath={user.picturePath} />
          <div className="profilePageSection large">
            <FollowersWidget userId={userId} />
            {/* Include the RecommendedUsers component here */}
            <RecommendedUsers token={token} />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default ProfilePage;
