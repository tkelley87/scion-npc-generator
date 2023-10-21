// import {character_test_relic, character_test_relic_dom, character_test_sorc_dom} from "../testing/char"; // Un-comment this out to use test character.

async function postBody(body) {
  try {
    const response = await fetch(`/api/form`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error) {
    return {"msg": "We had an error getting data", "error": error};
  }
}

async function getNpcById(id) {
  try {

    const response = await fetch(`/api/npc/${id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data)
    return { data: data };
    // return { data: <CHOOSE CHAR FROM ABOVE IMPORT> }; // Comment out response to the data return to use test char.
  } catch (error) {
    return console.log(error);
  }
}

export { postBody, getNpcById };
