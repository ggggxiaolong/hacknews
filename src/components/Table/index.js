import React, {Component} from "react";
import PropTypes from 'prop-types'
import { sortBy } from "lodash"
import classNames from "classnames";
import "./index.css"

const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_comments').reverse(),
    POINTS: list => sortBy(list, 'points').reverse(),
}

const Sort = ({ 
    sortKey,
    activeSortKey,
    onSort,
    children }) => {
        const sortClass = classNames(
            'button-inline',
            {'button-active': sortKey === activeSortKey}
        )
        return (
            <button 
                onClick={() => onSort(sortKey)}
                className={sortClass}
            >
            {children}
            </button>
        )
    } 

export class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sortKey: 'NONE',
            isSortRevese: false,
        };
    }

    onSort = sortKey => {
        const isSortRevese = this.state.sortKey === sortKey
            && !this.state.isSortRevese
        this.setState({sortKey, isSortRevese})
    }

    render(){
        const {
            sortKey,
            isSortRevese,
        } = this.state
        const {
            list,
            onDismiss,
        } = this.props

        const sortedList = SORTS[sortKey](list)
        const reverseSortedList = isSortRevese 
            ? sortedList.reverse()
            : sortedList
       return (
           <div className='table'>
                <div className='table-header'>
                    <span style={{width: '40%'}}>
                        <Sort
                            sortKey={'TITLE'}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                        >
                        Title
                        </Sort>
                    </span>
                    <span style={{width: '30%'}}>
                        <Sort
                            sortKey={'AUTHOR'}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                        >
                        Author
                        </Sort>
                    </span>
                    <span style={{width: '10%'}}>
                        <Sort
                            sortKey={'COMMENTS'}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                        >
                        Comments
                        </Sort>
                    </span>
                    <span style={{width: '10%'}}>
                        <Sort
                            sortKey={'POINTS'}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                        >
                        Points
                        </Sort>
                    </span>
                    <span style={{width: '10%'}}>
                        Archive
                    </span>
                </div>
                {reverseSortedList.map(item => 
                    <div key={item.objectID} className='table-row'>
                        <span>
                            <a href={item.url}>{item.title}</a>
                        </span>
                        <span>{item.num_comments}</span>
                        <span>{item.points}</span>
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
       ) 
    }
}

Table.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            objectID: PropTypes.string.isRequired,
            author: PropTypes.string,
            url: PropTypes.string,
            num_comments: PropTypes.number,
            points: PropTypes.number,
        })
    ).isRequired,
    onDismiss: PropTypes.func.isRequired,
}