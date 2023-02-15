import { Divider, Grid, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useEffect, useState } from "react";

import Stats from "./Stats";
import Traits from "./Traits";
import Qualities from "./Qualities";
import Flairs from "./Flairs";
import Drawbacks from "./Drawbacks";

function Npc(props) {
  const theme = useTheme();
  // State
  const [char, setChar] = useState({});
  const [qualities, setQualities] = useState([]);
  const [stats, setStats] = useState([]);
  const [traits, setTraits] = useState([]);
  const [flairs, setFlairs] = useState([]);
  const [drawbacks, setDrawbacks] = useState([]);
  const [toxic, setToxic] = useState([]);
  const [vul, setVul] = useState([]);
  const [human, setHuman] = useState(false);

  useEffect(() => {
    if (props.npc) {
      setChar([]);
      setChar(props.npc);
    }
  }, [props.npc, char]);

  useEffect(() => {
    if (char) {
      setVul([]);
      setTraits([]);
      setStats([]);
      setQualities([]);
      setFlairs([]);
      setDrawbacks([]);
      setToxic([]);
      setHuman(false);

      if (char["Human"] === "yes") {
        setHuman(true);
      }
      if (char["Vulnerability"]) {
        setVul(char["Vulnerability"]);
      }
      if (char["Traits"]) {
        setTraits(char["Traits"]);
      }
      if (char["Stats"]) {
        let newObj = [];

        for (let i in char["Stats"]) {
          let element = [`${i}`, `${char["Stats"][i]}`];

          if (
            i === "Primary Pool" ||
            i === "Secondary Pool" ||
            i === "Desperation Pool"
          ) {
            if (i === "Primary Pool") {
              newObj.splice(newObj.length - 1, 0, element);
            }
            if (i === "Secondary Pool") {
              newObj.splice(newObj.length - 1, 0, element);
            }
            if (i === "Desperation Pool") {
              newObj.push(element);
            }
          } else {
            newObj.unshift(element);
          }
        }

        setStats(newObj);
      }
      if (char["Qualities"]) {
        setQualities(char["Qualities"]);
      }
      if (char["Flairs"]) {
        setFlairs(char["Flairs"]);
      }
      if (char["Drawbacks"]) {
        setDrawbacks(char["Drawbacks"]);
      }
      if (char["Toxic"]) {
        setToxic(char["Toxic"]);
      }
    }
  }, [char]);

  useEffect(() => {
    setVul([]);
    setVul(char["Vulnerability"]);
  }, [vul, char]);

  if (!props.npc) return "";

  return (
    <>
      <Grid
        container
        spacing={1}
        justifyContent="center"
        sx={{ py: 3, pr: 1, pl: 2 }}
      >
        <Paper sx={{ maxWidth: 900, padding: 1, border: "none" }}>
          <Grid container sx={{ flexDirection: { xs: "column", sm: "row" } }}>
            <Grid item xs={12} sm={8}>
              <Grid container sx={{ display: "flex" }} alignItems="center">
                <Grid item>
                  <Typography fontFamily={theme.typography.a} sx={{ pl: 0.5 }}>
                    Name:{" "}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography fontFamily={theme.typography.b} sx={{ pl: 0.5 }}>
                    {" "}
                    {char["Name"]}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ display: "flex" }} alignItems="center">
                <Grid item>
                  <Typography fontFamily={theme.typography.a} sx={{ pl: 0.5 }}>
                    Gender:{" "}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography fontFamily={theme.typography.b} sx={{ pl: 0.5 }}>
                    {" "}
                    {char["Gender"]}
                  </Typography>
                </Grid>
              </Grid>

              <Traits traits={traits} />

              <Grid container sx={{ display: "flex" }} alignItems="center">
                <Grid item>
                  <Typography fontFamily={theme.typography.a} sx={{ pl: 0.5 }}>
                    Pantheon:{" "}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography fontFamily={theme.typography.b} sx={{ pl: 0.5 }}>
                    {" "}
                    {char["Pantheon"]?.charAt(0).toUpperCase() +
                      char["Pantheon"]?.slice(1)}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ display: "flex" }} alignItems="center">
                <Grid item>
                  <Typography fontFamily={theme.typography.a} sx={{ pl: 0.5 }}>
                    Drive:{" "}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography fontFamily={theme.typography.b} sx={{ pl: 0.5 }}>
                    {" "}
                    {char["Drive"]}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ display: "flex" }} alignItems="center">
                <Grid item>
                  <Typography fontFamily={theme.typography.a} sx={{ pl: 0.5 }}>
                    Attitude Towards Player:{" "}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography fontFamily={theme.typography.b} sx={{ pl: 0.5 }}>
                    {" "}
                    {char["Attitude towards player"]}
                  </Typography>
                </Grid>
              </Grid>

              {human ? (
                <Grid container sx={{ display: "flex" }} alignItems="center">
                  <Grid item>
                    <Typography
                      fontFamily={theme.typography.a}
                      sx={{ pl: 0.5 }}
                    >
                      Apart of Cult?:{" "}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      fontFamily={theme.typography.b}
                      sx={{ pl: 0.5 }}
                    >
                      {" "}
                      {char["Apart of Cult?"]}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                ""
              )}
            </Grid>

            <Grid item xs={12} sm={4}>
              <Stats stats={stats} />
            </Grid>
          </Grid>

          <Divider />

          <Grid container>
            <Grid item>
              <Qualities qualities={qualities} toxic={toxic} />
              <Divider />
              <Flairs flairs={flairs} />
              {drawbacks.length > 0 ? (
                <Drawbacks drawbacks={drawbacks} vul={vul} />
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default Npc;
