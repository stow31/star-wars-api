import React, {useState, createContext} from 'react';

export const SWContext = createContext();

export function SWProvider(props){

    const [swFilms, setSwFilms] = useState(JSON.parse(localStorage.getItem('swFilms')));
    const [swFavFilms, setSwFavFilms] = useState(JSON.parse(localStorage.getItem('swFavFilms')) ?? []);
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState();
    const [movieDetails, setMovieDetails] = useState(JSON.parse(localStorage.getItem('swFilms')) ?? {});

    return <SWContext.Provider value={
        {swFilms,
        setSwFilms,
        searchText,
        setSearchText,
        searchResults,
        setSearchResults,
        swFavFilms, 
        setSwFavFilms,
        movieDetails, 
        setMovieDetails
        }
    }>
        {props.children}
    </SWContext.Provider>

}