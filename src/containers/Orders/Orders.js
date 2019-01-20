import React, {Component} from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders :[],
        loading : true
    }

    componentDidMount(){
        axios.get('/orders.json')
            .then(response => {
                console.log(response.data)
                const fetchedOrders = [];
                for(let key in response.data){
                    fetchedOrders.push({
                        ...response.data[key],
                        id : key
                    });  
                }
                this.setState({orders : fetchedOrders, loading : false})

            })
            .catch(error=>{
                this.setState({loading : false})
            })
    }

    render(){
        return(
            <div>
                <Order/>
                <Order/>
            </div>
        );
    }
}
export default withErrorHandler(Orders,axios);