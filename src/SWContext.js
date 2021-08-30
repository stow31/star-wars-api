import React, {useState, createContext} from 'react';

export const SWContext = createContext();

export function SWProvider(props){

    const [swFilms, setSwFilms] = useState();
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState();

    return <SWContext.Provider value={
        {swFilms,
        setSwFilms,
        searchText,
        setSearchText,
        searchResults,
        setSearchResults
        }
    }>
        {props.children}
    </SWContext.Provider>

}