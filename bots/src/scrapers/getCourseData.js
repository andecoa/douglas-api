const { chromium } = require("playwright");

async function getCourseData(courseLink) {
  const browser = await chromium.launch({
    headless: process.env.NODE_ENV !== "DEV",
  });
  const page = await browser.newPage();
  await page.goto(courseLink);

  const items = await page.$$eval(".dataentrytable>tbody>tr", (rows) => ({
    crn: rows[1].lastElementChild.innerHTML,
    subject: rows[2].lastElementChild.innerHTML,
    title: rows[3].lastElementChild.innerHTML,
    credits: rows[4].querySelector("p").innerHTML,
    campus: rows[5].lastElementChild.innerHTML,
    description: rows[8].lastElementChild.innerHTML,
    instructor: rows[10].lastElementChild.innerHTML,
  }));

  const dates = await page.$$eval(
    ":nth-match(.dataentrytable,2)>tbody>tr",
    (rows) => {
      const out = [];
      for (let i = 1; i < rows.length; i += 1) {
        const tds = rows[i].querySelectorAll("td");
        out.push({
          meetingDate: tds[0].innerHTML,
          days: tds[1].innerHTML,
          time: tds[2].innerHTML,
        });
      }
      return out;
    }
  );
  const enrolments = await page.$$eval(
    ":nth-match(.dataentrytable,3)>tbody>tr",
    (rows) => ({
      maximum: rows[0].lastElementChild.innerHTML,
      enrolled: rows[1].lastElementChild.innerHTML,
      remaining: rows[2].lastElementChild.innerHTML,
      waitlist: rows[3].lastElementChild.innerHTML,
    })
  );

  const formattedData = {
    crn: Number(items.crn),
    subject: items.subject,
    title: items.title,
    credits: Number(items.credits),
    campus: items.campus,
    description: items.description,
    instructor: items.instructor,
    dates,
    maximum: Number(enrolments.maximum),
    enrolled: Number(enrolments.enrolled),
    remaining: Number(enrolments.remaining),
    waitlist: Number(enrolments.waitlist),
  };

  browser.close();
  return formattedData;
}

module.exports = getCourseData;
