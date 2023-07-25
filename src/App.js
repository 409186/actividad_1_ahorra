import './App.css';
import Search from "./components/Searching/Search";
import Favorites from './components/Favorites/Favorites';
import { useState } from 'react';

function App() {

  const [option, setOption] = useState('home')

  const handleClick = (opt) => {
    setOption(opt)
  }

  return (
    <div className="App">
      <div className='sidebar_pokemon'>
        <h2 onClick={() => handleClick('home')}>Home</h2>
        <h2 onClick={() => handleClick('favorites')}>Favorites</h2>
      </div>
      <div className='results_pokemon'>
        <h1>Pokemon</h1>
        {option === 'home' &&  <Search/>}
        {option === 'favorites' &&  <Favorites/>}
      </div>
    </div>
  );
}

export default App;
