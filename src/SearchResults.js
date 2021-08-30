import { useContext } from 'react';
import { SWContext } from './SWContext';

function SearchResults() {

    const {
        swFilms, 
        setSwFilms,
        searchResults
    } = useContext(SWContext);

    const handleStarClick = (idx) =>{
      console.log("star clicked")
      console.log(idx)

      if (swFilms[idx]["favourite"]){
          setSwFilms([...swFilms.slice(0, idx), {...swFilms[idx], favourite: false}, ...swFilms.slice(idx+1)]);
      } else {
          setSwFilms([...swFilms.slice(0, idx), {...swFilms[idx], favourite: true}, ...swFilms.slice(idx+1)]);
      }
    }

    return (
      <div>
        {      
            swFilms ? 
            searchResults.map( (obj, idx) => 
                <div className="movie-results-div">
                    <span>{obj.title}</span>
                    <span
                        key={idx}
                        onClick={ (e) => handleStarClick(obj.original_index)} 
                        className={swFilms[obj.original_index]["favourite"] ? "star highlighted" : "star"}> 
                        ☆
                    </span>
                </div> ) : 
            <p>loading...</p> 
        }
      </div>
    );
  }
  
export default SearchResults;