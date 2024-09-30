import { generateRandomString } from "./utils";

export const generateUserCredentials = (length) => {
    const baseString = generateRandomString(length);

    const username = baseString;
    const email = `${baseString}@mail.com`;
    const pass = `${baseString}1234`;

    return {username, email, pass};
};