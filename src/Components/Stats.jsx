import { Box, Divider, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function Stats({ stats }) {

  const theme = useTheme();

  // Extract required properties and the rest from the main data object
  const {
    Extras,
    "Primary Pool": primaryPool,
    "Secondary Pool": secondaryPool,
    "Desperation Pool": desperationPool,
    ...restOfData
  } = stats;

  return (
    <>
      <Typography fontFamily={theme.typography.b} sx={{ textAlign: "center" }}>
        {"Stats"}
      </Typography>
      <Divider flexItem={true} variant="fullWidth" />
      {/* Display all other properties */}
      {Object.entries(restOfData).map(([key, value]) => (
        <Grid
          container
          sx={{ display: "flex" }}
          alignItems="center"
          justifyContent="space-between"
          key={key}
        >
          <Grid item>
            <Typography
              fontFamily={theme.typography.flairs.b}
              sx={{ pl: 1.5, pt: 0.25 }}
            >
              {key}:
            </Typography>
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item>
                <Typography
                  fontFamily={theme.typography.b}
                  sx={{ pr: 1.5, pt: 0.25 }}
                >
                  {value}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}

      {/* Display Primary Pool, Secondary Pool, and Desperation Pool in the specified order */}
      {primaryPool && (
        <Grid
          container
          sx={{ display: "flex" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Typography
              fontFamily={theme.typography.flairs.b}
              sx={{ pl: 1.5, pt: 0.25 }}
            >
              Primary Pool:
            </Typography>
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item>
                <Typography
                  fontFamily={theme.typography.b}
                  sx={{ pr: 1.5, pt: 0.25 }}
                >
                  {primaryPool}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      {secondaryPool && (
        <Grid
          container
          sx={{ display: "flex" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Typography
              fontFamily={theme.typography.flairs.b}
              sx={{ pl: 1.5, pt: 0.25 }}
            >
              Secondary Pool:
            </Typography>
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item>
                <Typography
                  fontFamily={theme.typography.b}
                  sx={{ pr: 1.5, pt: 0.25 }}
                >
                  {secondaryPool}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      {desperationPool && (
        <Grid
          container
          sx={{ display: "flex" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Typography
              fontFamily={theme.typography.flairs.b}
              sx={{ pl: 1.5, pt: 0.25 }}
            >
              Desperation Pool:
            </Typography>
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item>
                <Typography
                  fontFamily={theme.typography.b}
                  sx={{ pr: 1.5, pt: 0.25 }}
                >
                  {desperationPool}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      {/* Display Extras at the bottom */}
      {Extras && (
        <>
          <Typography
            fontFamily={theme.typography.b}
            sx={{ textAlign: "center", pt: 1.0 }}
          >
            {"Extras"}
          </Typography>
          <Divider flexItem={true} variant="fullWidth" />
          <Box
            component="div"
            fontFamily={theme.typography.flairs.d}
            sx={{ display: "div", textAlign: "center", pt: .25, pb: .25 }}
          >
            {Extras}
          </Box>
        </>
      )}
    </>
  );
};



export default Stats;
