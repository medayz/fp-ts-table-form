import { left, right, isLeft, Either } from "fp-ts/es6/Either";
import { BLError, validate } from "../rules";
import { some, Option } from "fp-ts/es6/Option";
import * as String from "fp-ts/string";
import { userRules, UserValidation } from "../user";
import { flow } from "fp-ts/es6/function";
import { pick, propSatisfies } from "ramda";

export type FormField = {
  name: keyof UserValidation;
  value: string;
  errors: BLError;
};

const initialValidationValue = {
  firstName: { input: "", result: right("") },
  lastName: { input: "", result: right("") }
};

export const initializeFormFields = () =>
  some({
    ...initialValidationValue
  });

export const initFormFields = ({
  name,
  value,
  errors
}: FormField): Option<UserValidation> =>
  some({
    ...initialValidationValue,
    [name]: {
      input: value,
      result: errors.length ? left(errors) : right(value)
    }
  });

export const appendFormField = ({
  oldFields,
  name,
  value,
  errors
}: FormField & { oldFields: UserValidation }): Option<UserValidation> =>
  some({
    ...oldFields,
    [name]: {
      input: value,
      result: errors.length ? left(errors) : right(value)
    }
  });

export const extractFieldFromInput: (
  input: HTMLInputElement
) => FormField = flow(
  pick(["name", "value"]) as () => FormField,
  ({ name, value }) => ({
    name,
    value,
    errors: validate(userRules[name], value)
  })
);

type TmaybeError = Either<BLError, string>;

export const isPropEmptyString = propSatisfies(String.isEmpty);
export const isPropLeft = propSatisfies<TmaybeError, any>(isLeft);
