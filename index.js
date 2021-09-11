const puppeteer = require('puppeteer');
require('dotenv').config();

const url = process.env.URL;
const username = process.env.HS_USERNAME;
const password = process.env.HS_PASSWORD;

(async () => {
  //Launch
  const browser = await puppeteer.launch({ 
    headless: false, 
  });

  const page = await browser.newPage();
  await page.goto(url);
  await Promise.all([
    page.click('a.sso-button'),
    page.waitForNavigation({waitUntil: 'domcontentloaded'}),
  ]);

  // Login
  await page.type('#identifier', username);
  await page.type('#password', password);

  await Promise.all([
    page.click('button'),
    page.waitForNavigation({waitUntil: 'networkidle0'}),
    page.waitForNavigation({waitUntil: 'domcontentloaded'})
  ]);

  // await browser.close();
})();

