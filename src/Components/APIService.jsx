/**
 * TODO - This will be changed from a class to a function
 */

export default class APIService {
  // Insert an form
  static async InsertForm(body) {
    try {
      const response = await fetch(`/form`, {
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
}
