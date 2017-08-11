import { observable } from 'mobx'

class Countdowns {
    @observable count
    constructor () {
        this.count = 0
    }
    addCount (n) {
        this.count += n
    }
    setCount (n) {
        this.count = n
    }
}

const countdowns = new Countdowns

export { countdowns }
