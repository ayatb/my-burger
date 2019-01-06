import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    {"label" : "Salade", "type" : "salade"},
    {"label" : "Becon", "type" : "becon"},
    {"label" : "Cheese", "type" : "cheese"},
    {"label" : "Meat", "type" : "meat"}
];

const buildControls = (props) =>(
        <div className={classes.BuildControls}>
            <p> Price : <strong>{props.price.toFixed(2)}</strong> </p>
            {
                controls.map(ctrl => {
                    return <BuildControl 
                            key = {ctrl.label} 
                            label = {ctrl.label}
                            added = {() => props.addIngredient(ctrl.type)}
                            removed = {() => props.removeIngredient(ctrl.type)}
                            disabled = {props.disabled[ctrl.type]}/>
                })
            }
            <button className={classes.OrderButton} 
                    disabled={!props.purchaseable}
                    onClick={props.order}>Order Now</button>
        </div>
    );


export default buildControls;