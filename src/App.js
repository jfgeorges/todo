import React, { Component } from "react";
import "./App.css";
import ListItem from "./components/ListItem";

class App extends Component {
  state = {
    inputItem: "",
    searchItem: "",
    itemsList: [],
    filteredList: [] //Contient les mêmes objets 'item' qu'itemsList
  };

  // Filtrage de la liste
  getFilteredList = () => {
    const filter = this.state.searchItem;
    // Liste complète par défaut
    let newFilteredList = this.state.itemsList;
    // filter() s'il y a des caractères dans la zone de filtre
    if (filter.length) {
      newFilteredList = this.state.itemsList.filter(objItem => {
        return objItem.item.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      });
    }
    this.sortArray(newFilteredList);
    this.setState({ filteredList: newFilteredList });
  };
  // Création de la liste des Items
  renderList = () => {
    return this.state.filteredList.map((item, i) => {
      return (
        <ListItem key={i} itemId={item.itemId} itemDone={item.done} callback={this.listItemCallBack}>
          {item.item}
        </ListItem>
      );
    });
  };

  // HANDLE FILTRE
  // filteredList est créée à partir d'itemList
  handleFilter = event => {
    this.setState({ searchItem: event.target.value }, this.getFilteredList);
  };

  // CHANGE inputItem
  handleChange = event => {
    this.setState({ inputItem: event.target.value }, this.getFilteredList);
  };

  // SUBMIT
  handleSubmit = event => {
    event.preventDefault();
    // Génération d'un Id unique : number of milliseconds elapsed since January 1, 1970, 00:00:00
    const itemId = Date.now();
    // N'enregistre pas d'item null
    if (this.state.inputItem) {
      this.setState(
        {
          inputItem: "",
          itemsList: [...this.state.itemsList, { itemId: itemId, item: this.state.inputItem, done: 0 }]
        },
        this.getFilteredList
      );
    }
  };

  // Return the id of a found object in an array
  getIndexFromId = (objArray, Id) => {
    for (let i = 0; i < objArray.length; i++) {
      if (objArray[i].itemId === Id) {
        return i;
      }
    }
    return false;
  };
  // Sort the items's array out from the 'done' property
  sortArray = array => {
    array.sort((a, b) => {
      return a.done - b.done;
    });
  };
  // CALLBACK FROM CHILD ListItem
  listItemCallBack = (action, itemId) => {
    const newItemsList = [...this.state.itemsList];
    const idx = this.getIndexFromId(newItemsList, itemId);

    if (idx !== false) {
      // Barrage de l'élément cliqué
      if (action === "check") {
        newItemsList[idx].done = newItemsList[idx].done === 1 ? 0 : 1;
      } else {
        // Suppression de l'item cliqué dans la liste principale
        newItemsList.splice(idx, 1);
      }
      // SETSTATE
      this.setState({ itemsList: newItemsList }, this.getFilteredList);
    }
  };
  // RENDER
  render() {
    return (
      <div className="container">
        <h1>To Do List</h1>
        <input type="text" name="search" value={this.state.searchItem} placeholder="Search an item" onChange={this.handleFilter} />
        <ul>{this.renderList()}</ul>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="item" value={this.state.inputItem} placeholder="Enter an item" onChange={this.handleChange} />
          <button type="submit" value="Submit">
            New item
          </button>
        </form>
      </div>
    );
  }
}

export default App;
