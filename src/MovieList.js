import { useContext, useEffect } from 'react';
import { SWContext } from './SWContext';
import axios from 'axios';

function MovieList() {

    const {
        swFilms, 
        setSwFilms,
        swFavFilms, 
        setSwFavFilms,
        searchResults
    } = useContext(SWContext);


    // get api results & set local storage
    useEffect(() => {
        axios
        .get("https://swapi.dev/api/films")
        .then(res => {
<<<<<<< HEAD
            let data = res.data.results.map( (obj, idx) => {
                return {...obj, original_index: idx}
            })

            localStorage.setItem('swFilms', JSON.stringify(data))

            // setSwFilms(JSON.parse(localStorage.getItem('swFilms')))

            setSearchResults(JSON.parse(localStorage.getItem('swFilms')))
=======
            localStorage.setItem('swFilms', JSON.stringify(res.data.results))
            setSwFilms(JSON.parse(localStorage.getItem('swFilms')))
>>>>>>> parent of fcf838c... fixed bug merging the title and not getting the correct index when star is clicked
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    // find the index of the movie in the favourites list 
    const getFavListIndex = (movieTitle) =>{
        let index = -1;
        swFavFilms.forEach( (movieObj, idx) => {
            if(movieObj["title"] == movieTitle){
                index = idx;
            }
        })
        return index;
    }

    // add or remove the movie into the fav movie list
    const updateMoviesWithFavs = (updateState, idx) =>{
<<<<<<< HEAD
        localStorage.setItem('swFilms', JSON.stringify([...searchResults.slice(0, idx), {...searchResults[idx], favourite: updateState}, ...searchResults.slice(idx+1)]))
=======

        localStorage.setItem('swFilms', JSON.stringify([...swFilms.slice(0, idx), {...swFilms[idx], favourite: updateState}, ...swFilms.slice(idx+1)]))
>>>>>>> parent of fcf838c... fixed bug merging the title and not getting the correct index when star is clicked

        setSearchResults(JSON.parse(localStorage.getItem('swFilms')))
    }
  
    // when the star is clicked 
    const handleStarClick = (idx) =>{
        if(swFavFilms.length > 0){
<<<<<<< HEAD
            console.log(idx)
            let index = getFavListIndex(searchResults[idx]["title"])
=======
            let index = getFavListIndex(swFilms[idx]["title"])
>>>>>>> parent of fcf838c... fixed bug merging the title and not getting the correct index when star is clicked

            if (index>-1){
                //the movie is in the favourites list - you need to remove
                console.log([...swFavFilms.slice(0, index), ...swFavFilms.slice(index+1)])
                localStorage.setItem('swFavFilms', JSON.stringify([...swFavFilms.slice(0, index), ...swFavFilms.slice(index+1)]))
                
                setSwFavFilms(JSON.parse(localStorage.getItem('swFavFilms')))

                updateMoviesWithFavs(false, idx)

                
            } else {
                //the movie is not in the favourites list - you need to add
                localStorage.setItem('swFavFilms', JSON.stringify([...swFavFilms, searchResults[idx]]))

                setSwFavFilms(JSON.parse(localStorage.getItem('swFavFilms')))

                updateMoviesWithFavs(true, idx)
            }
        } else {
            // there is nothing on the fav list add this one movie
            localStorage.setItem('swFavFilms', JSON.stringify([searchResults[idx]]))
            setSwFavFilms(JSON.parse(localStorage.getItem('swFavFilms')))

            updateMoviesWithFavs(true, idx)
        }

        // localStorage.setItem('swFilms', JSON.stringify(swFilms.sort((x, y) => {
        //     return (x["favourite"] === y["favourite"])? 0 : x["favourite"] ? -1 : 1;
        // })))
        // setSwFilms(JSON.parse(localStorage.getItem('swFilms')))
    }

    return(<div>

        { 
<<<<<<< HEAD
            // swFilms && 
            searchResults ? 
            searchResults
                .sort((x, y) => {
=======
            swFilms ? 
                searchResults ? 
                    searchResults
                    .sort((x, y) => {
>>>>>>> parent of fcf838c... fixed bug merging the title and not getting the correct index when star is clicked
                    return (getFavListIndex(x["title"]) !== -1 && getFavListIndex(y["title"]) !== -1 || getFavListIndex(x["title"]) > -1 && getFavListIndex(y["title"]) > -1 ) ? 0 : getFavListIndex(x["title"]) > -1 ? -1 : 1;
                    })
                    .map( (obj, idx) => 
                        <div className="movie-results-div">
                            <span>{obj.title}</span>
                            <span
                                key={idx}
                                onClick={ (e) => handleStarClick(obj.original_index)} 
                                className={getFavListIndex(obj.title)>-1 ? "star highlighted" : "star"}> 
                                ☆
                            </span>
                        </div> )
                :
                    swFilms
                        .sort((x, y) => {
                            return (getFavListIndex(x["title"]) !== -1 && getFavListIndex(y["title"]) !== -1 || getFavListIndex(x["title"]) > -1 && getFavListIndex(y["title"]) > -1 ) ? 0 : getFavListIndex(x["title"]) > -1 ? -1 : 1;
                        })
                        .map( (obj, idx) => 
                            <div className="movie-results-div">
                                <span key={obj.episode_id}>{obj.title}</span>
                                <span
                                    key={idx}
                                    id={idx}
                                    onClick={ (e) => handleStarClick(idx)} 
                                    className={getFavListIndex(obj.title)>-1 ? "star highlighted" : "star"}> 
                                    ☆
                                </span>
                            </div> ) 
                
            : 
                <p>loading...</p> 
        }
    </div>)
}

export default MovieList;


