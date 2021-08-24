import React,{useState, useEffect, useContext} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Post from './Post'


const PostsContainer = (authState) => {
    // const[posts, dispatch] = useContext(PostContext)



    useEffect(()=>{
        // const userId =localStorage.getItem('blogToken')
        // const decodedId = jwtDecode(userId)
        if( authState.authState.token !== null){
            const token = authState.authState.token
            console.log(token);
            axios.post('http://localhost:8080/post/displayPosts',{token})
            // axios.post('http://localhost:8080/post/displayPosts',decodedId)
            .then(res=>{
                // setBlogPosts(res.data)
                dispatch({type:'SET_POSTS', payload: res.data})
            })

        }
        
    },[])
    

    return (
        <div className="container-posts">
            <p>post-container</p>
       
            {posts.map((item, index)=>{
                // console.log(item);
                return(
             
                    <Post
                    id={item._id}
                    title={item.title}
                    content={item.content}
                    created_at={item.created_at}
                    comments={item.comments}
                    added_by={item.added_by}
                    />
                )
            })}
        </div>
    )
}

const mapStateToProps = (state) => ({
    authState:state.authReducer
})

export default connect(mapStateToProps)(PostsContainer)
