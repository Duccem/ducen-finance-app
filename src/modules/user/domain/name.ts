export const name_validator = (name: string) => {
  if (name.length > 50) return false;
  if (name.length < 1) return false;
  return true;
};

export class Name {
  constructor(public readonly value: string) {
    if (Name.Validate(value) === false) {
      throw new Error('Name is invalid');
    }
  }

  static Validate(name: string) {
    if (name.length > 50) return false;
    if (name.length < 1) return false;
    return true;
  }
}
