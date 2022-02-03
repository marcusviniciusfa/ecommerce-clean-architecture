import Coupon from "../../../domain/entities/coupon";
import CouponRepository from "../../../domain/repositories/coupon-repository";

export default class CouponRepositoryMemory implements CouponRepository {
  coupons: Coupon[];

  constructor() {
    this.coupons = [
      new Coupon("VALE20", 20)
    ]
  }
  findByCode(code: string): Promise<Coupon | undefined> {
    return Promise.resolve(this.coupons.find(coupon => coupon.code === code));
  }

}
