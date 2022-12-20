import { useEffect, useState } from "react";
// Component imports
import { getNpcById } from "./APIService";

const NpcTable = (props) => {
  const [npc, setNpc] = useState(null);
  useEffect(() => {
    const fetchData = async (id) => {
      const data = await getNpcById(id);
      return data;
    };

    fetchData(props.currentNpc)
      .then((res) => {
        setNpc(res.data.npc);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.currentNpc]);

  if (!props.currentNpc) return "Waiting for Npc";
  return (
    <>
      {npc ? (
        <>
          {npc.map((npc, idx) => {
            return (
              <>
                <p key={idx}>{ npc.npc.name }</p>
              </>
            )
          })}
        </>
      ) : (
        <p>""</p>
      )}
    </>
  );
};

export default NpcTable;
