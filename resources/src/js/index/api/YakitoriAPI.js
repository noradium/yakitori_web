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

  incrementHeart() {
    return fetch('/api/yakitori', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({foods: [
        {
          name: 'heart',
          condition: 'good'
        },
        {
          name: 'heart',
          condition: 'good'
        },
        {
          name: 'heart',
          condition: 'good'
        },
        {
          name: 'heart',
          condition: 'good'
        },
        {
          name: 'heart',
          condition: 'good'
        }
      ]})
    })
      .then((response) => {
        return response.json();
      });
  }
}
