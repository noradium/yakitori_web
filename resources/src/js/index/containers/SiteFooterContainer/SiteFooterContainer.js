import React from 'react';

class SiteFooterContainer extends React.Component {
  render() {
    return <div className="SiteFooterContainer">
      <span className="TwitterShareButton" onClick={this._onTwitterShareButtonClick}>
        <img src="/image/twitter.png" alt="twitter share button"/>
      </span>
      <span className="Copyright">&copy; 2017 <a href="https://twitter.com/xradium888" target="_blank">@noradium</a></span>
    </div>;
  }

  _onTwitterShareButtonClick = () => {
    window.open(`https://twitter.com/intent/tweet?text=花守ゆみりさん生誕祭 焼き鳥特設&url=http%3a%2f%2fhanayumi%2enoradium%2ecom`, '_blank', 'width=660,height=250');
  };
}

export { SiteFooterContainer }
