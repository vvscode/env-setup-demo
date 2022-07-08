import { createPerson, readPerson } from "./utils/crud";

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

    const readPersonResponseData = await readPerson(createResponseData._id);
    expect(readPersonResponseData).toEqual({
      age,
      name,
      _id: createResponseData._id,
    });
  });
});
