import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Creators as authActions} from './Redux/ducks/auth'
import Registration from './components/RegistrationForm'
import Login from './components/LoginForm'
import Main from './components/Main'
import axios from 'axios';
// import Prose from './components/Prose'
const App = (authState,authActions) => {
  

  const logout = () => {
    const username = authState.authState.username;
    axios.put('http://localhost:8080/logout',{username}).then(res =>{
      localStorage.removeItem("blogToken");
      //is not needed since window refresh the page.
      authState.authActions.logout()
      window.location.href = "/";
      console.log(res.data)
      console.log('logout')
    })
    }
    return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/signUp" component={Registration}/>
          {/* {permission?<Route path="/" exact component={Login}/>:<Route path="/main/:name" component ={Main}/>} */}
          {/* <Route path="/main/:name">
            {permission?<Main/>:<Login/>}
          </Route> */}
          <Route path="/main/:name" component={Main}/>
          <Redirect to= "/"/>
        </Switch>
      </Router>
     {/* <RegistrationForm/> */}
      <button type='button' onClick={logout}>Logout</button>
      {/* <Prose/> */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  authState:state.authReducer
})
const mapDispatchToProps = (dispatch) =>({
authActions: bindActionCreators(authActions, dispatch)
})
export default connect(mapStateToProps,mapDispatchToProps)(App)

