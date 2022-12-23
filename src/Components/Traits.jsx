import { Card, CardContent, CardHeader, Typography } from "@mui/material";

function Traits(traits) {
  return (
    <>
      <Card>
        <CardHeader title={"Traits:"} />
        {traits?.traits?.map((key, idx) => (
          <CardContent key={idx}>
            <Typography>{key}</Typography>
          </CardContent>
        ))}
      </Card>
    </>
  );
}

export default Traits;
