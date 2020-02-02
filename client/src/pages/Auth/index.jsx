import React from 'react';
import './auth.scss'
import { LoginForm, RegisterForm } from 'modules'
import { Route,Switch } from "react-router-dom";
import CheckInfo from './conponents/CheckInfo';

const Auth = () =>  {

return ( 
        <section className="auth">
            <div className="auth__content">
            <Switch>
                <Route exact path={["/","/signIn"]} component={LoginForm} />
                <Route exact path="/signUp" component={RegisterForm}/>
                <Route exact path="/signUp/verify" component={CheckInfo}/>
            </Switch>
            </div>
        </section>
        );
}
  
export default Auth;