import axios from "axios"

export const Types = {
    SET_POSTS:'posts/SET_POSTS'
}

//REDUCER
const initialState = {
    isLoading:true,
    posts:[]
}

export default function reducer(state= initialState, action){
    switch(action.type){
        case Types.SET_POSTS:return {
            ...state,
            posts:action.payload
        };
        default:return state
    }

}

//ACTIONS
export const Creators = {
    getPosts: (posts) => {
        return (dispatch) => {
            dispatch({
                type:Types.SET_POSTS,
                payload:posts
            })
        }
    },
    get_post:(token) => {
        return (dispatch) => {
            axios.post('http://localhost:8080/post/displayPosts',{token})
            .then(res => {
                dispatch({type: Types.SET_POSTS, payload: res.data})
            })
        }
    }
}