import OrderItem from "../../src/domain/entities/order-items";

test("Deve criar um item do pedido", function () {
  const orderItem = new OrderItem(1, 1000, 10);
  expect(orderItem.getTotal()).toBe(1000 * 10);
});
