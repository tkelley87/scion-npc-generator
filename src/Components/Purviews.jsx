import React from "react";
import { Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";


const Purviews = ({ data }) => {
  const theme = useTheme();

  if (!data) return null;

  const renderProperties = (obj) => {
    return Object.keys(obj).map((key) => {




      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        return (
          <Box component="div" mt={2} key={key}>
            <Typography fontFamily={theme.typography.purviews.a}>
              {key}:
            </Typography>
            <Typography
              fontFamily={theme.typography.purviews.b}
              sx={{ pl: 0.35, pt: 0.75 }}
            >
              {renderProperties(obj[key])}
            </Typography>
          </Box>
        );
      } else if (key === "Innate Power" && Array.isArray(obj[key])) {
        return (
          <Box component="div" mt={1} key={key}>
            <Typography fontFamily={theme.typography.purviews.a}>
              {key}:
            </Typography>
            <Typography
              fontFamily={theme.typography.purviews.d}
              sx={{ pl: 0.35, pt: 0.75 }}
            >
              {obj[key]}
            </Typography>
          </Box>
        );
      } else {
        return (
          <Box component="div" mt={1} key={key}>
            <Typography fontFamily={theme.typography.purviews.d}>
              {key}: {obj[key]}
            </Typography>
          </Box>
        );
      }
    });
  };

  return (
    <Box elevation={3} sx={{ p: 0.5 }}>
      {renderProperties(data)}
    </Box>
  );
};

export default Purviews;