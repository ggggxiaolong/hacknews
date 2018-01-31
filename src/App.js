import React, { Component } from "react";
import './App.css'

const isSearched = (param) => (item) => {item.title.toLowerCase().includes(param.toLowerCase())}
const list = [
  {
    title: "React",
    url:"https://facebook.github.io",
    author:'Jordan Walke',
    num_comments:3,
    point:4,
    objectID:0,
  },
  {
    title:"Redux",
    url:"https://github.com/reactjs/redux",
    author:"Dan Abrawmov, Adrew Clark",
    num_comments:2,
    point:5,
    objectID:1,
  }
]

class Search extends Component {
  render() {
    const {value, onChange} = this.props

    return(
      <form>
        <input
          type="text"
          value="{value}"
          onChange={onchange}
          />
      </form>
    )
  }
}

class Table extends Comment {
  render() {
    const {list, pattern, onDismiss} = this.props

    return (
      <div>
        {list.filter(isSearched(pattern)).map(item =>
          <div key={item.objectID}>
            <span><a href={item.url}>{item.title}</a></span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>
              <button
                type='button'
                onClick={onDismiss}
                >
                Dismiss
              </button>  
            </span>
          </div>
        )}
      </div>
    )
  }
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {list:list,searchTerm:""}
  }
  
  render(){
    const {searchTerm, list} = this.state
    return(
      <div className="App">
        <Search
          value={searchTerm}
          onchange={this.onSearchChange}
          />
        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
          />
      </div>
    )
  }
}

export default App