import './App.css';
import MovieList from './MovieList.js'
import { useContext, useEffect } from 'react';
import { SWContext } from './SWContext';

function App() {

  const {
    searchText, 
    setSearchText, 
    swFilms, 
    searchResults,
    setSearchResults
  } = useContext(SWContext);

  // when the search text changes, get the search results
  useEffect(() => {
    getSearchResults()
  }, [searchText]);

  // when the search text changes set the search text value
  const handleTextChange = (e) =>{
    setSearchText(e.target.value);
  }

  // get the search results from the search text
  const getSearchResults = () =>{

    let fullMovieList = JSON.parse(localStorage.getItem('swFilms'));

    if (searchText.trim() === ""){
      setSearchResults(JSON.parse(localStorage.getItem('swFilms')))
    } else {
      let filteredArr = fullMovieList
      ?.filter( obj => {
        if (obj.title.toUpperCase().includes(searchText.toUpperCase())) { 
          return obj
        }
      })
      
      setSearchResults(filteredArr)
    }
  } 

  return (
    <div className="App">
      <h1 className="main-heading">Star Wars API</h1>
      <input className="search-box-input" onChange={handleTextChange} placeholder="Search Movies" type="text" />  
      <MovieList />
    </div>
  );
}

export default App;
