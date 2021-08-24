import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import postsReducer from './ducks/posts'
import authReducer from './ducks/auth'


const combinedReducers = combineReducers({
    authReducer,
    postsReducer,
})

const store = createStore(
    combinedReducers,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store