import { generateRandomString } from "./utils";

export const generateUserCredentials = (length) => {
    const baseString = generateRandomString(length);

    const username = baseString;
    const email = `${baseString}@mail.com`;
    const pass = `${baseString}1234`;
    const registerdUser = "Rale";
    const registerdEmail = "rale@gmail.com";


    return {username, email, pass, registerdUser, registerdEmail};
};