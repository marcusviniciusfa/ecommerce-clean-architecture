import FreightCalculator from "./freight-calculator";
import item from "./item";

export default class FixedFreightCalculator implements FreightCalculator {
  calculate(item: item): number {
    return 10;
  }
}
