import React from "react";

class ListItem extends React.Component {
  returnDeleteItem = () => {
    this.props.callback("delete", this.props.itemId);
  };

  returnCheckItem = () => {
    this.props.callback("check", this.props.itemId);
  };

  render() {
    let classList = "item";
    if (this.props.itemDone === 1) {
      classList = classList + " strike"; // Ajoute la classe barré
    }
    return (
      <li id={"item" + this.props.id}>
        <span onClick={this.returnDeleteItem} className="puce">
          {"x "}
        </span>
        <span className={classList} onClick={this.returnCheckItem}>
          {this.props.children}
        </span>
      </li>
    );
  }
}

export default ListItem;
