import axios from 'axios'
import React,{useContext} from 'react'
import {PostContext} from '../Context/postContext'
import Modal from './Modal'
import jwtDecode from 'jwt-decode'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
const Post = ({title, content, created_at,added_by, id}) => {
    const[posts, dispatch ] = useContext(PostContext)

    // const [modal, setModal] = useState('false')
    // const showModal = () => {
    //     setModal('true')
    // }

    // const decodedId = jwtDecode(userId)
    const token = localStorage.getItem('blogToken')
    
    const deletePost = () => {
        axios.delete('http://localhost:8080/post/deletePost/' + id)
        .then(
            axios.post('http://localhost:8080/post/displayPosts',{token})
            .then(res=>{
                dispatch({type:'SET_POSTS', payload: res.data})
            })
        )
    }

    return (
        <div className="blogPost">
            <h4>{title}</h4>
            <p>{ReactHtmlParser(content)}</p>
            <p>{created_at}</p>
            <p>{added_by.username}</p>
            <button type='button' onClick={deletePost}>x</button>
            {/* <button type='button' onClick={displayModal}>mod</button> */}
        </div>
    )
}
// {ReactHtmlParser(content)}
export default Post
