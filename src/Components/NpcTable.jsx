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
        setNpc(npcChar.data);
      } catch (error) {
        console.log(`Sorry, we couldn't get your npc.`, error);
      }
    };
    if (props.currentNpc) {
      getNpc();
    }
  }, [props.currentNpc]);

  if (!props.currentNpc) return "";

  return <>{npc ? <Npc npc={npc} /> : ""}</>;
};

export default NpcTable;
