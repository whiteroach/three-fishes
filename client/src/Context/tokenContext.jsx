import React,{ createContext, useReducer} from 'react'

// import axios from 'axios'

const reducer = (state,action) => {
    switch(action.type){
        case 'SET_TOKEN':return {token:action.payload}; 
        default: return state;
    }
}

export const TokenContext = createContext();

export const TokenProvider = ({children}) => {
    const InitialState = {token:'no'}

    const [token, dispatch] = useReducer(reducer,InitialState)


    return(
        <TokenContext.Provider value={[token, dispatch]}>
            {children}
        </TokenContext.Provider>
    )
}


