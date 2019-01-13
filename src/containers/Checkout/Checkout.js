import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{

    state = {
        ingredients : {
            salade : 1,
            becon : 1,
            meat : 1,
            cheese : 1
        }
    }

    /* componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for(let param in query.entries){
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients : ingredients});
    } */

    checkoutSummaryCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutSummaryPurshasedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return (
            <div>
                <CheckoutSummary 
                        ingredients={this.state.ingredients} 
                        checkoutSummaryCanceled = {this.checkoutSummaryCanceledHandler}
                        checkoutSummaryPurshased = {this.checkoutSummaryPurshasedHandler}/>
            </div>
        );
    }

}

export default Checkout;