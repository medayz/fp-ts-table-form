import {
  ValidationResult,
  Rules,
  required,
  minLength,
  maxLength
} from "./rules";

export interface User {
  firstName: string;
  lastName: string;
}

export const extractUser = (user: UserValidation): User => ({
  firstName: user.firstName.input,
  lastName: user.lastName.input
});

export type UserValidation = { [P in keyof User]: ValidationResult<string> };
export const userRules: { [P in keyof User]: Rules } = {
  firstName: {
    field: "First Name",
    rules: [required, minLength(2), maxLength(50)]
  },
  lastName: {
    field: "Last Name",
    rules: [required, minLength(2), maxLength(50)]
  }
};
