import React from "react";
import "./index.css"

export const Table = ({
    list,
    onDismiss
}) => 
    <div className='table'>
        {list.map(item => 
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