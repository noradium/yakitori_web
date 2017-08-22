export default class Yakitori {
  _name;
  _num;
  _isEatable;

  constructor({
    name,
    num,
    isEatable
  }) {
    this._name = name;
    this._num = num;
    this._isEatable = isEatable;
  }

  get name() {
    return this._name;
  }

  get num() {
    return this._num;
  }

  get isEatable() {
    return this._isEatable;
  }
}
