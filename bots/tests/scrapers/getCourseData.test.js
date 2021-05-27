const getCourseData = require("../../src/scrapers/getCourseData");

const COURSE_DATA_URL =
  "https://banserv2.douglas.bc.ca/prod/bwysched.p_display_course?wsea_code=CRED&term_code=202120&session_id=7151700&crn=22002";
let courseData;

beforeAll(async () => {
  courseData = await getCourseData(COURSE_DATA_URL);
});

it("should follow course data shape", () => {
  expect(courseData).toEqual(
    expect.objectContaining({
      crn: expect.any(Number),
      subject: expect.any(String),
      title: expect.any(String),
      credits: expect.any(Number),
      campus: expect.any(String),
      description: expect.any(String),
      instructor: expect.any(String),
      dates: expect.any(Array),
      maximum: expect.any(Number),
      enrolled: expect.any(Number),
      remaining: expect.any(Number),
      waitlist: expect.any(Number),
    })
  );
});
