import { observable } from 'mobx';
import YakitoriAPI from "../api/YakitoriAPI";

class YakitoriListState {
  @observable list;
  constructor () {
    this.yakitoriAPI = new YakitoriAPI();
    setInterval(() => this._updateList(), 10000);
    this._updateList();
  }

  _updateList() {
    this.yakitoriAPI.fetchList()
      .then((yakitoriList) => {
        this.list = yakitoriList;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

const yakitoriList = new YakitoriListState;

export { yakitoriList }
