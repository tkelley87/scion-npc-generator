// import { useEffect, useState } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";

function Npc(props) {
  // State
  const [char, setChar] = useState({});
  const [quals, setQuals] = useState([]);
  const [status, setStatus] = useState([]);

  const jsonDOM = (json) => {
    console.log(`what is json =>`, json);
    return Object.keys(json).map((key) => {
      return Object.keys(json[key]).map((child) => {
        return (
          <>
            <ListItemText>{child}</ListItemText>
            <ListItemText>{json[key][child]}</ListItemText>
          </>
        );
      });
    });
  };
  useEffect(() => {
    if (props.npc) {
      setChar(props.npc);
      setStatus(char.stats);
    }
    if (char) {
      console.log(`What is this stats => `, char.stats);
      for (let key in char.qualities) {
        console.log(`This is key: ${key}`);
        console.log(`This is value: ${JSON.stringify(char.qualities[key])}`);
        setQuals([key, JSON.stringify(char.qualities[key])]);
        console.log(`quals => `, quals);
      }
    }
  }, [props.npc, char.qualities]);

  useEffect(() => {
    if (status) {
    //   jsonDOM(status);
        console.log((status))
    }
  }, [status]);

  if (!props.npc) return "Loading into the Matrix";

  return (
    <>
      <List>
        <ListItemText>Apart of Cult?: {char.apart_of_cult}</ListItemText>
        <ListItemText>
          Attitude Towards Player: {char.attitude_towards_player}
        </ListItemText>
        <ListItemText>Drive: {char.drive}</ListItemText>
        <ListItemText>Gender: {char.gender}</ListItemText>
        <ListItemText>Name: {char.name}</ListItemText>
        <ListItemText>Pantheon: {char.pantheon}</ListItemText>
        <ListItemText>
          Qualities: {quals[0]} {quals[1]}
        </ListItemText>
        <ListItem></ListItem>

        <ListItemText>Stats: {}</ListItemText>
      </List>
    </>
  );
}

export default Npc;
