import {
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

function Toxic(toxic) {
    // console.log(`This is toxic => `, toxic.toxic)
  const [toxics, setToxics] = useState([]);
  useEffect(() => {
    if (toxic.toxic) {
        setToxics(toxic.toxic);
        // console.log(toxic)
    }
  }, [toxic.toxic, toxics]);

  if (!toxic.toxic) return "";
  return (
    <>
      <Card>
        <CardHeader title={"Toxic:"} />
        {Object.entries(toxics).map((key, idx) => (
          <CardContent key={idx}>
            <Typography>
              {key[0]}: {key[1]}
            </Typography>
          </CardContent>
        ))}
      </Card>
    </>
  );
}

export default Toxic;
