import React, {Component} from 'react';
import PropTypes from 'prop-types'
import classes from './BurgerIngredient.css';

class BurgerIngerdient extends Component {
    render(){
        let ingerdient = null;
        switch(this.props.type) {
            case('bread-bottom') :
                return <div className={classes.BreadBottom}/>

            case('bread-top') :
                return <div className={classes.BreadTop}/>

            case('seeds1') :
                return <div className={classes.Seeds1}/>

            case('seeds2') :
                return <div className={classes.Seeds2}/>

            case('meat') :
                return <div className={classes.Meat}/>

            case('cheese') :
                return <div className={classes.Cheese}/>

            case('salade') :
                return <div className={classes.Salad}/>

            case('becon') :
                return <div className={classes.Bacon}/>
            default :
                return ingerdient;
        }
    }        
}

BurgerIngerdient.propTypes = {
    type : PropTypes.string
}
export default BurgerIngerdient;