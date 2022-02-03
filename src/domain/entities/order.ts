import Coupon from "./coupon";
import Cpf from "./cpf";
import DefaultFreightCalculator from "./default-freight-calculate";
import FreightCalculator from "./freight-calculator";
import Item from "./item";
import OrderItem from "./order-items";

export default class Order {
  cpf: Cpf;
  private orderItems: OrderItem[];
  coupon?: Coupon;
  private freight: number;

  constructor(
    cpf: string,
    readonly date: Date = new Date(),
    readonly freightCalculator: FreightCalculator = new DefaultFreightCalculator()
  ) {
    this.cpf = new Cpf(cpf);
    this.orderItems = [];
    this.freight = 0;
  }

  addItem(item: Item, amount: number) {
    this.freight += this.freightCalculator.calculate(item) * amount
    this.orderItems.push(new OrderItem(item.idItem, item.price, amount));
  }

  addCoupon(coupon: Coupon) {
    if (coupon.isExpired(this.date)) return;
    this.coupon = coupon;
  }

  getTotal() {
    let total = 0;
    for (const orderItem of this.orderItems) {
      total += orderItem.getTotal()
    }
    if (this.coupon) {
      total -= this.coupon.calculateDiscount(total, this.date);
    }
    return total + this.getFreight();
  }

  getFreight() {
    return this.freight
  }
}
