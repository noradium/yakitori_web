export default class YakitoriList {
  _list;

  /**
   * @constructor
   * @param {Yakitori[]} list
   */
  constructor({
    list = []
  } = {}) {
    this._list = list;
  }

  get sortedEatableList() {
    return this._list
      .filter(yakitori => yakitori.isEatable)
      .sort((a, b) => b.num - a.num);
  }

  get sortedUneatableList() {
    return this._list
      .filter(yakitori => !yakitori.isEatable)
      .sort((a, b) => b.num - a.num);
  }
}
