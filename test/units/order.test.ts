import Coupon from "../../src/domain/entities/coupon";
import DefaultFreightCalculator from "../../src/domain/entities/default-freight-calculate";
import FixedFreightCalculator from "../../src/domain/entities/fixed-freight-calculator";
import Item from "../../src/domain/entities/item";
import Order from "../../src/domain/entities/order";

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
  const total = 30 * 3 + 50 + 10 * 2;
  expect(order.getTotal()).toBe(total);
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

test("Deve criar um pedido com um cupom de desconto expirado", function () {
  const cpf = "839.435.452-10";
  const order = new Order(cpf);
  order.addItem(new Item(1, "Música", "CD", 30), 3);
  order.addItem(new Item(2, "Vídeo", "DVD", 50), 1);
  order.addItem(new Item(2, "Vídeo", "VHS", 10), 2);
  order.addCoupon(new Coupon("VALE20", 20, new Date("2022-01-30")));
  const total = 30 * 3 + 50 + 10 * 2;
  expect(order.getTotal()).toBe(total);
});

test("Deve criar um pedido com 3 itens com o cálculo do frete com a estratégia default", function () {
  const cpf = "839.435.452-10";
  const order = new Order(cpf, new Date(), new DefaultFreightCalculator());
  order.addItem(new Item(4, "Instrumentos Musicais", "Guitarra", 1000, 100, 30, 10, 3), 1);
  order.addItem(new Item(5, "Instrumentos Musicais", "Amplificador", 5000, 100, 50, 50, 20), 1);
  order.addItem(new Item(6, "Acessórios", "Cabo", 10, 10, 10, 10, 0.9), 3);
  const freight = 260;
  expect(order.getFreight()).toBe(freight);
});

test("Deve criar um pedido com 3 itens com o cálculo do frete com a estratégia do valor fixo", function () {
  const cpf = "839.435.452-10";
  const order = new Order(cpf, new Date(), new FixedFreightCalculator());
  order.addItem(new Item(4, "Instrumentos Musicais", "Guitarra", 1000, 100, 30, 10, 3), 1);
  order.addItem(new Item(5, "Instrumentos Musicais", "Amplificador", 5000, 100, 50, 50, 20), 1);
  order.addItem(new Item(6, "Acessórios", "Cabo", 10, 10, 10, 10, 0.9), 3);
  const freight = 50;
  expect(order.getFreight()).toBe(freight);
});
