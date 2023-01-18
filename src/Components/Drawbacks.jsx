import { Divider, Typography } from "@mui/material";
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
            <Typography fontFamily={theme.typography.c} sx={{ pl: 1, pt: 0.5 }}>
              {qual}:
            </Typography>
            <Typography fontFamily={theme.typography.a} sx={{ pl: 2, pt: 0.5 }}>
              {props?.vul ? props.vul : ""}:
            </Typography>
            <Typography fontFamily={theme.typography.b} sx={{ pl: 3, pt: 0.5 }}>
              {description}
            </Typography>
          </Typography>
        );
      } else {
        results.push(
          <Typography key={idx} sx={{ p: 1 }} component="div">
            <Typography fontFamily={theme.typography.c} sx={{ pl: 1, pt: 0.5 }}>
              {qual}:
            </Typography>
            <Typography fontFamily={theme.typography.b} sx={{ pl: 2, pt: 0.5 }}>
              {description}
            </Typography>
          </Typography>
        );
      }
    });
  });

  if (!props.drawbacks) return "";

  return (
    <>
      <Divider />
      <Typography fontFamily={theme.typography.a} sx={{ p: 0.5 }}>
        {"Drawbacks:"}
      </Typography>
      {results}
    </>
  );
}

export default Drawbacks;
