import { generateRandomString, generateRandomNum } from "./utils";

export const generateUserCredentials = (length) => {
  const baseString = generateRandomString(length);
  const baseNumb = generateRandomNum(length);

  const username = baseString;
  const email = `${baseString}@mail.com`;
  const password = `${baseString}1234`;
  const registeredUser = "Rale13";
  const registeredEmail = "rale13@gmail.com";
  const invalidEmail = `${baseNumb}@mail.com`;

  return {
    username,
    email,
    password,
    registeredUser,
    registeredEmail,
    invalidEmail,
  };
};

export const VALID_LOGIN_PAYLOAD = {
  email: "rale13@gmail.com",
  password: "Test1234",
};

export const EMPTY_USERNAME_PAYLOAD = {
  email: generateUserCredentials(5).email,
  password: generateUserCredentials(5).password,
};

export const EMPTY_EMAIL_PAYLOAD = {
  username: generateUserCredentials(5).username,
  password: generateUserCredentials(5).password,
};

export const EMPTY_PASSWORD_PAYLOAD = {
  username: generateUserCredentials(5).username,
  email: generateUserCredentials(5).email,
};

export const REGISTERED_USER_PAYLOAD = {
  username: generateUserCredentials().registeredUser,
  email: generateUserCredentials(5).email,
  password: generateUserCredentials(5).password
};

export const REGISTERED_EMAIL_PAYLOAD = {
  username: generateUserCredentials(5).username,
  email: generateUserCredentials().registeredEmail,
  password: generateUserCredentials(5).password
}

export const INVALID_EMALI_PAYLOAD = {
  username: generateUserCredentials(5).username,
  email: generateUserCredentials(5).username,
  password: generateUserCredentials(5).password
}