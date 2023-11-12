import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
  } from "@mui/icons-material";
  import { Box, Typography, Divider, useTheme } from "@mui/material";
  import ProfileImage from "../../components/ProfileImage";
  import StyledWrapper from "../../components/StyledWrapper";
  import FlexBetween from "components/FlexBetween";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";

  const customUserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
  }
  const getUser = async () => {
    const response = await fetch(`http://localhost:4000/users/${userId}`, {
      method: "GET",
      headers: { Permitted: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); 

  if (!user) {
    return null;
  }

  const {
    userName,
    profileViews,
    followers,
  } = user;

  return(
<StyledWrapper>
<FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        </FlexBetween>
</StyledWrapper>
  );
  export default customUserWidgett;