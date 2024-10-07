import { generateRandomString, generateRandomNum } from "./utils";

export const generateUserCredentials = (length) => {
  const baseString = generateRandomString(length);
  const baseNumb = generateRandomNum(length);

  const username = baseString;
  const email = `${baseString}@mail.com`;
  const password = `${baseString}1234`;
  const registeredUser = "Rale";
  const registeredEmail = "rale@gmail.com";
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

export const VALID_REGISTER_PAYLOAD = {
  username: "Trale12",
  email: "elar1@gmail.com",
  password: "Test1234"
}
