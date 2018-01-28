import React,{ Component } from "react";
import './App.css'
class App extends Component {
  render(){
    const me = {name: 'tanxiaolong', sex:'male'}
    return(
      <div className='App'>
        <h2>my name is {me.name}, a {me.sex} coder.</h2>
      </div>
    )
  }
}
export default App