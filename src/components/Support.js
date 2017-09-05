import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';
import reducers from '../reducers';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import '../index.css';

class Support extends Component {



render(){
return(
<form id="contact_form" >
    <div class="row">
        <label for="name">Your name:</label><br />
        <input id="name" class="input" name="name" type="text" value="" size="30" /><br />
    </div>
    <div class="row">
        <label for="email">Your email:</label><br />
        <input id="email" class="input" name="email" type="text" value="" size="30" /><br />
    </div>
    <div class="row">
        <label for="message">Your message:</label><br />
        <textarea id="message" class="input" name="message" rows="7" cols="30"></textarea><br />
    </div>
    <input id="submit_button" type="submit" value="Send email" />
</form>






)
}
}
function mapStateToProps(state) {
    return { history: state.Support };
}

export default connect(mapStateToProps, actions)(Support);