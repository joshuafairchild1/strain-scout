export class Strain {
  constructor(
    public name: string,
    public ucpc: string,
    public image: string,
    public genetics: object,
    public geography: object
  ) {}
}
