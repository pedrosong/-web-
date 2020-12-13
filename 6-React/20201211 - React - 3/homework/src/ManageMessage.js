/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";

class ManageMessage extends Component {
  state = {
    checkValue: false,
  };
  render() {
    const { data,selectAllOrSelectNone,removeAllSelectedMessages } = this.props;
    const { checkValue } = this.state;
    const allMsgLength = data.length
    const selectMsgLength = data.filter((item)=> item.isChosen).length
    return (
      <div className="sum">
        <label>
          <input
            type="checkbox"
            checked={checkValue}
            onChange={({ target }) => {
              selectAllOrSelectNone(target);
              this.setState({
                checkValue: target.checked
              })
            }}
          />
          <span>选中全部</span>
        </label>
        <a onClick={()=>{
          removeAllSelectedMessages();
        }}>删除选中项</a>
        <p>当前选中{selectMsgLength}项，共{allMsgLength}条留言</p>
      </div>
    );
  }
}

export default ManageMessage;
