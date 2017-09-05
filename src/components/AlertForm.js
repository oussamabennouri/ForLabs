import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import reducers from '../reducers';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import * as actions from '../actions';
//import PostItem from './post_item';
import '../index.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';



class AlertForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Nom: '',
            Etat: '',
            Date: '',
            Message: '',
            alert: [],
            rows: '0',
            key: '',
            currentRow: '',
            error: {
                message: ''
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.userRef = firebase.database().ref('alerte');
        // this.updateInputValue = this.updateInputValue.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.select = this.select.bind(this);
    
    }

    handleInputChange(event) {
        this.setState({ post: event.target.value });
    }
    handleSubmit(e) {

        e.preventDefault();
        var dateFormat = require('dateformat');
        let nom = document.getElementById('nom').value;
        let etat = document.getElementById('etat').value;
        let message = document.getElementById('message').value;
        const CurrentDate = dateFormat("dd/mm/yyyy");
        this.state.alert = {
            Nom: nom,
            Date: CurrentDate,
            Etat: etat,
            Message: message,
            rows: this.state.rows,

        };
        alert(JSON.stringify(this.state.alert, null, 2));
        this.props.createAlert(this.state.alert);
        
        document.getElementById('nom').value = '';
        document.getElementById('etat').value = '';
        document.getElementById('message').value = '';
        

    }
    select() {
        firebase.database().ref('Etat').once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var x = document.createElement("option")
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                // console.log(childKey, childData)
                var t = document.createTextNode(childData);
                x.innerHTML = childData;
                document.getElementById("etat").appendChild(x);

            }
            )
        }
        )
    }

    componentDidMount() {
        this.userRef.on('value', this.gotData, this.errData);
        this.select();
    }
    gotData = (data) => {
        let newAlerts = []
        //console.log(data.val());
        var userdata = data.val();
        if (userdata === null) {
            this.setState({ alert: [] });
            return alert('Base vide ')
        }
        else {
            const keys = Object.keys(userdata);
            root.count1 = (keys.length).toString();
            this.setState({ rows: root.count1 })
            //console.log(keys)
            //console.log(root.count1);
            for (let i = 0; i < keys.length; i++) {
                var k = keys[i];

                // console.log(titre,description) 
                newAlerts.push({
                    Nom: userdata[k].Nom, Etat: userdata[k].Etat, Date: userdata[k].Date, Message: userdata[k].Message,rows: userdata[k].rows, key: k,
                });
                //console.log(newProducts);
            }
            this.setState({ alert: newAlerts });
        }
    }
    errData = (err) => {
        console.log(err);
    }

    handleClick = (rowKey) => {
        alert(this.refs.table.getPageByRowKey(rowKey));
    }
    removeItem(id) {
        const MyRowkey = this.state.alert[id].key;
        //var p2 = new Promise(function (resolve, reject) {
        //firebase.database().ref('medecin/' + MyRowkey).remove()
        this.props.deleteAlert(MyRowkey);
        //  resolve(console.log("Item deleted successfully"));
        //});

        //p2.then(function () {
        //   console.log("row number " + id + " removed from my table"); // Succès !
        //}, function () {
        //   console.log("Failed"); // Erreur !

        // });


    }

    updateItem() {

        const UpdatePromise = new Promise((resolve, reject) => {

            let id = this.state.currentRow;
            console.log(id)
            const MyRowkey = this.state.alert[id].key;
            console.log(MyRowkey)

            var dateFormat = require('dateformat');
            let nom = document.getElementById('nom').value;
            let message = document.getElementById('message').value;
            let etat = document.getElementById('etat').value;
        


            const CurrentDate = dateFormat("dd/mm/yyyy");


            //        var p1 = new Promise(function (resolve, reject) {
            const alert = {
                Nom: nom,
                Date: CurrentDate,
                Etat:etat,
                Message:message,
                rows: id
            }
            resolve(this.props.updateAlert(MyRowkey, alert));

            UpdatePromise.then(function () {
                document.getElementById('nom').value = '';
                document.getElementById('etat').value = '';
                document.getElementById('message').value = '';
            })
        }).catch(
            // Promesse rejetée
            function () {
                console.log("il faut choisir une ligne");
            });
    }

    fetchItem(id) {
        const MyRowkey = this.state.alert[id].key;
        document.getElementById('nom').value = this.state.alert[id].Nom;
        document.getElementById('etat').value = this.state.alert[id].Etat;
        document.getElementById('message').value = this.state.alert[id].Message;
        this.state.currentRow = id;
        console.log(id)

    }
    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <button
                type="button"
                className="btn btn-labeled btn-danger"

                onClick={this.removeItem.bind(this, rowIndex)}
            >

                supprimer
            </button>
        )
    }
    cellsButton(cell, row, enumObject, rowIndex) {
        return (
            <button
                type="button"
                className="btn btn-labeled btn-warning"
                onClick={this.fetchItem.bind(this, rowIndex)}
            >


                Modifier
            </button>
        )
    }
    

    render() {
        const options = {
            page: 1,  // which page you want to show as default
            sizePerPage: 5,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 7,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            prePageTitle: 'Go to previous', // Previous page button title
            nextPageTitle: 'Go to next', // Next page button title
            firstPageTitle: 'Go to first', // First page button title
            lastPageTitle: 'Go to Last', // Last page button title
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'top',  // default is bottom, top and both is all available
            // keepSizePerPageState: true //default is false, enable will keep sizePerPage dropdown state(open/clode) when external rerender happened
            hideSizePerPage: true // You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
            // hidePageListOnlyOnePage: true > Hide the page list if only one page.
        };

        return (

            <div>

                <section className="content-header">
                </section>
                <div id="main" className="container" >

                    <form onSubmit={e => this.handleSubmit(e)} className="form-horizontale">
                        <div className="form-group">
                            <label >Nom</label>
                            <input  title="Au moins 4 lettres"
                                type="text" className="form-control"
                                id="nom" placeholder="Nom..." required />

                        </div>
                        <div className="form-group">
                            <label >Message</label>
                            <textarea id="message"
                                pattern="[A-Za-z]" title="aucune description"
                                type="text"
                                rows="4"
                                cols="255"
                                className="form-control"
                                placeholder="message"
                                required />
                        </div>
                           <div className="form-group">
                            <label >Etat</label>
                            <select className="form-control" id="etat" required>

                            </select>
                        </div>

                        <button id='btn' type="submit" className="btn btn-labeled btn-success">
                            <span className="btn-label"><i className="glyphicon glyphicon-ok"></i></span>Add</button>

                    </form>
                    <button id='update' type='button' className="btn btn-labeled btn-warning" onClick={this.updateItem.bind(this)}>Update</button>
                </div>
                <section className="content-header">
                    <h2>Liste des alertes </h2>
                </section>
                <BootstrapTable
                    ref='table'
                    data={this.state.alert}
                    striped={true}
                    hover={true}
                    pagination={true}
                    options={options}>


                    <TableHeaderColumn dataField='Nom' >Nom</TableHeaderColumn>
                    <TableHeaderColumn dataField='Message'>Message</TableHeaderColumn>
                    <TableHeaderColumn dataField='Date' isKey={true}>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='Etat' dataSort={true}>Etat</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataFormat={this.cellButton.bind(this)}>Supprimer</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataFormat={this.cellsButton.bind(this)}>Modifier</TableHeaderColumn>

                </BootstrapTable>

            </div>


        )

    }
}
const mapDispatchToProps = (dispatch) => {
    createAlert: () => dispatch(actions(" CREATE_ALERT"));

    updateAlert: () => dispatch(actions("UPDATE_ALERT"));

    deleteAlert: () => dispatch(actions("DELETE_ALERT"));
}
function mapStateToProps(state) {
    return { AlertForm: state.alert }
}

export default connect(mapStateToProps, actions)(AlertForm);