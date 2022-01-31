import Coupon from "../src/coupon";
import Item from "../src/item";
import Order from "../src/order";

test("Deve criar um pedido vazio com CPF válido", function () {
  const cpf = "839.435.452-10";
  const order = new Order(cpf);
  const total = order.getTotal();
  expect(total).toBe(0);
});

test("Deve retornar uma exception ao tentar criar um pedido vazio com CPF inválido", function () {
  const cpf = "111.111.111-11";
  expect(() => new Order(cpf)).toThrow(new Error("Invalid cpf"));
});

test("Deve criar um pedido com 3 itens", function () {
  const cpf = "839.435.452-10";
  const order = new Order(cpf);
  order.addItem(new Item(1, "Música", "CD", 30), 3);
  order.addItem(new Item(2, "Vídeo", "DVD", 50), 1);
  order.addItem(new Item(2, "Vídeo", "VHS", 10), 2);
  expect(order.getTotal()).toBe(30 * 3 + 50 + 10 * 2);
});

test("Deve criar um pedido com 3 itens com um cupom de desconto", function () {
  const cpf = "839.435.452-10";
  const order = new Order(cpf);
  order.addItem(new Item(1, "Música", "CD", 30), 3);
  order.addItem(new Item(2, "Vídeo", "DVD", 50), 1);
  order.addItem(new Item(2, "Vídeo", "VHS", 10), 2);
  order.addCoupon(new Coupon("VALE20", 20));
  const total = 30 * 3 + 50 + 10 * 2;
  expect(order.getTotal()).toBe(total - total * 0.2);
});
