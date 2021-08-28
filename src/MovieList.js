import { useContext } from 'react';
import { SWContext } from './SWContext';
import axios from 'axios';

function MovieList() {

    const {apiRes, setApiRes} = useContext(SWContext);
  
    axios
    .get("https://swapi.dev/api/films")
    .then(res => {
        setApiRes(res.data.results)
        console.log(apiRes)
    })
    .catch(error => {
        console.log(error);
    });

    return(<div>
        <ul>
        { 
            apiRes ? 
            apiRes.map( obj => <li>{obj.title}</li>) : 
            <p>loading...</p> 
        }
        </ul>
    </div>)
}

export default MovieList;