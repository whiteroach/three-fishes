import React,{ createContext, useReducer} from 'react'

// import axios from 'axios'

const reducer = (state,action) => {
    switch(action.type){
        case 'SET_POSTS': return action.payload
        default: return state;
    }
}

export const PostContext = createContext();

export const PostProvider = ({children}) => {
    const InitialState = []
    // if(localStorage.getItem('blogToken')== !null){
    //     const userId = localStorage.getItem('blogToken')
    //     const decodedId = jwtDecode(userId)

    // }
    //  const InitialState = {
    //     isLoading: false,
    //     data = []
    // }

    const [posts, dispatch] = useReducer(reducer,InitialState)


    return(
        <PostContext.Provider value={[posts,dispatch]}>
        {/* // <PostContext.Provider value={[posts,dispatch,decodedId]}> */}
            {children}
        </PostContext.Provider>
    )
}


