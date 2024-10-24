const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

const generateRandomNum = (length) => {
  const characters = "0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

const generateRandomNumber = (max) => {
  return Math.floor(Math.random() * (max - 1) + 1);

};

const fillAndSubmitForm = async (page, fields, values) => {
  for (let i = 0; i < fields.length; i++) {
    await page.locator(fields[i]).fill(values[i]);
  }

  await page.locator("button").click();
};

const iterateThroughElements = async (locator, actionCallback) => {
  const count = await locator.count();
  const results = [];
  for (let i = 0; i < count; i++) {
    const element = locator.nth(i);
    const result = await actionCallback(element);
    results.push(result);
  }

  return results;
}


export {
  generateRandomString,
  generateRandomNum,
  fillAndSubmitForm,
  iterateThroughElements,
  generateRandomNumber,
};

