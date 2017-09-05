import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/';


import myaccount from './components/Myaccount';
import Medecin from './components/Medecin';
import signup from './components/signUp';
import signin from './components/signIn';
import App2 from './components/app';
import Auth2 from './components/Authentif';
import fileform from './components/FileForm';
import Acceuil from './components/Acceuil';
import history from './components/history';
import chart from './components/chart';
import AlertForm from './components/AlertForm';

const store = createStore(reducer);


var config = {
    apiKey: "AIzaSyBPqspySydXHPVFLgCEaisrF_gaJKXZWWw",
    authDomain: "loginapp-ce7fe.firebaseapp.com",
    databaseURL: "https://loginapp-ce7fe.firebaseio.com",
    projectId: "loginapp-ce7fe",
    storageBucket: "loginapp-ce7fe.appspot.com",
    messagingSenderId: "164604832200"
};
firebase.initializeApp(config);


function requireAuth(nextState, replace) {
    if (!firebase.auth().currentUser) {
        if (localStorage.getItem('newpass') === '0') {
            replace({
                pathname: '/signin'

            })
            console.log('local ', localStorage.getItem('newpass'))
        }
        else {
            console.log('local ', localStorage.getItem('newpass'))
            const x = localStorage.getItem('newmail')
            console.log('x=', x)
            const y = localStorage.getItem('newpass')
            console.log('y=', y)
firebase.auth().signInWithEmailAndPassword(x, y).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
})
                .then(function () {
                    console.log('connected');

                });


        }
    }
}



ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} >
            <Route path="/" component={Auth2} >
                <IndexRoute component={signin} />
                <Route path="/signin" component={signin} />
                <Route path="/signup" component={signup} />
            </Route>
            <Route path="/MainPage" component={App2} onEnter={requireAuth} >
                <Route path="/MainPage" component={App2} onEnter={requireAuth} />
                <Route path="/myaccount" component={myaccount} onEnter={requireAuth} />
                <Route path="/addDoctor" component={Medecin} onEnter={requireAuth} />
                <Route path="/Home" component={Acceuil} onEnter={requireAuth} />
                <Route path="/AddFile" component={fileform} onEnter={requireAuth} />
                <Route path="/addAlert" component={AlertForm} onEnter={requireAuth}/>
                <Route path="/checkhistory" component={history} onEnter={requireAuth}/>
                <Route path="/analytics" component={chart} onEnter={requireAuth}/>


            </Route>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
