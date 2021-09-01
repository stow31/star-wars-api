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


    useEffect(() => {
        axios
        .get("https://swapi.dev/api/films")
        .then(res => {
            localStorage.setItem('swFilms', JSON.stringify(res.data.results))
            setSwFilms(JSON.parse(localStorage.getItem('swFilms')))
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    const getFavListIndex = (movieTitle) =>{
        let index = -1;
        swFavFilms.forEach( (movieObj, idx) => {
            if(movieObj["title"] == movieTitle){
                index = idx;
            }
        })
        return index;
    }

    const updateMoviesWithFavs = (updateState, idx) =>{

        localStorage.setItem('swFilms', JSON.stringify([...swFilms.slice(0, idx), {...swFilms[idx], favourite: updateState}, ...swFilms.slice(idx+1)]))

        setSwFilms(JSON.parse(localStorage.getItem('swFilms')))
    }
  
    const handleStarClick = (idx) =>{
        if(swFavFilms.length > 0){
            let index = getFavListIndex(swFilms[idx]["title"])

            if (index>-1){
                //the movie is in the favourites list - you need to remove
                console.log([...swFavFilms.slice(0, index), ...swFavFilms.slice(index+1)])
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
            localStorage.setItem('swFavFilms', JSON.stringify([swFilms[idx]]))
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
            swFilms ? 
                searchResults ? 
                    searchResults
                    .sort((x, y) => {
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


