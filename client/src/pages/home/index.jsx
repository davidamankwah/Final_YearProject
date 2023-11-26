import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../../pages/navbar";
import CustomUserWidget from "../widget/customUserWidget";
import FollowersWidget from "../widget/FollowersWidget";
import PostsWid from "../widget/PostsWid";
import UserPostWidget from "../widget/UserPostWidget";
import "./home.css";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <div className="homePage">
        <div className="homePageSection">
          <CustomUserWidget userId={_id} picturePath={picturePath} />
        </div>
        <div className="homePageSection large">
          <UserPostWidget picturePath={picturePath} />
          <PostsWid userId={_id} />
        </div>
        <div className="homePageSection">
          <FollowersWidget userId={_id} />
        </div>
      </div>
    </Box>
  );
};

export default HomePage;