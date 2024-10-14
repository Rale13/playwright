export const STATUS = {
  SUCCESS: "Success",
  UNAUTHORIZED: "Unauthorized",
};

export const ERROR_MESSAGE = {
  INVALID_EMAIL: "The email field must be a valid email address.",
  UNAUTHENTICATED: "Unauthenticated.",
  NO_CUSTOMER_FOUND: (id) => {
    return `No customer found with ID ${id} found`;
  },
};

export const ENDPOINTS = {
  REGISTER: "/api/v1/auth/register",
  LOGIN: "api/v1/auth/login"
}