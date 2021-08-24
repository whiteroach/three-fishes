import React,{useState, useEffect} from 'react'
import axios from 'axios'

const Profile = () => {
    useEffect(()=>{
        if(localStorage.getItem('blogToken')){
            const token = localStorage.getItem('blogToken')
            axios.post('http://localhost:8080/profile',{token})
            .then((res)=>{setUser(res.data)})
            
        }
        // console.log(user);
        
    },[])
    const [user,setUser] = useState('')
    return (
        <div className="profile">
            <img src={user.profile_pic} alt='profile_pic'/>
            {user?<p>{user.username}</p>:null}
        </div>
    )
}

export default Profile
