export class User {
  constructor(
    public readonly email: string,
    public readonly name: string,
    public readonly externalId: string,
    public readonly id: string,
  ) {}

  toPrimitives() {
    return {
      email: this.email,
      name: this.name,
      externalId: this.externalId,
      id: this.id,
    };
  }
}
