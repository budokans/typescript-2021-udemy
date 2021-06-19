import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class Product {
  @IsNotEmpty() public name: string;
  @IsNumber() @IsPositive() public price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  public getInformation() {
    return [this.name, `$${this.price}`];
  }
}
