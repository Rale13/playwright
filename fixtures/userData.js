import { generateRandomString, generateRandomNum } from "./utils";

export const generateUserCredentials = (length) => {
  const baseString = generateRandomString(length);
  const baseNumb = generateRandomNum(length);

  const username = baseString;
  const email = `${baseString}@mail.com`;
  const password = `${baseString}1234`;
  const registeredUser = "Rale13";
  const registeredEmail = "rale13@gmail.com";
  const registeredPassword = "Test1234"
  const invalidEmail = `${baseNumb}@mail.com`;

  return {
    username,
    email,
    password,
    registeredUser,
    registeredEmail,
    registeredPassword,
    invalidEmail,
  };
};

export const REGISTER_EMPTY_USERNAME = {
  email: generateUserCredentials(5).email,
  password: generateUserCredentials(5).password,
};

export const REGISTER_EMPTY_EMAIL = {
  username: generateUserCredentials(5).username,
  password: generateUserCredentials(5).password,
};

export const REGISTER_EMPTY_PASSWORD = {
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

export const VALID_LOGIN_PAYLOAD = {
  email: generateUserCredentials().registeredEmail,
  password: generateUserCredentials().registeredPassword,
};

export const LOGIN_EMPTY_EMAIL = {
  password: generateUserCredentials().registeredPassword
}

export const LOGIN_EMPTY_PASSWORD = {
  email: generateUserCredentials().registeredEmail
}

export const LOGIN_INVALID_EMAIL = {
  email: generateUserCredentials(5).invalidEmail,
  password: generateUserCredentials().registeredPassword
}

export const LOGIN_INVALID_PASSWORD = {
  email: generateUserCredentials().registeredEmail,
  password: generateUserCredentials(5).username
}

export const LOGIN_INVALID_EMAIL_FORMAT = {
  email: generateUserCredentials(5).username,
  password: generateUserCredentials().registeredPassword
}
