import YakitoriList from "./YakitoriList";
import Yakitori from "./Yakitori";

export default class YakitoriListFactory {
  /**
   * @param {object[]} response
   * @param {string} response[].name
   * @param {number} response[].num
   * @param {boolean} response[].isEatable
   */
  static create(response) {
    if (!Array.isArray(response)) {
      return new YakitoriList();
    }
    return new YakitoriList({
      list: response.map((item) => new Yakitori(item))
    });
  }
}