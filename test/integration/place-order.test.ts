import PlaceOrder from "../../src/application/use-cases/place-order";
import CouponRepositoryMemory from "../../src/infra/repository/memory/coupon-repository-memory";
import ItemRepositoryMemory from "../../src/infra/repository/memory/item-repository-memory";
import OrderRepositoryMemory from "../../src/infra/repository/memory/order-repository-memory";

test("Deve fazer um pedido", async function() {
  const itemRepositoryMemory = new ItemRepositoryMemory();
  const orderRepositoryMemory = new OrderRepositoryMemory();
  const couponRepositoryMemory = new CouponRepositoryMemory();

  const placeOrder = new PlaceOrder(itemRepositoryMemory, orderRepositoryMemory, couponRepositoryMemory);
  const input = {
    cpf: "839.435.452-10",
    orderItems: [
      {idItem: 1, amount: 1},
      {idItem: 2, amount: 1},
      {idItem: 3, amount: 3},
    ],
    date: new Date("2022-01-31"),
    coupon: "VALE20"
  }
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(88)
});

test("Deve fazer um pedido com o cálculo de frete", async function() {
  const itemRepositoryMemory = new ItemRepositoryMemory();
  const orderRepositoryMemory = new OrderRepositoryMemory();
  const couponRepositoryMemory = new CouponRepositoryMemory();

  const placeOrder = new PlaceOrder(itemRepositoryMemory, orderRepositoryMemory, couponRepositoryMemory);
  const input = {
    cpf: "839.435.452-10",
    orderItems: [
      {idItem: 4, amount: 1},
      {idItem: 5, amount: 1},
      {idItem: 6, amount: 3},
    ],
    date: new Date("2022-01-31")
  }
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(6290)
});
