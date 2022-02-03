import FreightCalculator from "./freight-calculator";
import Item from "./item";

export default class DefaultFreightCalculator implements FreightCalculator {
  calculate(item: Item) {
    if (!item.width || !item.height || !item.depth || !item.weight) return 0
    const distance = 1000
    const freight = distance * item.getVolume() * item.getDensity() / 100
    const minFreight = 10
    return Math.max(minFreight, freight)
  }
}
