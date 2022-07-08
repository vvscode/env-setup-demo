import { createPerson, readPerson, updatePerson } from "./utils/crud";

function getRandomName(prefix = "") {
  return `${prefix}${Math.random()}`;
}

function randomNumber1to100() {
  return Math.ceil(Math.random() * 100);
}

describe("CrudCrud: People", () => {
  let name;
  let age;
  beforeEach(() => {
    name = getRandomName();
    age = randomNumber1to100();
  });
  it("can create a person", async () => {
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

  it("can update a person", async () => {
    const createResponseData = await createPerson({ age, name });

    const newName = getRandomName("new");
    await updatePerson(createResponseData._id, {
      ...createResponseData,
      name: newName,
    });

    const readPersonResponseData = await readPerson(createResponseData._id);
    expect(readPersonResponseData).toEqual({
      age,
      name: newName,
      _id: createResponseData._id,
    });
  });
});
