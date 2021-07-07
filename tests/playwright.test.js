const { firefox } = require('playwright');
const faker = require('faker');

describe('Testing Form Automation', () => {
  let browser;
  let page;
  let context;
  before(async () => {
    browser = await firefox.launch({
      headless: false,
      slowMo: 0,
      // defaultViewport: { width: 1920, height: 1080 },
      // args: ['--start-maximized'],
    });
    context = await browser.newContext();
    page = await context.newPage();
  });

  after(async () => {
    await page.waitForTimeout(3000);
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
    // await page.waitForSelector('#gender-radio-1');
    await page.click('#gender-radio-1', { force: true });
  });

  it('Enter Phone Number', async () => {
    await page.waitForSelector('#userNumber');
    await page.type('#userNumber', faker.phone.phoneNumber('##########'));
  });

  it('Select Date from datepicker', async () => {
    await page.click('#dateOfBirthInput');
    await page.waitForSelector('.react-datepicker__year-select');
    await page.selectOption('.react-datepicker__year-select', '1984');
    await page.selectOption('.react-datepicker__month-select', '6'); //Starts at 0
    await page.waitForSelector('.react-datepicker__day--018');
    await page.click('.react-datepicker__day--018');
  });

  // it('Enter Subjects', async () => {
  //   await page.type('#subjectsInput', 'Maths');
  //   await page.keyboard.press('Tab');
  //   await page.waitForTimeout(1000);
  //   await page.type('#subjectsInput', 'Accounting');
  //   await page.waitForTimeout(1000);
  //   await page.keyboard.press('Tab');
  // });

  // it('Selecting Checkbox', async () => {
  //   await page.waitForSelector('#hobbies-checkbox-1');
  //   await page.click('#hobbies-checkbox-1');
  //   await page.click('#hobbies-checkbox-3');
  // });

  // it('Upload File', async () => {
  //   const [fileChooser] = await Promise.all([page.waitForFileChooser(), page.click('#uploadPicture')]);
  //   await fileChooser.accept('./upload.txt');
  // });

  // it('Enter Address', async () => {
  //   await page.waitForSelector('#currentAddress');
  //   await page.type('#currentAddress', faker.address.streetAddress());
  // });
});
