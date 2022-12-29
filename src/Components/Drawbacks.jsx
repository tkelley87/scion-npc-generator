import { Card, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function Drawbacks(props) {
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
          <Typography key={idx} sx={{ p: 1 }}>
            <Typography sx={{ pl: 1, pt: 0.5 }}>{qual}:</Typography>
            <Typography sx={{ pl: 2, pt: 0.5 }}>
              {props?.vul ? props.vul : ""}:
            </Typography>
            <Typography sx={{ pl: 3, pt: 0.5 }}>{description}</Typography>
          </Typography>
        );
      } else {
        results.push(
          <Typography key={idx} sx={{ p: 1 }}>
            <Typography sx={{ pl: 1, pt: 0.5 }}>{qual}:</Typography>
            <Typography sx={{ pl: 2, pt: 0.5 }}>
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
      <Card>
        <Typography>{"Drawbacks:"}</Typography>
        {results}
      </Card>
    </>
  );
}

export default Drawbacks;
