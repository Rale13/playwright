import { generateRandomString, generateRandomNum } from "./utils";

export const generateUserCredentials = (length) => {
    const baseString = generateRandomString(length);
    const baseNumb = generateRandomNum(length);

    const username = baseString;
    const email = `${baseString}@mail.com`;
    const pass = `${baseString}1234`;
    const registeredUser = "Rale13";
    const registeredEmail = "rale13@gmail.com";
    const registeredPass = "Test1234"
    const invalidEmail = `${baseNumb}@mail.com`;


    return {username, email, pass, registeredUser, registeredEmail, registeredPass, invalidEmail};
};