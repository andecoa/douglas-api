const getCourseLinks = require("../../src/scrapers/getCourseLinks");

const COURSE_LINK = "ACCT";
let courseLinks;

beforeAll(async () => {
  courseLinks = await getCourseLinks(COURSE_LINK);
});

it("should be a list of unique course links", () => {
  const isArrUnique = (arr) =>
    Array.isArray(arr) && new Set(arr).size === arr.length;
  expect(isArrUnique(courseLinks)).toBeTruthy();
});

it("should be a list of URLs", () => {
  const isEachElemUrl = courseLinks.every((courseLink) =>
    courseLink.match(/\b(https?:\/\/\S*\b)/g)
  );
  expect(isEachElemUrl).toBeTruthy();
});
