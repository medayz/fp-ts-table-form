import React, { FormEvent, Dispatch, SetStateAction } from "react";
import * as Record from "fp-ts/es6/Record";
import { Input } from "../Input/index";
import { Option, map, getOrElse, fold } from "fp-ts/es6/Option";
import { pipe } from "fp-ts/es6/pipeable";
import { flow } from "fp-ts/es6/function";
import { UserValidation } from "../user";
import {
  appendFormField,
  extractFieldFromInput,
  FormField,
  initFormFields,
  isPropEmptyString,
  isPropLeft
} from "./utils";
import { anyPass, Pred, prop } from "ramda";

interface FormProps {
  state: Option<UserValidation>;
  setState: Dispatch<SetStateAction<Option<UserValidation>>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const getNewFormState = flow(extractFieldFromInput, (field: FormField) =>
  fold(
    () => initFormFields(field),
    (oldFields: UserValidation) => appendFormField({ oldFields, ...field })
  )
);

const getDisabledState: (
  currentState: Option<UserValidation>
) => boolean = flow(
  map(
    Record.some(
      anyPass([
        isPropEmptyString("input") as Pred,
        isPropLeft("result") as Pred
      ])
    )
  ),
  getOrElse<boolean>(() => true)
);

export const Form = ({ state, setState, handleSubmit }: FormProps) => {
  const isButtonDisabled = getDisabledState(state);
  const firstNameValue = pipe(state, map(prop("firstName")));
  const lastNameValue = pipe(state, map(prop("lastName")));

  const updateFields = (e: FormEvent<HTMLInputElement>) =>
    pipe(state, getNewFormState(e.target as HTMLInputElement), setState);

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="firstName"
        label="First Name"
        state={firstNameValue}
        onUpdate={updateFields}
      />
      <Input
        id="lastName"
        label="Last Name"
        state={lastNameValue}
        onUpdate={updateFields}
      />
      <button type="submit" disabled={isButtonDisabled}>
        Save User
      </button>
    </form>
  );
};
