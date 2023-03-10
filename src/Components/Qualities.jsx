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
          <Box key={idx} sx={{ p: 1 }}>
            <Typography
              key={idx + qual}
              fontFamily={theme.typography.qualities.c}
            >
              {qual} -
            </Typography>
            <Typography
              key={idx + description}
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
                    sx={{ fontFamily: theme.typography.b, pl: 2, pt: 0.5 }}
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
          <Box key={idx} sx={{ p: 1 }}>
            <Typography
              key={idx + qual}
              fontFamily={theme.typography.qualities.c}
            >
              {qual} -
            </Typography>
            <Typography
              key={idx + description}
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
    </>
  );
}

export default Qualities;

// TODO ID: 20230309 --- `Qualities` Component has a warning to fix `unique` key issue
