const puppeteer = require('puppeteer');
const faker = require('faker');

describe('Testing Form Automation', () => {
  let browser;
  let page;
  before(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 0,
      defaultViewport: { width: 1920, height: 1080 },
      args: ['--start-maximized'],
    });
    page = await browser.newPage();
  });

  after(() => {
    browser.close();
  });

  it('Got To Starting Page', async () => {
    await page.goto('https://demoqa.com/automation-practice-form');
  });

  it('Enter Basic Info', async () => {
    await page.waitForSelector('.practice-form-wrapper');
    await page.type('#firstName', faker.name.firstName());
    await page.type('#lastName', faker.name.lastName());
    await page.type('#userEmail', faker.internet.email());
  });

  it('Select Gender', async () => {
    await page.waitForSelector('#gender-radio-1');
    await page.click('#gender-radio-1');
  });

  it('Enter Phone Number', async () => {
    await page.waitForSelector('#userNumber');
    await page.type('#userNumber', faker.phone.phoneNumber('##########'));
  });

  it('Select Date from datepicker', async () => {
    await page.click('#dateOfBirthInput');
    await page.waitForSelector('.react-datepicker__year-select');
    await page.select('.react-datepicker__year-select', '1984');
    await page.select('.react-datepicker__month-select', '6'); //Starts at 0
    await page.click('.react-datepicker__day--023');
  });

  it('Enter Subjects', async () => {
    await page.type('#subjectsInput', 'Maths', { delay: 1 });
    await page.keyboard.press('Tab');
    await page.type('#subjectsInput', 'Accounting', { delay: 1 });
    await page.keyboard.press('Tab');
  });

  it('Selecting Checkbox', async () => {
    await page.waitForSelector('#hobbies-checkbox-1');
    await page.click('#hobbies-checkbox-1');
    await page.click('#hobbies-checkbox-3');
  });

  // it('Upload File', async () => {
  //   //TODO
  // });

  it('Enter Address', async () => {
    await page.type('#currentAddress', faker.address.streetAddress());
  });

  it('State and City Dropdown', async () => {
    await page.click('#state');
    await page.waitForSelector('.css-1wa3eu0-placeholder');
    await page.type('.css-1wa3eu0-placeholder', 'NCR');
    await page.keyboard.press('Tab');
    await page.click('#city');
    await page.waitForSelector('.css-1uccc91-singleValue');
    await page.type('.css-1uccc91-singleValue', 'Delhi');
    await page.keyboard.press('Tab');
  });

  it('Submit and Screenshot', async () => {
    await page.click('#submit');
    await page.screenshot({ path: 'screen.png' });
  });
});
