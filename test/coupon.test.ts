import Coupon from "../src/coupon";

test("Deve criar um cupom de desconto válido", function () {
  const coupon = new Coupon("VALE20", 20, new Date("2022-01-31"));
  const today = new Date("2022-01-30");
  const isValid = coupon.isValid(today);
  expect(isValid).toBeTruthy();
});

test("Deve criar um cupom de desconto expirado", function () {
  const coupon = new Coupon("VALE20", 20, new Date("2022-01-30"));
  const today = new Date("2022-01-31");
  const isExpired = coupon.isExpired(today);
  expect(isExpired).toBeTruthy();
});

test("Deve criar um cupom de desconto válido e calcular o desconto", function () {
  const coupon = new Coupon("VALE20", 20);
  const discount = coupon.calculateDiscount(1000);
  expect(discount).toBe(200);
});
