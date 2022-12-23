import {
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function Qualities(qualities) {
  const [quality, setQuality] = useState("");
  const [description, setDescription] = useState("");
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (qualities?.qualities) {
      Object.entries(qualities.qualities).forEach((key, idx) => {
        setIndex(idx);
        setQuality(key[0]);
        setDescription(key[1]["Description"]);
      });
    }
  }, [qualities.qualities, quality, description]);

  if (!qualities.qualities) return "";

  return (
    <>
      <Card key={index}>
        <CardHeader title={"Qualities: "} />
        <CardContent>
          <Typography>
            {quality}: {description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default Qualities;
