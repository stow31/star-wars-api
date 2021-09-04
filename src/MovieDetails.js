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
    }, [id]);

    return(
        <div>
            <div className="header-div">
                <p><Link to="/">Back</Link></p>
            </div>
            <h1>{movieDetails.title}</h1>
        </div>
    )
}

export default MovieDetails