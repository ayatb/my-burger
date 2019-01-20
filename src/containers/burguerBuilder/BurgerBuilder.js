import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICES = {
    salade : 0.30,
    becon : 0.70,
    cheese : 0.50,
    meat : 1.30
};

class BurgerBuilder extends Component {
    state = {
        ingredients : null,
        totalPrice : 4,
        purchaseable : false,
        purchaising : false,
        loading : false,
        error : false
    }

    componentDidMount(){
        axios.get('https://my-burger-df61b.firebaseio.com/ingredients.json')
                .then(response => {
                    this.setState({ingredients : response.data});
                })
                .catch(error =>{
                    this.setState({error : true})
                })
    }
   

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;
        //update price
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENTS_PRICES[type];
        
        this.setState({ingredients : updatedIngredients, totalPrice : newPrice});
        this.updatePurchaseable(updatedIngredients);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount > 0 ){
            const newCount = oldCount - 1;
            const updatedIngredients = {...this.state.ingredients};
            updatedIngredients[type] = newCount;
            //update price
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - INGREDIENTS_PRICES[type];
            
            this.setState({ingredients : updatedIngredients, totalPrice : newPrice});
            this.updatePurchaseable(updatedIngredients);
        }

    }

    purchaisingHandler = () => {
        this.setState({ purchaising : true});
    }

    modalClosedHandler = () => {
        this.setState({ purchaising : false});
    }

    purchaseCountinueHandler = () => {
        //alert('You countinue purchaising');
        console.log(this.props)
        /* this.setState({loading:true});
        const order = {
            ingredients : this.state.ingredients,
            totalPrice : this.state.totalPrice,
            customer : {
                name :'Ayat',
                adress :{
                    street : 'test street',
                    zipCode : '92200',
                    country : 'France'
                },
                email :'ayat@ayat.com'
            },
            deliveryMethod : 'Fast'
            

        }
        axios.post('/order.json', order)
                .then(response =>{
                    console.log(response);
                    this.setState({loading:false, purchaising :false});
                })
                .catch(error =>{
                    console.log(error);
                    this.setState({loading:false, purchaising : false});
                }
                ) */
                const queryParams = [];
                for (let i in this.state.ingredients){
                    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
                }
                queryParams.push('price=' + this.state.totalPrice);
                const queryString = queryParams.join('&');
                this.props.history.push({
                    pathname : '/checkout',
                    search : '?' + queryString
                })

    }

    updatePurchaseable(ingredients){
        const keys = Object.keys(ingredients);
        const sum = keys.map(key => {return ingredients[key]}).reduce((acc,el) => {return acc + el},0)
        this.setState({purchaseable : sum > 0});
    };

    

    render(){
        const disabled = { ...this.state.ingredients};
        for(var key in disabled){
            disabled[key] =  disabled[key] <= 0;
        }

       
    let orderSummary = null;
    let burger = (this.state.error)? <p>Ingredients can't be loaded</p>: <Spinner/>
    if(this.state.ingredients){
        burger = (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                    <BuildControls addIngredient={this.addIngredientHandler} 
                                    removeIngredient={this.removeIngredientHandler} 
                                    price={this.state.totalPrice}
                                    disabled = {disabled}
                                    order={this.purchaisingHandler}
                                    purchaseable = {this.state.purchaseable}
                                    />
            </Aux>
        );

        orderSummary = <OrderSummary ingredients={this.state.ingredients}
        totalprice={this.state.totalPrice.toFixed(2)} 
        countinue = {this.purchaseCountinueHandler}
        cancel = {this.modalClosedHandler} />;
    }
    
    if(this.state.loading) {
        orderSummary = <Spinner/>
        };

        return (
            <Aux>
                <Modal show={this.state.purchaising} modalClosed={this.modalClosedHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }

}
export default withErrorHandler( BurgerBuilder, axios );