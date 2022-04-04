import Header from './components/Header/Header';
import Home from './components/Home/Home';
import MainMenu from './components/MainMenu/MainMenu';
import GetYourPizza from './components/GetYourPizza/GetYourPizza';
import Orders from './components/Orders/Orders';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <MainMenu />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/get-your-pizza' element={<GetYourPizza />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
    </div>
    
  );
}

export default App;