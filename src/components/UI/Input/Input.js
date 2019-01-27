import React from 'react';
import classes from './Input.css';



const input = (props) => {
    let inputElement = null;

    switch(props.elemnttype){
        case('input') :
            inputElement = <input className={classes.input} {...props} />;
            break;
        case('textErea') :
            inputElement = <textErea className={classes.input} {...props} />;
            break;
        default :
            inputElement = <input className={classes.input} {...props} />;
    }

    return (
        <div className={classes.InputElement}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
        </div>
    )

}

export default input;