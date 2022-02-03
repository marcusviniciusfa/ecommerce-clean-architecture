export default class PlaceOrderInput {
  constructor (
    readonly cpf: string,
    readonly orderItems: { idItem: number, amount: number }[],
    readonly date: Date,
    readonly coupon?: string
  ) {}
}
