import { observable } from 'mobx';
import moment from 'moment';

class CountdownState {
    @observable remainingTime;
    constructor () {
      this.yumiriBirthDay = moment('2017-09-29 00:00:00').toDate().getTime();
      this.remainingTime = moment.duration(this.yumiriBirthDay - Date.now());

      setInterval(() => {
        this.remainingTime = moment.duration(this.yumiriBirthDay - Date.now());
      }, 250);
    }
}

const countdown = new CountdownState;

export { countdown }
