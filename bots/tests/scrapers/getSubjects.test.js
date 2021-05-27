const getSubjects = require("../../src/scrapers/getSubjects");

let subjects;

beforeAll(async () => {
  subjects = await getSubjects();
});

it("should get the list of unique available subjects", () => {
  const isArrUnique = (arr) =>
    Array.isArray(arr) && new Set(arr).size === arr.length;
  expect(isArrUnique(subjects)).toBeTruthy();
});

it("should only have elements with 4 characters each", () => {
  const isEachElemFourChars = subjects.every((subject) => subject.length === 4);
  expect(isEachElemFourChars).toBeTruthy();
});
