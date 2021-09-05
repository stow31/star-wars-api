import './App.css';
import MovieList from './MovieList.js'
import SearchBar from './SearchBar.js'
import MovieDetails from './MovieDetails.js'
import { Switch, Route } from 'react-router-dom'


function App() {

  return (
    <div className="App">
      <Switch>

      <Route path="/movie-details/:id">
          <MovieDetails/>
        </Route>

        <Route path="/">
          <SearchBar/>
          <MovieList />
        </Route>

      </Switch>

    </div>
  );
}

export default App;
