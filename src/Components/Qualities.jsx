// MUI imports
import { Box, Divider, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// React
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Qualities(props) {
  const theme = useTheme();

  const [quality, setQuality] = useState([]);
  const [toxics, setToxics] = useState([]);

  useEffect(() => {
    if (props.qualities) {
      setQuality(props.qualities);
    }
  }, [props.qualities]);

  useEffect(() => {
    if (props.toxic) {
      setToxics(props.toxic);
    }
  }, [props.toxic, toxics]);

  let results = [];
  quality.forEach((object) => {
    let quality = Object.keys(object);
    quality.forEach((qual) => {
      let description = object[qual]?.Description;
      if (qual === "Toxic") {
        results.push(
          <Box key={uuidv4()} sx={{ p: 1 }}>
            <Typography fontFamily={theme.typography.qualities.c}>
              {qual} -
            </Typography>
            <Typography
              fontFamily={theme.typography.qualities.b}
              sx={{ pl: 1, pt: 0.5 }}
            >
              {description}
            </Typography>
            {Object.entries(toxics).map((key) => (
              <Grid key={uuidv4()} container direction="row">
                <Box
                  sx={{
                    fontFamily: theme.typography.qualities.d,
                    pl: 2,
                    pt: 0.5,
                  }}
                >
                  {key[0]}:
                </Box>
                <Box
                  sx={{
                    fontFamily: theme.typography.qualities.b,
                    pl: 0.5,
                    pt: 0.5,
                  }}
                >
                  {key[1]}
                </Box>
              </Grid>
            ))}
          </Box>
        );
      } else {
        results.unshift(
          <Box key={uuidv4()} sx={{ p: 1 }}>
            <Typography fontFamily={theme.typography.qualities.c}>
              {qual} -
            </Typography>
            <Typography
              fontFamily={theme.typography.qualities.b}
              sx={{ pl: 1, pt: 0.5 }}
            >
              {description}
            </Typography>
          </Box>
        );
      }
    });
  });

  if (!props.qualities) return "";

  return (
    <>
      <Typography fontFamily={theme.typography.qualities.a} sx={{ p: 0.5 }}>
        Qualities:{" "}
      </Typography>
      {results}
      <Divider />
    </>
  );
}

export default Qualities;
