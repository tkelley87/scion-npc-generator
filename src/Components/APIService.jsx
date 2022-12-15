export default async function APIService(body) {
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
    return console.log(error);
  }
}
