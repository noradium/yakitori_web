import React from 'react'

class GameContainer extends React.Component {
  get GAME_URL() {
    if (process.env.NODE_ENV === 'production') {
      return 'http://game.noradium.com/yakitori';
    }
    return 'http://localhost:3000/game';
  }

  WIDTH = 960;
  HEIGHT = 540;

  render() {
    return <div className="GameContainer">
      <h2 className="GameTitle">焼き鳥を焼こう！</h2>
      <div className="GameDescription">
      </div>
      <div className="IframeContainer" ref={c => this.iframeContainer = c}>
        <iframe ref={c => this.iframe = c} src={this.GAME_URL} frameBorder="0" width={this.WIDTH} height={this.HEIGHT}/>
      </div>
    </div>;
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (!this.iframe) {
      return;
    }
    const scale = document.documentElement.clientWidth / this.WIDTH;
    this.iframe.style.transform = `scale(${scale})`;
    this.iframeContainer.style.height = `${this.HEIGHT * scale}px`;
  }
}

export { GameContainer }
