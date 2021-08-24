import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';

const RegistrationForm = () => {
    let history = useHistory()
    const [regForm, setRegForm] = useState({
        firstName:'',
        lastName:'',
        username:'',
        email:'',
        password:''
    })
    const [msg,setMsg] = useState()
  
    const handleChange = (e) => {
        setRegForm({
            ...regForm,
            [e.target.name]:e.target.value
        })
    }
    const signUp = (e) => {
        e.preventDefault()
        if(regForm.firstName === '' || regForm.lastName === '' || regForm.username === '' || regForm.email === '' || regForm.password === ''){
            setMsg('all fields are required')
        }else{
            axios.post('http://localhost:8080/signUp',regForm)
            .then(
                res=>{
                    console.log(res)
                    setMsg(res.data.msg)
                    if(res.status === 201){
                        history.push('/')
                    }
                    // window.location.href = '/'
                 
     
                }
            )

        }
    }
    return(
        <div>
            <p>{msg}</p>
            <form onSubmit={signUp}>
                <input type="text" name='firstName' value={regForm.firstName} onChange={handleChange} placeholder='first name'/>
                <input type="text" name='lastName' value={regForm.lastName} onChange={handleChange} placeholder='last name'/>
                <input type="text" name='username' value={regForm.username} onChange={handleChange}placeholder='username'/>
                <input type="email" name='email' value={regForm.email} onChange={handleChange} placeholder='email'/>
                <input type="password" name='password' value={regForm.password} onChange={handleChange} placeholder='password'/>
                <button type='submit'>sign up</button>
            </form>
        </div>
    )
}

export default RegistrationForm
