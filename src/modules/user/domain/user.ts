export class User {
  constructor(
    public readonly email: string,
    public readonly name: string,
    public readonly password: string,
    public readonly externalId: string,
    public readonly id: string,
  ) {}

  toPrimitives() {
    return {
      email: this.email,
      name: this.name,
      password: this.password,
      externalId: this.externalId,
      id: this.id,
    };
  }
}
