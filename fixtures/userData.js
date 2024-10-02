import { generateRandomString, generateRandomNumb } from "./utils";

export const generateUserCredentials = (length) => {
    const baseString = generateRandomString(length);
    const baseNumb = generateRandomNumb(length);

    const username = baseString;
    const email = `${baseString}@mail.com`;
    const pass = `${baseString}1234`;
    const registerdUser = "Rale";
    const registerdEmail = "rale@gmail.com";
    const invalidEmail = `${baseNumb}@mail.com`;


    return {username, email, pass, registerdUser, registerdEmail, invalidEmail};
};