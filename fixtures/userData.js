import { generateRandomString, generateRandomNum } from "./utils";

export const generateUserCredentials = (length) => {
    const baseString = generateRandomString(length);
    const baseNumb = generateRandomNum(length);

    const username = baseString;
    const email = `${baseString}@mail.com`;
    const pass = `${baseString}1234`;
    const registeredUser = "Rale";
    const registeredEmail = "rale@gmail.com";
    const invalidEmail = `${baseNumb}@mail.com`;


    return {username, email, pass, registeredUser, registeredEmail, invalidEmail};
};