import { FormEvent } from "react";

type Thandler = (e: FormEvent<HTMLFormElement>) => void;

export const formSubmitHandler = (handler: Thandler) => (
  e: FormEvent<HTMLFormElement>
) => {
  e.preventDefault();
  handler(e);
};
