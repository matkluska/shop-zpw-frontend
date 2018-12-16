import {Product} from './product';

export class Order {
  constructor(public id: string, readonly email: string, readonly firstName: string, readonly lastName: string, readonly city: string,
              readonly street: string, readonly postalCode: string, readonly products: Product[], public totalValue: number = 0,
              public state: OrderState = OrderState.WAITING, public shippingTime: number = null) {
  }
}

export enum OrderState {
  WAITING = 'Waiting',
  IN_REALIZATION = 'In realization',
  SHIPPED = 'Shipped'
}
