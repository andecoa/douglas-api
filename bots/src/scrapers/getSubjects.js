const { chromium } = require("playwright");

async function getSubjects() {
  const browser = await chromium.launch({
    headless: process.env.NODE_ENV !== "DEV",
  });

  const page = await browser.newPage();

  await page.goto(
    "https://banserv2.douglas.bc.ca/prod/bwysched.p_select_term?wsea_code=CRED"
  );
  // this is for the current subjects
  await page.click("text=Continue");
  const subjects = await page.$$eval(
    "#subj_id>option:not([value=''])",
    (options) => options.map((el) => el.value)
  );
  await browser.close();
  return subjects;
}

module.exports = getSubjects;
