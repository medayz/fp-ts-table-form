import React from "react";
import { User } from "./user";

type TableProps = {
  users: User[];
};

export const Table = ({ users }: TableProps) => (
  <table className="table">
    <thead>
      <tr>
        <th>First name</th>
        <th>Last name</th>
      </tr>
    </thead>
    <tbody>
      {users.map((u, idx) => (
        <tr key={idx}>
          <td>{u.firstName}</td>
          <td>{u.lastName}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
