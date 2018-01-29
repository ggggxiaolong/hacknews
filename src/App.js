import React, { Component } from "react";
import './App.css'

const list = [
  {
    title: 'React',
    url:'https://facebook.github.io',
    author:'Jordan Walke',
    num_comments:3,
    point:4,
    objectIs:0,
  },
  {
    title:'Redux',
    url:'https://github.com/reactjs/redux',
    author:'Dan Abramov, Adrew Clark',
    num_comments:2,
    point:5,
    objectIs:1,
  }
]

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      list: list,
      name: "xiao ming"
    }
  }
  render(){
    return (
      <div className="App">
        <h2>{this.state.name}</h2>
        {
          this.state.list.map( item =>
              <div key={item.objectIs}>
                <span> <a href={item.url}>{item.title}</a></span>
                <span>{item.author}</span>
                <span>{item.num_comments}</span>
                <span>{item.point}</span>
              </div>
          )}
      </div>
    )
  }
}

export default App