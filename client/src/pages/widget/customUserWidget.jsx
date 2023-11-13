import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import ProfileImage from "../../components/ProfileImage";
import StyledWrapper from "../../components/Wrapper";
import FlexBetween from "../../components/FlexBetween";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomUserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;

  const getUserById  = async () => {
    const response = await fetch(`http://localhost:4000/users/${userId}`, {
      method: "GET",
      headers: { Permitted: `Bearer ${token}` },
    });
    console.log(response); // Log the response
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUserById ();
  }, []);

  if (!user) {
    return null;
  }

  const { userName, profileViews, followers } = user;

  return (
    <StyledWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween>
          <ProfileImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {userName}
            </Typography>
            <Typography color={medium}>{followers.length} followers</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={palette.primary.main} fontWeight="500">
            {profileViews}
          </Typography>
        </FlexBetween>
      </Box>
    </StyledWrapper>
  );
};

export default CustomUserWidget;
