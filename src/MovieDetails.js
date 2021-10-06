import { useContext, useEffect } from 'react';
import { SWContext } from './SWContext';
import { Link, useParams } from 'react-router-dom'


function MovieDetails(){

    const {
        swFilms,
        movieDetails,
        setMovieDetails
    } = useContext(SWContext);

    let { id } = useParams()

    useEffect(() => {
        setMovieDetails(swFilms[id])
    }, [id, setMovieDetails, swFilms]);

    return(
        <div className="movie-details-div">
            <div className="header-div">
                <p><Link to="/">Back</Link></p>
                <h1 className="heading-text">{movieDetails.title}</h1>
            </div>
            <div className="body-div">
                {Object.keys(movieDetails).map((key)=>(
                    <p>
                        <span className="moviedetail-key-span">{`${key}:`}</span> <span className="moviedetail-value-span">{`${movieDetails[key]}`}</span>
                    </p>
                ))}
            </div>

        </div>
    )
}

export default MovieDetails