import {Product} from './product';

export class Order {
  constructor(public id: string, readonly userId: string, readonly firstName: string, readonly lastName: string, readonly city: string,
              readonly street: string, readonly postalCode: string, readonly products: Product[]) {
  }
}
