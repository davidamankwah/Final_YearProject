import { Box, Typography, useTheme } from "@mui/material";
import Follower from "../../components/Follower";
import StyledWrapper from "../../components/Wrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFollowers } from "../../state";

const FollowersWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const followers = useSelector((state) => state.user.followers);

  const getFollowers = async () => {
    const response = await fetch(
      `http://localhost:4000/users/${userId}/followers`,
      {
        method: "GET",
        headers: { Permitted: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFollowers({ followers: data }));
  };

  useEffect(() => {
    getFollowers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StyledWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Following
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {followers.map((follower) => (
          <Follower
            key={follower._id}
            friendId={follower._id}
            name={`${follower.userName}`}
            userPicturePath={follower.picturePath}
          />
        ))}
      </Box>
    </StyledWrapper>
  );
};

export default FollowersWidget;