import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function Drawbacks(drawbacks) {
  const [draw, setDraw] = useState("");
  const [description, setDescription] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (drawbacks?.drawbacks) {
      Object.entries(drawbacks.drawbacks).forEach((key, idx) => {
        setIndex(idx);
        setDraw(key[0]);
        setDescription(key[1]["Description"]);
      });
    }
  }, [drawbacks.drawbacks]);

  if (!drawbacks.drawbacks) return "";

  return (
    <>
      <Card key={index}>
        <CardHeader title={"Drawbacks:"} />
        <CardContent>
          <Typography>
            {draw}: {description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default Drawbacks;
