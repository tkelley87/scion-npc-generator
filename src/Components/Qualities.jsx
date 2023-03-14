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
  quality.forEach((object, index) => {
    let quality = Object.keys(object);
    quality.forEach((qual, i) => {
      let description = object[qual]?.Description;
      if (qual === "Toxic") {
        results.push(
          <Box sx={{ p: 1 }}>
            <Typography
              key={i + qual}
              fontFamily={theme.typography.qualities.c}
            >
              {qual} -
            </Typography>
            <Typography
              key={i + description}
              fontFamily={theme.typography.qualities.b}
              sx={{ pl: 1, pt: 0.5 }}
            >
              {description}
            </Typography>
            {Object.entries(toxics).map((key, idx) => (
              <>
                <Grid container direction="row">
                  <Box
                    key={idx + key[0]}
                    sx={{
                      fontFamily: theme.typography.qualities.d,
                      pl: 2,
                      pt: 0.5,
                    }}
                  >
                    {key[0]}:
                  </Box>
                  <Box
                    key={idx + key[1]}
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
          </Box>
        );
      } else {
        results.unshift(
          <Box sx={{ p: 1 }}>
            <Typography
              key={index + qual}
              fontFamily={theme.typography.qualities.c}
            >
              {qual} -
            </Typography>
            <Typography
              key={index + description}
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

  console.log(`Qualities within Component =>`, props);

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

// TODO ID: 20230309 --- `Qualities` Component has a warning to fix `unique` key issue
