import React from 'react';
import classes from './Order.css';

const order = () => {
    return (
        <div className={classes.Order}>
            <p>Ingredient : Salade(1)</p>
            <p>Price : <strong>USD 5.5</strong></p>
        </div>
    );
}

export default order;