import React from 'react'
import { observer } from 'mobx-react'
import { yakitoriList } from '../../states/YakitoriListState';

@observer
class YakitoriListContainer extends React.Component {
  render() {
    const eatableList = yakitoriList.list ? yakitoriList.list.sortedEatableList : [];
    const uneatableList = yakitoriList.list ? yakitoriList.list.sortedUneatableList : [];
    return <div className="YakitoriListContainer">
      <h2 id="yakitori-list">みんなが焼いた焼き鳥</h2>
      <div className="ListCaption">おいしい部門</div>
      <table className="EatableList YakitoriList">
        <tbody>
          {eatableList.map((yakitori, index) => {
            return <tr className="EatableListItem YakitoriListItem" data-rank={index + 1} key={yakitori.name}>
              <td className="ItemRank">
                <span className="ItemRankValue">{index + 1}</span>
                <span className="ItemRankSuffix">位</span>
              </td>
              <td className="ItemName">{yakitori.name}</td>
              <td className="ItemNum">
                <span className="ItemNumValue">{yakitori.num}</span>
                <span className="ItemNumSuffix">本</span>
              </td>
            </tr>;
          })}
        </tbody>
      </table>
      <div className="ListCaption">その他部門</div>
      <table className="UneatableList YakitoriList">
        <tbody>
        {uneatableList.map((yakitori, index) => {
          return <tr className="UneatableListItem YakitoriListItem" key={yakitori.name}>
            <td className="ItemName">{yakitori.name}</td>
            <td className="ItemNum">
              <span className="ItemNumValue">{yakitori.num}</span>
              <span className="ItemNumSuffix">本</span>
            </td>
          </tr>;
        })}
        </tbody>
      </table>
    </div>;
  }
}

export { YakitoriListContainer }
