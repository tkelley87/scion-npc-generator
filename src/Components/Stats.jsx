import { Card, CardContent, CardHeader, Typography } from "@mui/material";

function Stats(stats) {
  if (!stats.stats) return "";

  return (
    <>
      <Card>
        <CardHeader title={"Stats"} />
        {Object.entries(stats?.stats).map((key, idx) => (
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

export default Stats;
