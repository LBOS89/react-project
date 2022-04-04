import { NavLink } from 'react-router-dom';
import './MainMenu.scss';

export default function MainMenu() {
    return (
        <nav className='banner'>
            <NavLink to='/' className='link'>Home</NavLink>
            <NavLink to='/get-your-pizza' className='link'>Get Your Pizza</NavLink>
            <NavLink to='/orders' className='link'>Orders</NavLink>
        </nav>
    );
}