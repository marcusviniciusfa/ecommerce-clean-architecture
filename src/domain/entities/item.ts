export default class Item {

  constructor(
    readonly idItem: number,
    readonly category: string,
    readonly description: string,
    readonly price: number,
    readonly width: number = 0,
    readonly height: number = 0,
    readonly depth: number = 0,
    readonly weight: number = 0
  ) {}

  getVolume() {
    return this.width / 100 * this.height / 100 * this.depth / 100;
  }

  getDensity() {
    return this.weight / this.getVolume()
  }
}
