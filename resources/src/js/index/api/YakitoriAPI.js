import YakitoriListFactory from "../model/YakitoriListFactory";

export default class YakitoriAPI {
  /**
   * 焼き鳥一覧を取得します
   * @return {Promise.<YakitoriList>}
   */
  fetchList() {
    return fetch('/api/yakitori/list')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return YakitoriListFactory.create(json);
      });
  }
}