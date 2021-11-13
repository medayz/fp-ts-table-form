import React, { useState } from "react";
import { render } from "react-dom";
import { Option, none, map, getOrElse } from "fp-ts/es6/Option";
import { flow, pipe } from "fp-ts/lib/function";
import { append, flip, curry } from "ramda";
import { Form } from "./Form";
import { Table } from "./Table";
import { User, UserValidation, extractUser } from "./user";
import { formSubmitHandler } from "./utils";

import "./styles.scss";

type TappendToUsers = (x: User[]) => (y: User) => User[];
const appendToUsers: TappendToUsers = curry(flip<User, User[], User[]>(append));
const addNewUser = (users: User[]) =>
  flow(
    map(extractUser),
    map(appendToUsers(users)),
    getOrElse(() => users)
  );

function App() {
  const [usersState, setUsersState] = useState<User[]>([]);
  const [formState, setFormState] = useState<Option<UserValidation>>(none);

  const handleAddUser = formSubmitHandler(() =>
    pipe(
      formState,
      addNewUser(usersState),
      (newUsers) => setUsersState(newUsers),
      () => setFormState(none)
    )
  );

  return (
    <div className="App">
      <Form
        state={formState}
        setState={setFormState}
        handleSubmit={handleAddUser}
      />
      <Table users={usersState} />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
