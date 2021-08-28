import React, {useState, createContext} from 'react-state';

export const SWContext = createContext();

export function SWProvider(props){

    const [apiRes, setApiRes] = useState();

    return <SWContext.Provider value={
        {apiRes,
        setApiRes}
    }>
        {props.children}
    </SWContext.Provider>

}