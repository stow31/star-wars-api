import './App.css';
import MovieList from './MovieList.js'
import SearchResults from './SearchResults.js'
import { useContext, useEffect } from 'react';
import { SWContext } from './SWContext';

function App() {

  const {
    searchText, 
    setSearchText, 
    searchResults,
    swFilms, 
    setSearchResults
  } = useContext(SWContext);

  useEffect(() => {
    getSearchResults()
  }, [searchText]);

  const handleTextChange = (e) =>{
    setSearchText(e.target.value);
  }

  const getSearchResults = () =>{
    let filteredArr = swFilms
      ?.map( (obj, idx) => {
        return {...obj, original_index: idx}
      })
      ?.filter( obj => {
        if (obj.title.includes(searchText)) { 
          return obj
        }
      })


    console.log(filteredArr);
    setSearchResults(filteredArr)
  } 

  return (
    <div className="App">
      <h1 className="main-heading">Star Wars API</h1>
      <input onChange={handleTextChange} placeholder="Search Movies" type="text" />  

      { 
        searchResults ?  
        <SearchResults/> :
        <MovieList />
      }
    </div>
  );
}

export default App;
