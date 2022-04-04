import { NavLink } from 'react-router-dom';
import './Home.scss';

export default function Home() {

    return (
        <div className='homeDiv'>
            <h2 className='homeHeader'>Welcome to One Free Pizza!</h2> 
            <p className='homeText'>We love our community and want to give back with FREE PIZZA for everyone who orders through our web app!</p>       
            <p className='homeText'>Head to <NavLink to='/get-your-pizza' className='innerLink'>Get Your Pizza</NavLink> to claim yours now!</p>    
        </div>            
    );  
}