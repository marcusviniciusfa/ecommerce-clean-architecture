import Cpf from "../../src/domain/entities/cpf";


test("Deve validar um cpf", function () {
  const cpf = new Cpf("935.411.347-80");
  expect(cpf).toBeTruthy();
});

test("Deve retornar uma exception ao tentar validar um cpf inválido", function () {
  expect(() => new Cpf("123.456.789-99")).toThrow(new Error("Invalid cpf"));
});

test("Deve retornar uma exception ao tentar validar um cpf com todos os dígitos iguais", function () {
  expect(() => new Cpf("111.111.111-11")).toThrow(new Error("Invalid cpf"));
});

test("Deve retornar uma exception ao tentar validar um cpf inválido muito grande", function () {
  expect(() => new Cpf("123.456.789-1000")).toThrow(new Error("Invalid cpf"));
});

test("Deve retornar uma exception ao tentar validar um cpf inválido muito pequeno", function () {
  expect(() => new Cpf("123.456")).toThrow(new Error("Invalid cpf"));
});
