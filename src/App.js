import './App.css';
import MovieList from './MovieList.js'
import { useContext, useEffect } from 'react';
import { SWContext } from './SWContext';

function App() {

  const {
    searchText, 
    setSearchText, 
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
      ?.filter( obj => {
        if (obj.title.includes(searchText)) { 
          return obj
        }
      })
      
      setSearchResults(filteredArr)
  } 

  return (
    <div className="App">
      <h1 className="main-heading">Star Wars API</h1>
      <input onChange={handleTextChange} placeholder="Search Movies" type="text" />  

      { 
        <MovieList />
      }
    </div>
  );
}

export default App;
