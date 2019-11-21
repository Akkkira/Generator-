import React from 'react'
import './style.css'

const mainData = (props:any) => {
    return (
        <div className="MainData">
          <span>{props.label + ": "}</span>
            <span>{props.value}</span>
        </div>
    )
};

export default mainData;