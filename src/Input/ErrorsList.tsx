import { BLError } from "../rules";

export const ErrorsList = ({ errors }: { errors: BLError }) => (
  <div style={{ marginLeft: "1rem", color: "red" }}>
    {errors.map((msg, idx) => (
      <div key={idx}>{msg}</div>
    ))}
  </div>
);
