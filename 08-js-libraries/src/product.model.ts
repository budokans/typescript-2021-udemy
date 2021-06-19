export class Product {
  constructor(public name: string, public price: number) {}

  public getInformation() {
    return [this.name, `$${this.price}`];
  }
}
