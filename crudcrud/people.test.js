const fetch = require("node-fetch");

describe("CrudCrud: People", () => {
  it("can create a person", async () => {
    // создать фейковые данные
    const name = `${Math.random()}`;
    const age = Math.ceil(Math.random() * 100);
    // отправить запрос на создание с этим данными
    const body = JSON.stringify({
      name,
      age,
    });
    const createPersonRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
    const createResponse = await fetch(
      "https://crudcrud.com/api/e8d34148834e47c8b8eeb09ff6aba129/people",
      createPersonRequestOptions
    );
    const createResponseData = await createResponse.json();
    // проверить ответ от запроса (что там есть наши данные)
    expect(createResponseData).toEqual(
      expect.objectContaining({
        age,
        name,
        _id: expect.stringMatching(/\w+/),
      })
    );
    // отправить запрос на чтение созданной персоны
    const readPersonResponse = await fetch(
      `https://crudcrud.com/api/e8d34148834e47c8b8eeb09ff6aba129/people/${createResponseData._id}`
    );
    const readPersonResponseData = await readPersonResponse.json();
    // проверить ответ на данные, которые мы сгенерировали
    expect(readPersonResponseData).toEqual({
      age,
      name,
      _id: createResponseData._id,
    });
  });
});
