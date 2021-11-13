import { Either } from "fp-ts/es6/Either";

export type BLError = string[];

export interface ValidationResult<A> {
  input: A;
  result: Either<BLError, A>;
}

export interface Rules {
  field: string;
  rules: Rule[];
}

export const validate = (rs: Rules, value: string) => 
  rs.rules.reduce((e: BLError, r: Rule) => {
    const rule = r(rs.field);
    return rule.test(value) ? e : e.concat([rule.message]);
  }, [])

export type Rule = (field: string) => {
  test: (value: string) => boolean;
  message: string;
}

export const required: Rule = (field: string) => ({
  test: (value: string) => value.trim() !== "",
  message: `${field} is required`
});
export const minLength = (l: number): Rule => (field: string) => ({
  test: (value: string) => value.trim().length >= l,
  message: `${field} has a minimum length of ${l}.`
});
export const maxLength = (l: number): Rule => (field: string) => ({
  test: (value: string) => value.trim().length <= l,
  message: `${field} has a maximum length of ${l}.`
});
