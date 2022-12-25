import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  List,
} from "@mui/material";
import { useEffect, useState } from "react";
import Stats from "./Stats";
import Traits from "./Traits";
import Qualities from "./Qualities";
import Flairs from "./Flairs";
import Drawbacks from "./Drawbacks";
import Toxic from "./Toxic";

function Npc(props) {
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
        setStats(char["Stats"]);
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
  }, [setVul, vul, char]);

  if (!props.npc) return "";

  return (
    <>
      <Container sx={{ paddingTop: 12 }}>
        <Grid container item spacing={3}>
          <List>
            <Grid item sm={12} md={12} sx={{ padding: 1 }}>
              <Card>
                <CardHeader title={"Name: "} />
                <CardContent>{char["Name"]}</CardContent>
              </Card>
            </Grid>

            <Grid item sm={12} md={12} sx={{ padding: 1 }}>
              <Card>
                <CardHeader title={"Gender: "} />
                <CardContent>{char["Gender"]}</CardContent>
              </Card>
            </Grid>

            <Grid item sm={12} md={12} sx={{ padding: 1 }}>
              <Traits traits={traits} />
            </Grid>

            <Grid item sm={12} md={12} sx={{ padding: 1 }}>
              <Card>
                <CardHeader title={"Pantheon: "} />
                <CardContent>
                  {char["Pantheon"]?.charAt(0).toUpperCase() +
                    char["Pantheon"]?.slice(1)}
                </CardContent>
              </Card>
            </Grid>

            <Grid item sm={12} md={12} sx={{ padding: 1 }}>
              <Card>
                <CardHeader title={"Drive: "} />
                <CardContent>{char["Drive"]}</CardContent>
              </Card>
            </Grid>

            {human ? (
              <Grid item sm={12} md={12} sx={{ padding: 1 }}>
                <Card>
                  <CardHeader title={"Apart of Cult?: "} />
                  <CardContent>{char["Apart of Cult?"]}</CardContent>
                </Card>
              </Grid>
            ) : (
              ""
            )}

            <Grid item sm={12} md={12} sx={{ padding: 1 }}>
              <Card>
                <CardHeader title={"Attitude Towards Player: "} />
                <CardContent>{char["Attitude towards player"]}</CardContent>
              </Card>
            </Grid>

            <Grid item sm={12} md={12} sx={{ padding: 1 }}>
              <Stats stats={stats} />
            </Grid>

            <Grid item sm={12} md={12} sx={{ padding: 1 }}>
              <Qualities qualities={qualities} />
            </Grid>

            {drawbacks.length > 0 ? (
              <Grid item sm={12} md={12} sx={{ padding: 1 }}>
                <Drawbacks drawbacks={drawbacks} />
              </Grid>
            ) : (
              ""
            )}

            <Grid item sm={12} md={12} sx={{ padding: 1 }}>
              <Flairs flairs={flairs} />
            </Grid>

            <Grid item sm={12} md={12} sx={{ padding: 1 }}>
              {Object.keys(toxic).length > 0 ? <Toxic toxic={toxic} /> : ""}
            </Grid>
            {vul ? (
              <Grid item sm={12} md={12} sx={{ padding: 1 }}>
                <Card>
                  <CardHeader title={"Vulnerability:"} />
                  <CardContent>{vul}</CardContent>
                </Card>
              </Grid>
            ) : (
              ""
            )}
          </List>
        </Grid>
      </Container>
    </>
  );
}

export default Npc;
