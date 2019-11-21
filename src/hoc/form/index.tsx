import React from 'react'
import './form.css'

interface FormTypes {
    labels:Array<string>,
    state:any,
    style:string
}

const Form = ({style, labels, state}: FormTypes) => {
    return(
        <div className={style}>
            {
                labels.map(el => (
                <div className="MainData"
                     key={el}>{el}: {state[el]}</div>
                ))
            }
        </div>
    );
}

export default Form;