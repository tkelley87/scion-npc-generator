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
        // const npcChar = await getNpcById("5546fdbb6f674d32aec7657e835c88ae");
        setNpc(npcChar.data);
        // console.log(`This is char => `, npc)
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
