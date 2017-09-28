import React from 'react'
import { observer } from 'mobx-react'
import { countdown } from '../../states/CountdownState';

@observer
class CountDownContainer extends React.Component {
  render() {
    const months = countdown.remainingTime.months();
    const days = countdown.remainingTime.days();
    const hours = countdown.remainingTime.hours();
    const minutes = countdown.remainingTime.minutes();
    const seconds = countdown.remainingTime.seconds();

    const isMonthsVisible = !!months;
    const isDaysVisible = isMonthsVisible || !!days;
    const isHoursVisible = isDaysVisible || !!hours;
    const isMinutesVisible = isHoursVisible || !!minutes;
    const isSecondsVisible = isMinutesVisible || !!seconds;

    return <div className="CountDownContainer">
      <div className="Text">
        <span className="LoveForYumiri">花守ゆみり</span>さん<span className="LoveForYumiri">20歳</span>の誕生日まで...
      </div>
      <div className="RemainingTime">
        {isMonthsVisible ? <div className="TimeFragment Month">
          <span className="Value">{months}</span>
          <span className="Suffix">ヶ月</span>
        </div> : null}
        {isDaysVisible ? <div className="TimeFragment Day">
          <span className="Value">{isMonthsVisible ? this._zeroPadding(days): days}</span>
          <span className="Suffix">日</span>
        </div> : null}
        {isHoursVisible ? <div className="TimeFragment Hour">
          <span className="Value">{isDaysVisible ? this._zeroPadding(hours): hours}</span>
          <span className="Suffix">時間</span>
        </div> : null}
        {isMinutesVisible ? <div className="TimeFragment Minute">
          <span className="Value">{isHoursVisible ? this._zeroPadding(minutes) : minutes}</span>
          <span className="Suffix">分</span>
        </div> : null}
        {isSecondsVisible ? <div className="TimeFragment Second">
          <span className="Value">{isMinutesVisible ? this._zeroPadding(seconds): seconds}</span>
          <span className="Suffix">秒</span>
        </div> : null}
      </div>
    </div>;
  }

  _zeroPadding(num) {
    if (num < 0) {
      return num;
    }
    return (num < 10 ? '0' : '') + num;
  }
}

export { CountDownContainer }
