import React, { Component } from "react";
import './App.css'

const DEAFULT_QUERY = 'redux'
const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='
const PARAM_PAGE = "page="
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}`
// const style = {
//   largeColumn:{width: '40%',},
//   midColumn: {width: '30%'},
//   smallColumn: {width: '10%'}
// }

const Search = ({
  value,
  onChange,
  onSubmit,
  children 
}) =>
  <form onSubmit={onSubmit}>
    <input
      type='text'
      value={value}
      onChange={onChange}
      />
    <button type="submit">
    {children}
    </button>
  </form>

const Table = ({list, pattern, onDismiss}) =>
  <div className='table'>
    {list.map(item =>
    <div key={item.objectID} className='table-row'>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.num_comments}</span>
      <span>{item.poins}</span>
      <span>
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

export default class App extends Component{
  constructor(props){
    super(props)
    
   this.state = {
     result: null,
     searchTerm: DEAFULT_QUERY
   } 
  }

  setSearchTopStories = (result) => {
    const {hits, page} = result
    const oldHits = page !== 0
      ? this.state.result.hits
      :[]
    const updateHits = [
      ...oldHits,
      ...hits
    ]
    this.setState({result: {hits: updateHits,page }})
  }

  fetchSearchTopStories = (searchTerm, page=0) => {
    fetch(`${url}${searchTerm}&${PARAM_PAGE}${page}`)
      .then(res => res.json())
      .then(json => this.setSearchTopStories(json, page))
      .catch(e => e) 
  }

  componentDidMount() {
    const {searchTerm} = this.state
    this.fetchSearchTopStories(searchTerm)
  }  

  onSearchChange =(event) => {
    this.setState({searchTerm: event.target.value})
  }

  onSearchSubmit= (event) => {
    const {searchTerm} = this.state
    this.fetchSearchTopStories(searchTerm)
    event.preventDefault()
  }

  onDismiss = (param) => {
    const newList = this.state.result.hits.filter(item => item.objectID !== param)
    this.setState({result: {...this.result, hits: newList}})
  }
  render(){
    const {result, searchTerm} = this.state
    const page = (result && result.page) || 0
    return(
      <div className='page'>
        <div className='interactions'>
          <Search
            value={searchTerm}
            onChange ={this.onSearchChange}
            onSubmit={this.onSearchSubmit}>
            Search
          </Search>
        </div>
       {result && 
        <Table
          list={result.hits} 
          pattern={searchTerm}
          onDismiss={this.onDismiss}
          />
        }
        <div className="interactions">
          <button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
            More
          </button>
        </div>
      </div>
    )
  }
}