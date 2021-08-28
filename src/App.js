import './App.css';
import { useContext } from 'react';
import { SWContext } from './SWContext';
import axios from 'axios';


function App() {

  const {apiRes, setApiRes} = useContext(SWContext);

  return (
    <div className="App">
      <h1 class="main-heading">Star Wars API</h1>

      <form action="">
        <input type="text" />  
        <button>search</button>
      </form>    

      <ul>
        <li>Movie name</li>
        <li>Movie name</li>
        <li>Movie name</li>
      </ul>

    </div>
  );
}

export default App;
