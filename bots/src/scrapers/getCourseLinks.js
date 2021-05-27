const { chromium } = require("playwright");

async function getCourseLinks(subject) {
  // open browser
  const browser = await chromium.launch({
    headless: process.env.NODE_ENV !== "DEV",
  });
  const page = await browser.newPage();

  // load subject course results
  await page.goto(
    "https://banserv2.douglas.bc.ca/prod/bwysched.p_select_term?wsea_code=CRED"
  );
  await page.click("text=Continue");
  await page.click(`option[value=${subject}]`);
  await page.click(`input[type=submit]`);

  // get course links (note: the markup is really weird and I'm not sure if it will change in the future)
  const courseLinks = await page.$$eval(
    ":nth-match(table, 4)>tbody>tr>td>a",
    (rows) =>
      rows.reduce((acc, el) => {
        if (!acc.includes(el.href)) acc.push(el.href);
        return acc;
      }, [])
  );
  await browser.close();
  return courseLinks;
}

module.exports = getCourseLinks;
