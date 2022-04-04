import './Header.scss';
import { GiFullPizza } from 'react-icons/gi';

function Header() {
    return (
    <header>
        <div className='headerDiv'>
            <div className='title'><GiFullPizza /> One Free Pizza</div>
        </div>
    </header>
    );
}

export default Header;