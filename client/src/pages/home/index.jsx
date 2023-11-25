import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../../pages/navbar";
import CustomUserWidget from "../widget/customUserWidget";
import FollowersWidget from "../widget/FollowersWidget";
import PostsWid from "../widget/PostsWid";
import UserPostWidget from "../widget/UserPostWidget";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);
    return (
        <Box>
             <Navbar />
          <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="0.5rem"
            justifyContent="space-between"
          >
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
              <CustomUserWidget userId={_id} picturePath={picturePath} />
            </Box>
            <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <UserPostWidget picturePath={picturePath} />
          <PostsWid userId={_id} />
        </Box>
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <FollowersWidget userId={_id} />
            </Box>
          </Box>
        </Box>
      );
};
export default HomePage;