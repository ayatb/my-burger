import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../Navigation/../UI/Button/Button';
import classes from './CheckoutSummary'

const checkoutSummary = (props) => {

    return(
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!!</h1>
            <div style={{width:'300px', height:'300px', margin:'auto'}}> 
                <Burger ingredients={props.ingredients}/>
                <Button buttonType='Danger' cliked={props.checkoutSummaryCanceled}>Cancel</Button>
                <Button buttonType='Success' cliked={props.checkoutSummaryPurshased}>Continue</Button>
            </div>
        </div>
    );
}
export default checkoutSummary;