import Item from "../../domain/entities/item";
import Order from "../../domain/entities/order";
import CouponRepository from "../../domain/repositories/coupon-repository";
import ItemRepository from "../../domain/repositories/item-repository";
import OrderRepository from "../../domain/repositories/order-repository";
import PlaceOrderInput from "./place-order-input";
import PlaceOrderOutput from "./place-order-output";

export default class PlaceOrder {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly orderRepository: OrderRepository,
    readonly couponRepository: CouponRepository,
  ) {}

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const order = new Order(input.cpf, input.date);
    for (const orderItem of input.orderItems) {
      const item: Item | undefined = await this.itemRepository.findById(orderItem.idItem);
      if(!item) throw new Error("Item not found");
      order.addItem(item, orderItem.amount);
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.findByCode(input.coupon);
      if (coupon) order.addCoupon(coupon);
    }
    await this.orderRepository.save(order);
    const total = order.getTotal();
    const output = new PlaceOrderOutput(total);
    return output;
  }
}
