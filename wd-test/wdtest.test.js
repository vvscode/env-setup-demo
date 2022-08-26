const { remote } = require("webdriverio");

function sleep(x) {
  return new Promise((resolve) => setTimeout(resolve, x));
}

jest.setTimeout(30000);

describe('List of paragraphs', () => {
  let browser;
  let input;
  let button;
  // beforeAll(async () => {});

  beforeEach(async () => {
    browser = await remote({
      capabilities: {
        browserName: 'chrome',
      },
    });
    await browser.url('https://xvjhzt.csb.app/');
    await browser.$('input').waitForExist({
      timeout: 5000,
    });
    input = await browser.$('input');
    button = await browser.$('button');
  });
  afterEach(async () => {
    await browser.deleteSession();
    await sleep(1000);
  });

  async function isInputVisible() {
    return await input.isDisplayed();
  }

  async function getParagraphs() {
    const pList = await browser.$$('p');
    const pListText = await Promise.all(pList.map((p) => p.getText()));
    return pListText;
  }

  async function type(str) {
    return await input.setValue(str);
  }

  async function clickButton() {
    return await button.click();
  }

  async function isButtonHidden() {
    return !(await button.isDisplayed());
  }

  async function getInputValue() {
    return await input.getValue();
  }

  it('renders 3 paragraphs and input', async () => {
    expect(await getParagraphs()).toEqual(['1', '2', '3']);
    expect(await isInputVisible()).toBe(true);
  });

  it('adds new paragraph on button click', async () => {
    await type('123');

    await clickButton();

    expect((await getParagraphs()).length).toBe(4);

    expect((await getParagraphs())[0]).toBe('123');

    expect(await isButtonHidden()).toBe(true);
    expect(await getInputValue()).toBe('');
  });
});
