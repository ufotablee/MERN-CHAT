import React from 'react';
import { Auth, Home } from 'pages'
import { Route,Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

const App = (props) => {
  const { isAuth } = props
 
  return (
    <>
    <Switch>
    <Route exact path={["/signIn","/signUp","/signUp/verify"]} component={Auth} />
    <Route 
    path="/"
    render={()=> (isAuth ? <Home /> : <Redirect to="/signIn"/>)}/>
    </Switch>
    </>
  );
}

export default connect(({user}) => ({isAuth: user.isAuth}))(App);
