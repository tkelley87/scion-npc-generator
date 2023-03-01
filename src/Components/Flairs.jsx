import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import React, { useEffect, useState } from "react";

function Flairs(flairs) {
  const theme = useTheme();

  const [flair, setFlair] = useState([]);
  const [stat, setStat] = useState("");

  useEffect(() => {
    setFlair([]);
    setStat("");

    if (flairs?.flairs) {
      setFlair(flairs.flairs);
      let name =
        Object.entries(flairs)[0][0].charAt(0).toUpperCase() +
        Object.entries(flairs)[0][0].slice(1);
      setStat(name);
    }
  }, [flairs.flairs, flairs]);

  let results = [];
  flair.forEach((object, idx) => {
    let quality = Object.keys(object);
    quality.forEach((qual) => {
      let action = object[qual]?.Action;
      let cooldown = object[qual]?.Cooldown;
      let cost = object[qual]?.Cost;
      let description = object[qual]?.Description;
      let duration = object[qual]?.Duration;
      let range = object[qual]?.Range;
      let subject = object[qual]?.Subject;

      results.push(
        <Typography key={idx} sx={{ p: 1 }} component="div">
          <Grid container sx={{ display: "flex" }}>
            <Typography fontFamily={theme.typography.flairs.c}>
              {qual} -
            </Typography>
            <Grid container>
              <Grid item>
                <Typography
                  fontFamily={theme.typography.flairs.b}
                  sx={{ pl: 1, pt: 0.5 }}
                >
                  Action:
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  fontFamily={theme.typography.flairs.d}
                  sx={{ pl: .35, pt: 0.75 }}
                >
                  {action}
                </Typography>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item>
                <Typography
                  fontFamily={theme.typography.flairs.b}
                  sx={{ pl: 1, pt: 0.5 }}
                >
                  Cooldown:
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  fontFamily={theme.typography.flairs.d}
                  sx={{ pl: .35, pt: 0.75 }}
                >
                  {cooldown}
                </Typography>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item>
                <Typography
                  fontFamily={theme.typography.flairs.b}
                  sx={{ pl: 1, pt: 0.5 }}
                >
                  Cost:
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  fontFamily={theme.typography.flairs.d}
                  sx={{ pl: .35, pt: 0.75 }}
                >
                  {cost}
                </Typography>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item>
                <Typography
                  fontFamily={theme.typography.flairs.b}
                  sx={{ pl: 1, pt: 0.5 }}
                >
                  Duration:
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  fontFamily={theme.typography.flairs.d}
                  sx={{ pl: .35, pt: 0.75 }}
                >
                  {duration}
                </Typography>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item>
                <Typography
                  fontFamily={theme.typography.flairs.b}
                  sx={{ pl: 1, pt: 0.5 }}
                >
                  Range:
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  fontFamily={theme.typography.flairs.d}
                  sx={{ pl: .35, pt: 0.75 }}
                >
                  {range}
                </Typography>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item>
                <Typography
                  fontFamily={theme.typography.flairs.b}
                  sx={{ pl: 1, pt: 0.5 }}
                >
                  Subject:
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  fontFamily={theme.typography.flairs.d}
                  sx={{ pl: .35, pt: 0.75 }}
                >
                  {subject}
                </Typography>
              </Grid>
            </Grid>

            <Grid container>
              <Typography
                fontFamily={theme.typography.flairs.d}
                sx={{
                  pl: 2.25,
                  pt: 0.87,
                }}
              >
                {description}
              </Typography>
            </Grid>
          </Grid>
        </Typography>
      );
    });
  });

  if (!flairs.flairs) return "";

  return (
    <>
      <Typography
        fontFamily={theme.typography.flairs.a}
        sx={{ padding: 0.5 }}
      >
        {`${stat}: `}{" "}
      </Typography>
      {results}
    </>
  );
}

export default Flairs;
