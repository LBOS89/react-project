import { useEffect, useState } from 'react';
import './Orders.scss';
import api from './../../api';
import LoadingSpin from 'react-loading-spin';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orderToDelete, setOrderToDelete] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        api.get('/orders')
        .then((response) => {
            if(response.status === 200) {
                setOrders(response.data);
                setLoading(false);
            }
        })
        .catch((error) => {
            setError(true);
            if(error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
            } else if(error.request) {
                console.log(error.request);
            } else {
                console.log(error.message);
            }
        });
    }, []);  
    
    const deleteOrder = (id) => {
        setOrderToDelete(id);
        api.delete('/orders/' + id)
        .then((response) => {
            if(response.status === 200) {
                let updatedOrders = orders.filter(order => order.id !== id)
                setOrders(updatedOrders);
                setOrderToDelete('');
            }
        })
        .catch((error) => {
            setError(true);
            if(error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
            } else if(error.request) {
                console.log(error.request);
            } else {
                console.log(error.message);
            }
        })
    }

    return (
        <div>
            {loading &&
                <div className='loading'>
                    <p>Fetching orders. Please wait...</p>
                    <LoadingSpin 
                        width='5px'
                        size='30px'
                        primaryColor='#051f0f'
                        secondaryColor='#92BFB1'
                    />
                </div>
            }

            {error &&
                <div className='loading'>Sorry, something went wrong</div>
            }

            {!loading && orders.length === 0 && !error &&
                <div className='loading'>No orders to display.</div>
            }

            {!loading && orders.length > 0 && !error &&
                <div className='orderDisplay'>
                    <p className='totalOrders'>Total orders received: {orders.length}</p>
                    {orders.map((order, index) => (
                        <div key={index} className='orderDiv'>
                            <div className='orderId'>Order No. {(order.id).substring(0, 5)}</div>
                            <div className='orderDetails'>Style: {order.style}</div>
                            <div className='orderDetails'>Crust: {order.crust}</div>
                            <div className='orderDetails'>Extra Cheese: {order.cheese === true ? 'Yes' : 'No'}</div>
                            <div className='orderDetails'>Name: {order.name}</div>
                            <div className='orderDetails'>Address: {order.address}</div>
                            <div className='deleteDiv'>
                                <button onClick={() => deleteOrder(order.id)} className='deleteButton'>Delete Order</button>
                                {orderToDelete === order.id && 
                                    <div className='deleting'>Deleting . . .</div>
                                }
                            </div>
                        </div>
                    ))}                
                </div>  
            }
            
                   
        </div>            
    );  
}