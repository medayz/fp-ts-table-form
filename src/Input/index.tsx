import React, { FormEvent, CSSProperties } from "react";
import { Option, map, getOrElse } from "fp-ts/es6/Option";
import { prop } from "ramda";
import { flow } from "fp-ts/lib/function";
import { fold } from "fp-ts/es6/Either";
import { ErrorsList } from "./ErrorsList";
import { BLError, ValidationResult } from "../rules";

const getStyle: (
  currentState: Option<ValidationResult<string>>
) => Partial<CSSProperties> = flow(
  map(
    flow(
      prop("result"),
      fold(
        () => ({ borderColor: "red" }),
        () => ({ borderColor: "transparent" })
      )
    )
  ),
  getOrElse(() => ({ borderColor: "transparent" }))
);

const renderErrors: (x: ValidationResult<string>) => JSX.Element = flow(
  prop("result"),
  fold(
    (errors: BLError) => <ErrorsList errors={errors} />,
    () => <span />
  )
);

const mapInputValue: (x: Option<ValidationResult<string>>) => string = flow(
  map(prop("input")),
  getOrElse(() => "")
);

export const mapInputErrors: (
  x: Option<ValidationResult<string>>
) => JSX.Element = flow(
  map(renderErrors),
  getOrElse(() => <div />)
);

interface InputProps {
  state: Option<ValidationResult<string>>;
  onUpdate: (e: FormEvent<HTMLInputElement>) => void;
  id: string;
  label: string;
}

export const Input = ({ id, label, state, onUpdate }: InputProps) => {
  const inputValue = mapInputValue(state);
  const errors = mapInputErrors(state);
  const inputStyle = getStyle(state);

  return (
    <div className="input-wrapper" style={inputStyle}>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        name={id}
        id={id}
        onChange={onUpdate}
        value={inputValue}
      />
      {errors}
    </div>
  );
};
