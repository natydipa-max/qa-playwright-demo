import { User } from "../../types/User";

export const USERS: Record<string, User> = {
  STANDARD: {
    username: "standard_user",
    password: "secret_sauce",
  },

  LOCKED: {
    username: "locked_out_user",
    password: "secret_sauce",
  },

  INVALID: {
    username: "invalid_user",
    password: "invalid_password",
  },
};
