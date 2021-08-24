import React,{useState, useEffect, useContext, useRef} from 'react';
import axios from 'axios';
import {PostContext} from '../Context/postContext'
import {TokenContext} from '../Context/tokenContext'
import jwtDecode from 'jwt-decode'
//text-editor
import { HtmlEditor, Toolbar, Editor } from '@aeaton/react-prosemirror'
import { plugins, schema, toolbar } from '@aeaton/react-prosemirror-config-default'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const BlogForm = () => {
    const[blogForm, setBlogForm] = useState({
        title:'',
        userId:''
    })
  
    const[posts, dispatch] = useContext(PostContext)
    const[token] = useContext(TokenContext)

 

    useEffect(()=>{
        // console.log(decodedId);
        const userId =localStorage.getItem('blogToken')
        const decodedId = jwtDecode(userId)
        setBlogForm({
            
            ...blogForm,
            userId: decodedId.id || null
        })
    },[])
  

    const initialValue = '<p></p>'
    const [value, setValue] = useState(initialValue)
    // const [value, setValue] = useState('<p></p>')

    const handleChange = (e) => {
        setBlogForm({
            ...blogForm,
            [e.target.name]:e.target.value
        })
        // onInputChange()
        console.log(token);
    }
    const submit = (e) => {
        e.preventDefault();
        console.log(value);
        console.log(blogForm);
        axios.post('http://localhost:8080/post/addPost', {blogForm:blogForm,content:value})
        // axios.post('http://localhost:8080/post/addPost', formData, config)
        // axios.post('http://localhost:8080/post/addPost', blogForm)
        .then(res =>{
            setBlogForm({
                ...blogForm,
                title:'',
            })
            console.log(value);
            // setValue(initialValue)
            // setValue('<p></p>')
            //KEEP AN EYE HERE!
            const token =localStorage.getItem('blogToken')
            axios.post('http://localhost:8080/post/displayPosts',{token})
            .then(res=>{
                // setBlogPosts(res.data)
                dispatch({type:'SET_POSTS', payload: res.data})
            })
        }
        )
        
    }

    // const editorChange = () => {
    //     setBlogForm({
    //         ...blogForm,
    //         content:value
    //     })
    //     console.log(value);
    //     // console.log('hey');
    // }

    return (
        <div>
            <form onSubmit={submit}>
                <input type="text" name='title' value={blogForm.title} onChange={handleChange}/><br></br>
                {/* <textarea name="content" id="content" cols="30" rows="10" value={blogForm.content} onChange={handleChange} /><br></br> */}
                <HtmlEditor
                    schema={schema}
                    plugins={plugins}
                    value={value}
                    handleChange={setValue}
                    debounce={250}
                >
                <Editor autoFocus />
                <Toolbar toolbar={toolbar} />
                </HtmlEditor>
                <button type="submit">post</button>
            </form>
         <p>{token.token}</p>
        </div>
    )
}

export default BlogForm
