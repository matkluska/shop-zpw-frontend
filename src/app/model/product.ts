export class Product {
  constructor(public id: string, public name: string, public products_quantity: number, public price: number,
              public description: string, public photo_url: string, public category: string,
              public is_ready: boolean = false, public discount_percent: number = 0, public discount_end_time: number = 0) {
  }
}
