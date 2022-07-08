const fetch = require("node-fetch");

const BASE_URL = "https://crudcrud.com/api/e8d34148834e47c8b8eeb09ff6aba129";

async function fetchJSON(url, ...args) {
  const response = await fetch(`${BASE_URL}${url}`, ...args);
  return response.json();
}

function createPerson(data) {
  return fetchJSON(`/people`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function readPerson(id) {
  return fetchJSON(`/people/${id}`);
}

describe("CrudCrud: People", () => {
  it("can create a person", async () => {
    const name = `${Math.random()}`;
    const age = Math.ceil(Math.random() * 100);

    const createResponseData = await createPerson({ age, name });
    expect(createResponseData).toEqual(
      expect.objectContaining({
        age,
        name,
        _id: expect.stringMatching(/\w+/),
      })
    );

    const readPersonResponseData = readPerson(createResponseData._id);
    expect(readPersonResponseData).toEqual({
      age,
      name,
      _id: createResponseData._id,
    });
  });
});
