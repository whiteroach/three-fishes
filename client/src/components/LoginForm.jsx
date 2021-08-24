import React, { useState } from 'react'
import axios from 'axios';
import Fish from '../blog-logo-3.png'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom'
import { Creators as authActions} from '../Redux/ducks/auth'

const LoginForm = (authState,authActions) => {
    let history = useHistory()
    
    const [loginForm, setLoginForm] = useState({
        username:'',
        password:''
    })
    const [msg,setMsg] = useState()
    const handleChange = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]:e.target.value
        })
    }
    const signIn = (e) => {
        e.preventDefault()
        if(loginForm.username === '' && loginForm.password === ''){
            setMsg('No data to process. Insert your data.')
        }
        else{
        console.log(loginForm);
        axios.post('http://localhost:8080/login',loginForm)
        .then(
            res => {
                if(res.data.msg){setMsg(res.data.msg)}
                else{
                    console.log(res.data);
                    localStorage.setItem('blogToken',res.data.token)
                    authState.authActions.set_initial_data(res.data);
                    // authState.authActions.set_initial_data(loginForm);
                    history.push(`/main/${loginForm.username}`)
                }
            }
        )}

        // authActions.set_initial_data(loginForm)
        // console.log(authActions);
        // window.location.href = `/main/${loginForm.username}`
        // window.location.assign(`/main/${loginForm.username}`)
        
    }
    return(
        <div>
            <p>{msg}</p>
            <img src={Fish} alt='three fishes'></img>
            <form onSubmit={signIn}>
                <input type="text" name='username' value={loginForm.username} onChange={handleChange}placeholder='username'/>
                <input type="password" name='password' value={loginForm.password} onChange={handleChange} placeholder='password'/>
                <button type='submit'>Login</button>
            </form>
            <p>or <a href="/signUp">sign up</a></p>
        </div>
    )
}
const mapStateToProps = (state) => ({
    authState:state.authReducer
})
const mapDispatchToProps = (dispatch) =>({
authActions: bindActionCreators(authActions, dispatch)
})
export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)
