import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function Drawbacks(drawbacks) {
  const [draw, setDraw] = useState([]);

  useEffect(() => {
    if (drawbacks?.drawbacks) {
      setDraw(drawbacks.drawbacks);
    }
  }, [drawbacks.drawbacks]);

  let results = [];
  draw.forEach((object, idx) => {
    let quality = Object.keys(object);
    quality.forEach((qual) => {
      let description = object[qual]?.Description;
      results.push(
        <CardContent key={idx}>
          <Typography>{qual}:</Typography>
          <Typography>{description}</Typography>
        </CardContent>
      );
    });
  });

  if (!drawbacks.drawbacks) return "";

  return (
    <>
      <Card>
        <CardHeader title={"Drawbacks:"} />
        {results}
      </Card>
    </>
  );
}

export default Drawbacks;
