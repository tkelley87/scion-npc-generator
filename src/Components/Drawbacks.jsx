import { Divider, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import React, { useEffect, useState } from "react";

function Drawbacks(props) {
  const theme = useTheme();

  const [draw, setDraw] = useState([]);
  useEffect(() => {
    if (props.drawbacks) {
      setDraw(props.drawbacks);
    }
  }, [props]);

  let results = [];
  draw.forEach((object, idx) => {
    let quality = Object.keys(object);
    quality.forEach((qual) => {
      let description = object[qual]?.Description;
      if (qual === "Vulnerability") {
        results.push(
          <Typography key={idx} sx={{ p: 1 }} component="div">
            <Typography
              fontFamily={theme.typography.drawbacks.c}
              sx={{ pl: 1 }}
            >
              {qual} - {props?.vul ? props.vul : ""}
            </Typography>
            <Grid container>
              <Typography
                fontFamily={theme.typography.drawbacks.d}
                sx={{
                  pl: 2,
                  pt: 0.75,
                }}
              >
                {description}
              </Typography>
            </Grid>
          </Typography>
        );
      } else {
        results.push(
          <Typography key={idx} sx={{ p: 1 }} component="div">
            <Grid container>
              <Typography
                fontFamily={theme.typography.drawbacks.c}
                sx={{ pl: 1 }}
              >
                {qual} -
              </Typography>
              <Typography
                fontFamily={theme.typography.drawbacks.d}
                sx={{
                  pl: 2.4,
                  pt: 0.9,
                }}
              >
                {description}
              </Typography>
            </Grid>
          </Typography>
        );
      }
    });
  });

  if (!props.drawbacks) return "";

  return (
    <>
      <Divider />
      <Typography fontFamily={theme.typography.drawbacks.a} sx={{ p: 0.5 }}>
        {"Drawbacks:"}
      </Typography>
      {results}
    </>
  );
}

export default Drawbacks;
