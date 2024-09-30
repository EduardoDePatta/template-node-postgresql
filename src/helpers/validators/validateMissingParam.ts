import { MissingParamError } from "../../exceptions"

export function validateMissingParam <T> (param: T, keys: Array<keyof T>): void {
  for (const key of keys) {
    if (param[key] === undefined || param[key] === null) {
      throw new MissingParamError(String(key))
    }
  }
}
