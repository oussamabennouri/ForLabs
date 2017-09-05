import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';
import reducers from '../reducers';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import '../index.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ReactPhoneInput from 'react-phone-input'





class history extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            alert:'',

            error: {
                message: ''
            }
        };
    
this.userRef = firebase.database().ref('alerte');
      

 }
  
    componentDidMount() {
        this.userRef.on('value', this.gotData, this.errData);
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
                    Nom: userdata[k].Nom, Etat: userdata[k].Etat, Date: userdata[k].Date, Message: userdata[k].Message, rows: userdata[k].rows, key: k,
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
            <form>
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
                 </BootstrapTable>
                </form>
        )

    }
}
function mapStateToProps(state) {
    return { history: state.history };
}

export default connect(mapStateToProps, actions)(history);