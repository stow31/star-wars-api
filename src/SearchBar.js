import { useContext, useEffect } from 'react';
import { SWContext } from './SWContext';

function SearchBar(){

    const {
        searchText, 
        setSearchText, 
        swFilms, 
        setSearchResults
      } = useContext(SWContext);

      // get the search results from the search text
      const getSearchResults = () =>{
        let filteredArr = swFilms
        ?.filter( obj => {
          if (obj.title.toUpperCase().includes(searchText.toUpperCase())) { 
            return obj
          }
          return null
        })
        setSearchResults(filteredArr)
      } 

    
      // when the search text changes, get the search results
      useEffect(() => {
        getSearchResults()
      }, [searchText]);
    
      // when the search text changes set the search text value
      const handleTextChange = (e) =>{
        setSearchText(e.target.value);
      }
    
 
    return(
        <div>
            <h1 className="main-heading">Star Wars API</h1>
            <input className="search-box-input" onChange={handleTextChange} placeholder="Search Movies" type="text" />  
        </div>       
    )
}

export default SearchBar;