export class Product {
  constructor(readonly id: string, public name: string, public products_quantity: number, public price: number, public description: string,
              public photo_url: string, public category: string) {
  }
}
