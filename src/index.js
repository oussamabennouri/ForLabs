import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import actions from './actions';
import myaccount from './components/Myaccount';
import Medecin from './components/Medecin';
import history from './components/history';
import AlertForm from './components/AlertForm';
import Support from './components/Support';
import signup from './components/signUp';
import signin from './components/signIn';
import FileForm from './components/FileForm';
import { composeWithDevTools } from 'redux-devtools-extension';
import firebase from './firebaseConfig'
import App from './app';
import App2 from './components/app';

const Store = createStore(reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(reduxThunk));

//const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

    ReactDOM.render(
        <Provider store={Store}>
        <Router path="/" history={browserHistory} >
            <Route path="/" component={App} >
                <IndexRoute component={App} />
                <Route path="/signin" component={signin} />
                <Route path="/signup" component={signup} />

                <Route path="/MainPage" component={App2}>
                    <Route path="/MainPage" component={App2} />
                    <Route path="/myaccount" component={myaccount} />
                    <Route path="/addDoctor" component={Medecin} />
                    <Route path="/addFile" component={FileForm} />
                    <Route path="/addAlert" component={AlertForm} />
                    <Route path="/checkhistory" component={history} />
                    <Route path="/help" component={Support} />
                </Route>
            </Route>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();

