import { DEAFULT_QUERY, PATH_BASE, PATH_SEARCH, PARAM_PAGE, PARAM_SEARCH } from "../constants";
import React, { Component } from "react";
import { Table, Search, Loading } from "../components";
import './index.css'

export default class App extends Component {
    constructor(props){
        super(props)

        this.state ={
            searchTerm: DEAFULT_QUERY,
            searchKey: '',
            error: null,
            results:[],
            isLoading: false,
        }
    }

    fetchSearchTopStories = (searchTerm, page = 0) => {
        this.setState({isLoading: true})
        const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`
        fetch(url)
            .then(res => res.json())
            .then(json => this.setSearchTopStories(json))
            .catch(error => this.setState({error}))
    }

    setSearchTopStories = (result) => {
        const {hits, page} = result
        const {results, searchKey} = this.state
        const oldHit = (
            results 
            && results[searchKey]
            && results[searchKey].hits
        ) || []

        const newHits = [
            ...oldHit,
            ...hits
        ]
        
        this.setState({
            results: {
                ...results,
                [searchKey]:{
                    hits:newHits,
                    page
                }
            },
            isLoading: false,
        })
    }

    onDismiss = itemId => {
        const {searchKey, results} = this.state
        const {hits, page} = results[searchKey]
        const newHits = hits.filter(item => item.objectID !== itemId)

        this.setState({
            results: {
                ...results,
                [searchKey]: {
                    hits:newHits,
                    page
                }
            }
        })
    }

    onSearchChange = event => {
        this.setState({searchTerm: event.target.value})
    }

    onSearchCommit = event => {
        const {searchTerm, results} = this.state
        this.setState({
            searchKey: searchTerm
        })

        if(!results[searchTerm]){
            this.fetchSearchTopStories(searchTerm)
        }

        event.preventDefault()
    }

    componentDidMount(){
        const {searchTerm} = this.state
        this.setState({
            searchKey: searchTerm
        })

        this.fetchSearchTopStories(searchTerm)
    }

    render(){
        const {
            results,
            searchKey,
            searchTerm,
            error,
            isLoading
        } = this.state
        const list = (
            results &&
            results[searchKey] &&
            results[searchKey].hits) || []
        const page = (
            results &&
            results[searchKey] &&
            results[searchKey].page
        ) || 0
        
        return(
            <div className='page'>
                <div className='interactions'>
                    <Search
                        value={searchTerm}
                        onChange={this.onSearchChange}
                        onSubmit={this.onSearchCommit}
                    >
                    Search
                    </Search>
                </div>
                {error?
                    <div className='interactions'>
                        <p>Something went wrong</p>
                    </div>
                    :<Table
                        list={list}
                        onDismiss={this.onDismiss}
                    />
                }
                <div className='interactions'>
                    {isLoading
                        ? <Loading/>
                        : <button
                            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
                            More
                        </button>
                    }
                </div>
            </div>
        )
    }

}