import { useContext, useEffect } from 'react';
import { SWContext } from './SWContext';
import axios from 'axios';

function MovieList() {

    const {
        swFilms, 
        setSwFilms,
    } = useContext(SWContext);


    useEffect(() => {
        axios
        .get("https://swapi.dev/api/films")
        .then(res => {
            setSwFilms(res.data.results)
            console.log("API SET")
        })
        .catch(error => {
            console.log(error);
        });
    }, []);
  
    const handleStarClick = (idx) =>{
        console.log("star clicked")
        console.log(idx)

        if (swFilms[idx]["favourite"]){
            setSwFilms([...swFilms.slice(0, idx), {...swFilms[idx], favourite: false}, ...swFilms.slice(idx+1)]);
        } else {
            setSwFilms([...swFilms.slice(0, idx), {...swFilms[idx], favourite: true}, ...swFilms.slice(idx+1)]);
        }

    }

    return(<div>
        { 
            swFilms ? 
            swFilms.map( (obj, idx) => 
                <div className="movie-results-div">
                    <span key={obj.episode_id}>{obj.title}</span>
                    <span
                        key={idx}
                        id={idx}
                        onClick={ (e) => handleStarClick(idx)} 
                        className={swFilms[idx]["favourite"] ? "star highlighted" : "star"}> 
                        ☆
                    </span>
                </div> ) : 
            <p>loading...</p> 
        }
    </div>)
}

export default MovieList;

