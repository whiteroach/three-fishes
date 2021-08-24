import axios from 'axios'

export const Types = {
    SET_USER_SESSION: 'auth/SET_USER_SESSION',
    LOGOUT:'auth/LOGOUT'
}

//REDUCER
const INITIAL_STATE = {
    loggedIn: false,
    username:'',
    token:'',
    //created at
    //expire at
}

export default function reducer(state = INITIAL_STATE, action){
    
    console.log(action)
    switch(action.type){
        case Types.SET_USER_SESSION:
            return {
            ...state,    
            loggedIn:true,
            username:action.payload.username,
            token: action.payload.token
        };
        break
        case Types.LOGOUT:
            return {
                loggedIn:false,
                username:'',
                token:''
            }
        default:return state;
    }
}

//ACTIONS
export const Creators = {
    
    // set_auth_data: (token, username) => {
    //     console.log(token)
    //     return (dispatch) => {
    //         console.log('hoy')
    //         console.log(token, 'from reducer')
    //         dispatch({ type: Types.SET_USER_SESSION, payload: { token,username } })
    //     }
    // },
    set_initial_data: (login) => {
        return (dispatch) => {
            // axios.post('http://localhost:8080/login',login)
            // .then(
            //     res => {
                    
            //         console.log(res.data);
            //         localStorage.setItem('blogToken',res.data.token)
            //         const response = res.data
            //         dispatch({type: Types.SET_USER_SESSION, payload:response})

            //     }
            // )
            dispatch({type: Types.SET_USER_SESSION, payload:login})
        }
    },
    logout:() =>{
        return (dispatch) => {
            dispatch({type: Types.LOGOUT})
        }
    }
}