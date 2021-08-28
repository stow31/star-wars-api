import './App.css';
import MovieList from './MovieList.js'

function App() {
  

  return (
    <div className="App">
      <h1 className="main-heading">Star Wars API</h1>

      <form action="">
        <input type="text" />  
        <button>search</button>
      </form>    
        <MovieList />
    </div>
  );
}

export default App;
