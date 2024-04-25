import { Box } from "@mui/material";
import { styled } from "@mui/system";

// Component for creating a flex container with space-between layout
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "5px", 
});

export default FlexBetween;
