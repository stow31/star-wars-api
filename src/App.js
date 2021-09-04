import './App.css';
import MovieList from './MovieList.js'
import { useContext, useEffect } from 'react';
import { SWContext } from './SWContext';

function App() {

  const {
    searchText, 
    setSearchText, 
    searchResults,
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
<<<<<<< HEAD

    let fullMovieList = JSON.parse(localStorage.getItem('swFilms'));

    if (searchText.trim() === ""){
      setSearchResults(JSON.parse(localStorage.getItem('swFilms')))
    } else {
      let filteredArr = fullMovieList
=======
    if (searchText.trim() === ""){
      setSearchResults()
    } else {
      let filteredArr = swFilms
      ?.map( (obj, idx) => {
        return {...obj, original_index: idx}
      })
>>>>>>> parent of fcf838c... fixed bug merging the title and not getting the correct index when star is clicked
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
<<<<<<< HEAD
      <input className="search-box-input" onChange={handleTextChange} placeholder="Search Movies" type="text" />  
      <MovieList />
=======
      <input onChange={handleTextChange} placeholder="Search Movies" type="text" />  

      { 
        // searchResults ?  
        // <SearchResults/> :
        <MovieList />
      }
>>>>>>> parent of fcf838c... fixed bug merging the title and not getting the correct index when star is clicked
    </div>
  );
}

export default App;
