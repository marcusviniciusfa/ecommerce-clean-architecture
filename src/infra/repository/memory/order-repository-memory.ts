import { default as Order } from "../../../domain/entities/order";
import OrderRepository from "../../../domain/repositories/order-repository";

export default class OrderRepositoryMemory implements OrderRepository {
  orders: Order[]

  constructor () {
    this.orders = [];
  }

  save(order: Order): Promise<void> {
    this.orders.push(order);
    return Promise.resolve();
  }
}
