import { Box } from "@mui/material";
import { styled } from "@mui/system";

// Styled component for wrapping content with custom styling
const StyledWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem",
  backgroundColor: theme.palette.primary.main, // Background color from theme's primary palette
  borderRadius: "1rem",
  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
  color: theme.palette.background.alt, // Text color from theme's alternative background palette
}));

export default StyledWrapper;
