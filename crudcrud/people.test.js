const fetch = require("node-fetch");

const BASE_URL = "https://crudcrud.com/api/e8d34148834e47c8b8eeb09ff6aba129";

async function fetchJSON(url, ...args) {
  const response = await fetch(`${BASE_URL}${url}`, ...args);
  return response.json();
}

describe("CrudCrud: People", () => {
  it("can create a person", async () => {
    // создать фейковые данные
    const name = `${Math.random()}`;
    const age = Math.ceil(Math.random() * 100);
    // отправить запрос на создание с этим данными
    const createResponseData = await fetchJSON(`/people`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        age,
      }),
    });
    // проверить ответ от запроса (что там есть наши данные)
    expect(createResponseData).toEqual(
      expect.objectContaining({
        age,
        name,
        _id: expect.stringMatching(/\w+/),
      })
    );
    // отправить запрос на чтение созданной персоны
    const readPersonResponseData = await fetchJSON(
      `/people/${createResponseData._id}`
    );
    // проверить ответ на данные, которые мы сгенерировали
    expect(readPersonResponseData).toEqual({
      age,
      name,
      _id: createResponseData._id,
    });
  });
});
