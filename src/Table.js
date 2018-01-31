import React, { Component } from "react";

const isSearch = param => item => item.title.toLowerCase().includes(param.toLowerCase())

export class Table extends Component{
    render(){
        const {list, pattern, onDismiss} = this.props
        return(
            <div>
                {list.filter(isSearch(pattern)).map(item => 
                <div key={item.objectID}>                
                    <span><a href={item.url}>{item.title}</a></span>
                    <span>{item.author}</span>
                    <span>{item.num_comments}</span>
                    <span>
                        <button
                            type="button"
                            onClick={() => onDismiss(item.objectID)}
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