import React, { Component } from "react";
import './App.css'

  const list = [
    "a",
    "b",
    "abc",
    "abdc",
    "bcd",
    "cd",
    "ac"
  ]

const isSearched = searchItem => item => item.toLowerCase().includes(searchItem.toLowerCase())

class App extends Component {

  constructor(prop){
    super(prop)

    this.state = {list, searchItem:"",}
  }

  onSearchChange= (event) => {
    this.setState({
      searchItem: event.target.value
    })
  }

  render(){
    const {searchItem,list} = this.state
    return(
      <div className="App">
        <form>
          <input type='text' onChange={this.onSearchChange} />
        </form>
        {list.filter(isSearched(searchItem)).map(item =>
          <div key={item}>
            <span>{item}</span>
          </div>
        )}
      </div>
    )
  }
}

export default App