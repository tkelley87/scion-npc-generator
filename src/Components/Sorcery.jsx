import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const Sorcery = ({ sorcery }) => {
  if (!sorcery) return null;

  console.log("Where in Sorcery.jsx", sorcery);

  const renderProperties = (obj) => {
    return Object.keys(obj).map((key) => {
      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        return (
          <Box component="div" mt={2} key={key}>
            <Typography variant="h6" component="h3">
              {key}
            </Typography>
            {renderProperties(obj[key])}
          </Box>
        );
      } else {
        return (
          <Box component="div" mt={1} key={key}>
            <Typography variant="body1" component="span">
              <strong>{key}:</strong> {obj[key]}
            </Typography>
          </Box>
        );
      }
    });
  };

  return (
    <Paper elevation={3} style={{ padding: "16px" }}>
      {renderProperties(sorcery)}
    </Paper>
  );
};

export default Sorcery;