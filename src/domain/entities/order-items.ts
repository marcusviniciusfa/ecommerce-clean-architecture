export default class OrderItem {
  constructor(
    readonly idItem: number,
    readonly price: number,
    readonly amount: number
  ) {}

  getTotal() {
    return this.price * this.amount;
  }
}
