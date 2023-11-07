import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
      <Box>
        <Box
          width="100%"
          backgroundColor={theme.palette.background.alt}
          p="1rem 6%"
          textAlign="center"
        >
          <Typography fontWeight="bold" fontSize="25px" color="danger">
            ConnectSphere
          </Typography>
        </Box>
  
        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Welcome to ConnectSphere, where connections thrive and conversations come to life! 
            🌟 Join our vibrant community, share your moments, and discover new stories. 
            Connect with friends, explore exciting content, and make this space truly yours. 
            Let the journey begin!!
          </Typography>
          <Form/>
        </Box>
      </Box>
    );
  };
  
  export default LoginPage;