import Coupon from "./coupon";
import Cpf from "./cpf";
import Item from "./item";
import OrderItem from "./order-items";

export default class Order {
  cpf: Cpf;
  orderItems: OrderItem[];
  coupon?: Coupon;

  constructor(cpf: string) {
    this.cpf = new Cpf(cpf);
    this.orderItems = [];
  }

  addItem(item: Item, amount: number) {
    this.orderItems.push(new OrderItem(item.idItem, item.price, amount));
  }

  addCoupon(coupon: Coupon) {
    this.coupon = coupon;
  }

  getTotal() {
    let total = 0;
    for (const orderItem of this.orderItems) {
      total += orderItem.getTotal();
    }
    if (this.coupon) {
      total -= (total * this.coupon.percentage) / 100;
    }
    return total;
  }
}
