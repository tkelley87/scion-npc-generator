import character_test from "../testing/char";

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
    return { data: data };
    // return { data: character_test }; // Comment out response to the data return to use test char.
  } catch (error) {
    return console.log(error);
  }
}

export { postBody, getNpcById };
