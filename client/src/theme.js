export const themeSettings = (mode) => {
  const colorTokens = {
    grey: {
      0: "#F5F5F5",
      10: "#EEEEEE",
      50: "#CCCCCC",
      100: "#AAAAAA",
      200: "#888888",
      300: "#666666",
      400: "#444444",
      500: "#333333",
      600: "#222222",
      700: "#111111",
      800: "#000000",
      900: "#000000",
      1000: "#000000",
    },
    primary: {
      50: "#E3F2FD",
      100: "#BBDEFB",
      200: "#90CAF9",
      300: "#64B5F6",
      400: "#42A5F5",
      500: "#2196F3",
      600: "#1E88E5",
      700: "#1976D2",
      800: "#1565C0",
      900: "#0D47A1",
    },
  };

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // Dark mode palette
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
          }
        : {
            // Light mode palette
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 14,
      // Customizing heading styles
      h1: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 48,
        fontWeight: 700, // Increased font weight
      },
      h2: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 36,
        fontWeight: 600, // Increased font weight
      },
      // Adding custom button style
      button: {
        textTransform: 'capitalize',
        fontWeight: 600,
        borderRadius: 8, // Rounded corners
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', // Soft shadow
        padding: '10px 20px', // Increased padding
      },
    },
  };
};
