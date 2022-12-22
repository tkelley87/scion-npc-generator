import { useEffect, useState } from "react";
// Component imports
import { getNpcById } from "./APIService";
import Npc from "./Npc";

const NpcTable = (props) => {
  const [npc, setNpc] = useState([]);

  useEffect(() => {
    const getNpc = async () => {
      try {
        const npcChar = await getNpcById(props.currentNpc);
        console.log(npcChar.data);
        setNpc(npcChar.data);
      } catch (error) {
        console.log(`Sorry, we couldn't get your npc.`, error);
      }
    };
    getNpc();
  }, [props.currentNpc]);

  if (!props.currentNpc) return "Waiting for Npc";

  return (
    <>
      {npc ? <Npc npc={npc} /> : ""}
      {/* <Npc npc={npc} /> */}
      {/* <List>
        {npc.map((char, idx) => (
          <ListItem key={idx}>
            <ListItemText>Apart of Cult?: </ListItemText>
            <ListItemText>{char.apart_of_cult}</ListItemText>
            <ListItemText>Attitude Towards the Player: </ListItemText>
            <ListItemText>{char.attitude_towards_player}</ListItemText>
            <ListItemText>Drive: </ListItemText>
            <ListItemText>{char.drive}</ListItemText>
            <ListItemText>Gender: </ListItemText>
            <ListItemText>{char.gender}</ListItemText>
            <ListItemText>Name: </ListItemText>
            <ListItemText>{char.name}</ListItemText>
            <ListItemText>Pantheon: </ListItemText>
            <ListItemText>{char.pantheon}</ListItemText>
            <ListItemText>Qualities: </ListItemText>
            <ListItemText>{char.qualities}</ListItemText>

            {Object.keys(char.qualities).map((key, i) => (
              <>
                <ListItemText>{key}</ListItemText>
                <ListItemText>{char?.qualities[key]}</ListItemText>
              </>
            ))}

            <ListItemText>{JSON.stringify(char.qualities)}</ListItemText>

            <ListItemText>Stats: </ListItemText>
            <ListItemText>{char.stats}</ListItemText>
            <ListItemText>Traits: </ListItemText>
            <ListItemText>{char.traits}</ListItemText>
          </ListItem>
        ))}
      </List> */}
    </>
  );
};

export default NpcTable;
