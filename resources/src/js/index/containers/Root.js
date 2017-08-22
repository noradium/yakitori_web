import React from 'react'
import { observer } from 'mobx-react'
import {CountDownContainer} from './CountDownContainer/CountDownContainer';
import {GameContainer} from "./GameContainer/GameContainer"
import {SiteDescriptionContainer} from "./SiteDescriptionContainer/SiteDescriptionContainer";
import {SiteFooterContainer} from "./SiteFooterContainer/SiteFooterContainer";
import {YakitoriListContainer} from "./YakitoriListContainer/YakitoriListContainer";

@observer
class Root extends React.Component {
  render() {
    return <div>
      <CountDownContainer/>
      <SiteDescriptionContainer/>
      <GameContainer/>
      <YakitoriListContainer/>
      <SiteFooterContainer/>
    </div>;
  }
}

export { Root }
