import React from 'react';
import Aux from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const summary = Object.keys(props.ingredients).map(key => {
            return <li><span>{key} : </span>{props.ingredients[key]}</li>
    })
    return(

        <Aux>
            <h3>Your Order</h3>
            <ul>
                 {summary}   
            </ul>
            <p><strong> Total price : {props.totalprice}</strong></p>
            <Button buttonType = 'Danger' cliked={props.cancel}>Cancel</Button>
            <Button buttonType = 'Success' cliked={props.countinue}>Coutinue</Button>
        </Aux>
    )
    };

export default orderSummary;
