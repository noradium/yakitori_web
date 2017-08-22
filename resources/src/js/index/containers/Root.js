import React from 'react'
import { observer } from 'mobx-react'
import {CountDownContainer} from './CountDownContainer/CountDownContainer';
import {GameContainer} from "./GameContainer/GameContainer"
import {SiteDescriptionContainer} from "./SiteDescriptionContainer/SiteDescriptionContainer";
import {SiteFooterContainer} from "./SiteFooterContainer/SiteFooterContainer";
import {YakitoriListContainer} from "./YakitoriListContainer/YakitoriListContainer";
import {TwitterTimelineContainer} from "./TwitterTimelineContainer/TwitterTimelineContainer";

@observer
class Root extends React.Component {
  render() {
    return <div>
      <CountDownContainer/>
      <SiteDescriptionContainer/>
      <GameContainer/>
      <YakitoriListContainer/>
      <TwitterTimelineContainer/>
      <SiteFooterContainer/>
    </div>;
  }
}

export { Root }
