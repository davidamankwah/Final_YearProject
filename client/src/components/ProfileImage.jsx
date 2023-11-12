import { Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledProfileImage = styled(Box)(({ theme }) => ({
  borderRadius: "50%",
  overflow: "hidden",
  boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.1)",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const ProfileImage = ({ image, size = "60px" }) => {
  return (
    <StyledProfileImage width={size} height={size}>
      <img
        alt="user"
        src={`http://localhost:4000/assets/${image}`}
      />
    </StyledProfileImage>
  );
};

export default ProfileImage;
