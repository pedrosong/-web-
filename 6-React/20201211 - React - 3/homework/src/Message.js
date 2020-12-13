/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      msgToEdit: this.props.data.msg, // 把msg备份一份
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isEdit && this.state.isEdit) {
      this.msgEdited.focus();
    }
  }
  msgEdited = null;
  render() {
    const { data, remove, editMessage, selectMsg } = this.props;
    const { isEdit, msgToEdit } = this.state;
    const { id, name, msg, isChosen } = data;

    return (
      <li className={isEdit ? "editing" : ""}>
        <h3>{name}</h3>
        <input
          type="checkbox"
          checked={isChosen}
          onChange={({ target }) => {
            selectMsg(id, target);
          }}
        />
        <p
          onDoubleClick={() => {
            this.setState({
              isEdit: true,
            });
          }}
        >
          {msg}
        </p>
        <textarea
          type="text"
          ref={(node) => {
            this.msgEdited = node;
          }}
          value={msgToEdit}
          onChange={({ target }) => {
            this.setState({
              msgToEdit: target.value,
            });
          }}
          onBlur={() => {
            if (msgToEdit.trim()) {
              editMessage(id, msgToEdit);
            } else {
              this.setState({
                msgToEdit: msg,
              });
            }
            this.setState({
              isEdit: false,
            });
          }}
        ></textarea>
        <a
          onClick={() => {
            const idToRemove = id;
            remove(idToRemove);
          }}
        >
          删除
        </a>
      </li>
    );
  }
}

export default Message;
