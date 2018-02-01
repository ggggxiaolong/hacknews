import React, { Component } from "react";
import './App.css'

const isSearched = param => item => item.title.toLowerCase().includes(param.toLowerCase())
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

const largeColumn = {
  width: '40%',
}

const midColumn = {
  width: '30%',
}

const smallColumn = {
  width: '10%',
}

const Search = ({value, onChange, children}) =>
  <form>
    {children}<input
      type='text'
      value={value}
      onChange={onChange}
      />
  </form>

const Table = ({list, pattern, onDismiss}) =>
  <div className='table'>
    {list.filter(isSearched(pattern)).map(item =>
      <div key={item.objectID} className='table-row'>
        <span style={largeColumn}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={midColumn}>{item.author}</span>
        <span style={smallColumn}>{item.num_comments}</span>
        <span style={smallColumn}>
          {item.point}
        </span>
        <span style={smallColumn}>
          <button
            onClick={() => onDismiss(item.objectID)}
            className='button-inline'
            >
          Dismiss
          </button>
        </span>
      </div>
    )}
  </div>

class App extends Component {
  constructor(props){
    super(props)
    this.state = {list:list,searchTerm:""}
  }

  onSearchChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  onDismiss = (param) => {
    const newList = this.state.list.filter(item => item.objectID !== param)
    this.setState({
      list: newList
    })
  }
  
  render(){
    const {list,searchTerm} = this.state
    return(
      <div className="page">
        <div className='interactions'>
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}>
            Search
          </Search>
        </div>
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