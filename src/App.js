import React, { Component } from "react";
import './App.css'

const DEAFULT_QUERY = 'redux'
const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='
const PARAM_PAGE = "page="
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}`

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

const Table = ({list, onDismiss}) =>
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
     searchTerm: DEAFULT_QUERY,
     searchKey:'',
     error:null,
   } 
  }

  setSearchTopStories = (result) => {
    const {hits, page} = result
    const {searchKey, results} = this.state
    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      :[]
    const updateHits = [
      ...oldHits,
      ...hits
    ]
    this.setState({
      results: {
        ...results,
        [searchKey]:{
          hits: updateHits,
          page
        }
      }
    })
  }

  fetchSearchTopStories = (searchTerm, page=0) => {
    fetch(`${url}${searchTerm}&${PARAM_PAGE}${page}`)
      .then(res => res.json())
      .then(json => this.setSearchTopStories(json, page))
      .catch(e => this.setState({error:e})) 
  }

  componentDidMount() {
    const {searchTerm} = this.state
    this.setState({
      searchKey: searchTerm
    })
    this.fetchSearchTopStories(searchTerm)
  }  

  onSearchChange =(event) => {
    this.setState({searchTerm: event.target.value})
  }

  onSearchSubmit= (event) => {
    const {searchTerm, results} = this.state
    this.setState({
      searchKey: searchTerm
    })
    if(!results[searchTerm]){
      this.fetchSearchTopStories(searchTerm)
    }
    event.preventDefault()
  }

  onDismiss = (param) => {
    const {results, searchKey} = this.state
    const {hits, page} = results[searchKey]
    const newList = hits.filter(item => item.objectID !== param)
    this.setState({
        results: {
        ...results,
        [searchKey]:{hits:newList, page}
      }
    })
  }
  render(){
    const {results, searchTerm, searchKey, error} = this.state
    const page = (results && results[searchKey] && results[searchKey].page) || 0
    const list = (results && results[searchKey] && results[searchKey].hits)||[]
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
        { error?
          <div className='interactions'>
            <p>Something went wrong.</p>
          </div>
          :<Table
            list={list} 
            onDismiss={this.onDismiss}
            />
        }
        <div className="interactions">
          <button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            More
          </button>
        </div>
      </div>
    )
  }
}