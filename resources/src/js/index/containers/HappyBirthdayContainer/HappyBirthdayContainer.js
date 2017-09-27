import React from 'react'
import { observer } from 'mobx-react'
import moment from 'moment';
import YakitoriAPI from '../../api/YakitoriAPI';

@observer
class HappyBirthdayContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      message: null
    };
    this.yakitoriAPI = new YakitoriAPI();
  }

  render() {
    const yumiriBirthDay = moment('2017-09-29 00:00:00').toDate().getTime();
    const is20sai = yumiriBirthDay < Date.now();

    if (!is20sai) {
      return null;
    }

    return <div className="HappyBirthdayContainer">
      <div className="Message">
        ２０歳の誕生日おめでとうございます！
      </div>
      <div className="OrderButtonWrapper">
        <button className="Button" onClick={this._onClickOrderButton}>はぁとを注文する(0スタージュエル)</button>
        {this.state.message ? <div className="Message">
          {this.state.message}
        </div> : null}
      </div>
      <div className="Info">
        みんなが焼いた一覧は<a href="#yakitori-list">こちら</a>
      </div>
    </div>;
  }

  _onClickOrderButton = () => {
    this.yakitoriAPI.incrementHeart()
      .then(() => {
        this._setMessage('はぁとが１本焼けました');
      })
      .catch(() => {
        this._setMessage('注文に失敗しました。もう一度試してみてください。');
      });
  };

  _setMessage(message) {
    this.setState({message});
    setTimeout(() => {
      this.setState({message: null});
    }, 3000);
  }
}

export { HappyBirthdayContainer }
