import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import React, { useEffect, useState } from "react";

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
  quality.forEach((object, idx) => {
    let quality = Object.keys(object);
    quality.forEach((qual) => {
      let description = object[qual]?.Description;
      if (qual === "Toxic") {
        results.push(
          <Typography key={idx} sx={{ p: 1 }} component="div">
            <Typography fontFamily={theme.typography.qualities.c}>
              {qual} -
            </Typography>
            <Typography
              fontFamily={theme.typography.qualities.b}
              sx={{ pl: 1, pt: 0.5 }}
            >
              {description}
            </Typography>
            {Object.entries(toxics).map((key, idx) => (
              <>
                <Grid container direction="row" key={idx}>
                  <Box sx={{ fontFamily: theme.typography.b, pl: 2, pt: 0.5 }}>
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
              </>
            ))}
          </Typography>
        );
      } else {
        results.unshift(
          <Typography key={idx} sx={{ p: 1 }} component="div">
            <Typography fontFamily={theme.typography.qualities.c}>
              {qual} -
            </Typography>
            <Typography
              fontFamily={theme.typography.qualities.b}
              sx={{ pl: 1, pt: 0.5 }}
            >
              {description}
            </Typography>
          </Typography>
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
    </>
  );
}

export default Qualities;
