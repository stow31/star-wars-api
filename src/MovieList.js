import { useContext, useEffect } from 'react';
import { SWContext } from './SWContext';
import { Link } from 'react-router-dom'
import axios from 'axios';

function MovieList() {

    const {
        swFilms, 
        setSwFilms,
        swFavFilms, 
        setSwFavFilms,
        searchResults,
        setSearchResults,
    } = useContext(SWContext);


    // get api results & set local storage
    useEffect(() => {
        axios
        .get("https://swapi.dev/api/films")
        .then(res => {
            
            let apiData = res.data.results.map( (obj, idx) => {
                return {...obj, original_index: idx}
            })

            localStorage.setItem('swFilms', JSON.stringify(apiData))
            setSwFilms(JSON.parse(localStorage.getItem('swFilms')))
            setSearchResults(JSON.parse(localStorage.getItem('swFilms')))
        })
        .catch(error => {
            console.log(error);
        });
    }, [setSearchResults, setSwFilms]);

    // find the index of the movie in the favourites list 
    const getFavListIndex = (movieTitle) =>{
        let index = -1;
        swFavFilms.forEach( (movieObj, idx) => {
            if(movieObj["title"] === movieTitle){
                index = idx;
            }
        })
        return index;
    }

    // add or remove the movie into the fav movie list
    const updateMoviesWithFavs = (updateState, idx) =>{

        localStorage.setItem('swFilms', JSON.stringify([...swFilms.slice(0, idx), {...swFilms[idx], favourite: updateState}, ...swFilms.slice(idx+1)]))

        setSwFilms(JSON.parse(localStorage.getItem('swFilms')))
    }
  
    // when the star is clicked 
    const handleStarClick = (idx) =>{
        if(swFavFilms.length > 0){
            let index = getFavListIndex(swFilms[idx]["title"])
            if (index>-1){
                localStorage.setItem('swFavFilms', JSON.stringify([...swFavFilms.slice(0, index), ...swFavFilms.slice(index+1)]))
                
                setSwFavFilms(JSON.parse(localStorage.getItem('swFavFilms')))

                updateMoviesWithFavs(false, idx)

                
            } else {
                //the movie is not in the favourites list - you need to add
                localStorage.setItem('swFavFilms', JSON.stringify([...swFavFilms, swFilms[idx]]))

                setSwFavFilms(JSON.parse(localStorage.getItem('swFavFilms')))

                updateMoviesWithFavs(true, idx)
            }
        } else {
            // there is nothing on the fav list add this one movie
            localStorage.setItem('swFavFilms', JSON.stringify([swFilms[idx]]))
            setSwFavFilms(JSON.parse(localStorage.getItem('swFavFilms')))

            updateMoviesWithFavs(true, idx)
        }

    }

    return(<div>
        { 
            swFilms && searchResults ? 
                    searchResults
                    .sort((x, y) => {
                        return ((getFavListIndex(x["title"]) !== -1 && getFavListIndex(y["title"]) !== -1) || (getFavListIndex(x["title"]) > -1 && getFavListIndex(y["title"])) > -1 ) ? 0 : getFavListIndex(x["title"]) > -1 ? -1 : 1;
                    })
                    .map( (obj, idx) => 
                        <div key={obj.episode_id} className="movie-results-div">
                            <span>
                                <Link to={`/movie-details/${obj.original_index}`}>{obj.title}</Link>
                            </span>
                            <span
                                key={idx}
                                onClick={ () => handleStarClick(obj.original_index)} 
                                className={getFavListIndex(obj.title)>-1 ? "star highlighted" : "star"}> 
                                ☆
                            </span>
                        </div> )
                
            : 
                <p>loading...</p> 
        }
    </div>
    )
}

export default MovieList;


