import React, {Component} from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component{

    state = {
        ContactData  : {
            name : '',
            email : '',
            adress : {
                street : '',
                postalcode : ''
            }
        },
        loading : false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        console.log(this.props.totalPrice);

        this.setState({loading:true});
        const order = {
            ingredients : this.props.ingredients,
            totalPrice : this.props.totalPrice,
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
        axios.post('/orders.json', order)
                .then(response =>{
                    console.log(response);
                    this.setState({loading:false});
                    this.props.history.push('/');
                })
                .catch(error =>{
                    console.log(error);
                    this.setState({loading:false});
                }
                ) 

    }

    render(){
        let from = (<form>
            <input className={classes.Input} type="text" name="name" placeholder="Name"/>
            <input className={classes.Input} type="text" name="email" placeholder="Email"/>
            <input className={classes.Input} type="text" name="street" placeholder="Street"/>
            <input className={classes.Input} type="text" name="postalcode" placeholder="Postal code"/>
            <Button buttonType='Success'cliked={this.orderHandler}>Submit</Button>
        </form>);
        
        if(this.state.loading){
            from = <Spinner/>;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact</h4>
                {from}
            </div>
        );
    }

}

export default ContactData;