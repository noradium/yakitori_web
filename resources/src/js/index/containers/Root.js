import React from 'react'
import { observer } from 'mobx-react'
import { countdowns } from '../states/Countdowns';

@observer
class Root extends React.Component {
    render() {
      return <div>
        <div>{countdowns.count}</div>
      </div>;
    }

    componentDidMount() {
      setInterval(() => {
        countdowns.addCount(1);
      }, 1000);
    }
}

export { Root }
