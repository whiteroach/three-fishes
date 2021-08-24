import React from 'react'
import Navbar from './Navbar'
import BlogForm from './BlogForm'
// import PostsContainer from './PostsContainer'
// import Profile from './Profile'
import OneFish from '../one_fish.png'
import { connect } from 'react-redux'
const Main = (authState) => {
    return (
        <div className='main'>
            <Navbar/>
            {/* <Profile/> */}
            <img src={OneFish} alt="one-fish"></img>
            <p>blog here</p>
            {/* <BlogForm/>
            <PostsContainer/> */}
            <p>{authState.authState.username}</p>
            <button onClick={()=>{console.log(authState.authState, authState);}}>auth</button>
            <p>{authState.authState.token}</p>
        </div>
    )
}
const mapStateToProps = (state) => ({
    authState:state.authReducer
})

export default connect(mapStateToProps)(Main)

