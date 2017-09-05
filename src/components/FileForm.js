import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as firebase from 'firebase';
import _ from 'lodash';
import reducers from '../reducers';
import { Provider } from 'react-redux';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
class FileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Titre: '',
            date: '',
            Description: '',
            Classification: '',
            Specialite: '',
            Fiche: '',
            file: [],
            rows:'0',
            key:'',

            error: {
                message: ''
            }
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.userRef = firebase.database().ref('fiches');
       // this.updateInputValue = this.updateInputValue.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.select=this.select.bind(this);
        this.select2 = this.select2.bind(this);
       this.removeItem = this.removeItem.bind(this);
      // this.handleForm = this.handleForm.bind(this);
       
    }
    handleInputChange(event) {
        this.setState({ FileForm: event.target.value });
    }

   // handleForm(e){
    //e.preventDefault()
      //    return this.handleSubmit(e)
   /// }


    handleSubmit(e) {
      
        e.preventDefault();      
        var dateFormat = require('dateformat');
        let titre = document.getElementById('Titre').value;
        let description = document.getElementById('Description').value;
        let classification = document.getElementById('Classification').value;
        let specialite = document.getElementById('Specialite').value;
        let fiches = document.getElementById('Fiches').value;
        

        const CurrentDate = dateFormat("dd/mm/yyyy");
        this.state.file = {
            Titre: titre,
            date: CurrentDate,
            Description: description,
            Classification: classification,
            Specialite: specialite,
            Fiche: fiches,
            rows: this.state.rows,
            
        };
        alert(JSON.stringify(this.state.file, null, 2));
        this.props.createFile(this.state.file);


    const UploadPromise = new Promise((resolve, reject) => { 
            var uploader = document.getElementById('uploader');
         const file = this.fileUpload.files[0];
        var reader = new FileReader();
        reader.onloadend = function (evt) {
            var blob = new Blob([evt.target.result], { type: "file/*" });
            resolve(blob);

            var storageUrl = 'files/';
            var storageRef = firebase.storage().ref(storageUrl + file.name);
            console.warn(file); // Watch Screenshot
            var uploadTask = storageRef.put(blob);
            

            uploadTask.on('state_changed', function progress(snapshot) {
               if(snapshot.totalBytes!=0){
              var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(percentage)
                uploader.value = percentage;
               }
            else console.log("taille du fichier=0KB");
           }, function error(err) {


            }, function complete() {  console.log("upload DONE!!!!!")
                     
            });

           }
        
        reader.onerror = function (e) {
            return reject(this)
        //    console.log("Failed file read: " + e.toString());
        }   ;
            if (file!=null){      reader.readAsArrayBuffer(file);
            }
            else{
                console.log("no file uploaded")
            }  
      })
    document.getElementById('Titre').value = '';
    document.getElementById('Description').value = '';
    document.getElementById('Classification').value = '';
    document.getElementById('Specialite').value = '';
    document.getElementById('Fiches').value = '';
    }

    select() {
        firebase.database().ref('Classification').once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var x = document.createElement("option")
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
               // console.log(childKey, childData)
                var t = document.createTextNode(childData);
                x.innerHTML = childData;
                document.getElementById("Classification").appendChild(x);

            }
            )
        }
        )

    }
    select2() {
        firebase.database().ref('Specialite').once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var x = document.createElement("option")
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
               // console.log(childKey, childData)
                var t = document.createTextNode(childData);
                x.innerHTML = childData;
                document.getElementById("Specialite").appendChild(x);

            }
            )
        }
        )

    }
    



     componentDidMount() {
        
        this.userRef.on('value', this.gotData, this.errData);
        this.select(); 
        this.select2(); 
       
     }
    gotData = (data) => {
    
      //console.log(data.val());
        let newProducts = []
        const userdata = data.val();
        
        if (userdata === null) { 
            this.setState({ file: [] });   
            return alert('Base vide ') }
        else{
         const keys = Object.keys(userdata)
          root.count1 = (keys.length).toString();
          this.setState({ rows: root.count1 })
       //console.log(keys)
        //console.log(root.count1);
        for (let i = 0; i < keys.length; i++) {
            var k = keys[i];
           // var titre = userdata[k].Titre;
           // console.log(k);
           // var description = userdata[k].Description;
           // console.log(titre,description)
           newProducts.push({
                Classification: userdata[k].Classification, Description: userdata[k].Description, Specialite: userdata[k].Specialite, Titre: userdata[k].Titre, date: userdata[k].date, rows: userdata[k].rows, key:k,
            });
            //console.log(newProducts);
        }
        this.setState({ file: newProducts });
        
        }
    }
    errData = (err) => {
        console.log(err)
    }
          
    handleClick = (rowKey) => {
        alert(this.refs.table.getPageByRowKey(rowKey));

    }
    removeItem(id) {
        //console.log(this.state.search)
      //  alert(this.state.search)

      //  var p1 = new Promise(
        //    function (resolve, reject) { 

        



        //console.log(this.state.products[id].key)    
        const MyRowkey = this.state.file[id].key;
       /* var p2 = new Promise(function (resolve, reject) {
        firebase.database().ref('fiches/' + MyRowkey).remove()

       
        resolve(console.log("Item deleted successfully"));
        });

        p2.then(function () {
            console.log("row number " +id+" removed from my table"); // Succès !
        }, function () {
            console.log("Failed"); // Erreur !
        });
    */

     //   p1.then(
      //      this.state.products.splice(id)
     //   ).catch(
            // Promesse rejetée
        //    function () {
      //          return reject(this)
    //        });
    
  //  }




 //   )
        //console.log("value of input field : " + this.state.inputfield);
            
       // firebase.database().ref('fiches').orderByChild('rows').equalTo(id).on("value", function (snapshot) {

         //   console.log(firebase.database().ref('fiches').child('Titre'));
            //console.log(newPostKey)
          
          //  snapshot.ref().remove();
            //snapshot.ref.remove();
            
     
     // console.log(newPostKey)
     // firebase.database().ref().child(newPostKey).orderByChild('rows').equalTo(id.toString()).on("child_added", function (snapshot) {
       //   snapshot.ref.remove();
      //return firebase.database().ref('fiches').child(newPostKey).remove()
        
        
     //})
        this.props.deleteFile(MyRowkey);  
    }
    updateItem(){
        const UpdatePromise = new Promise((resolve, reject) => {
        let id = this.state.currentRow;
        console.log(id)
        const MyRowkey = this.state.file[id].key;
        console.log(MyRowkey)

        var dateFormat = require('dateformat');
        let titre = document.getElementById('Titre').value;
        let description = document.getElementById('Description').value;
        let classification = document.getElementById('Classification').value;
        let specialite = document.getElementById('Specialite').value;
        let fiches = document.getElementById('Fiches').value;


        const CurrentDate = dateFormat("dd/mm/yyyy");

        const file = {

            Titre: titre,
            date: CurrentDate,
            Description: description,
            Classification: classification,
            Specialite: specialite,
            Fiche: fiches,
            rows: id
        }
        resolve(this.props.updateFile(MyRowkey, file))
        UpdatePromise.then(function () {
        
        document.getElementById('Titre').value = '';
        document.getElementById('Description').value = '';
        document.getElementById('Classification').value = '';
        document.getElementById('Specialite').value = '';
        document.getElementById('Fiches').value = '';
    
    
        })
        }).catch(
            // Promesse rejetée
            function () {
                console.log("il faut choisir une ligne");
            });
    }
 
 
 
    fetchItem(id) {
        const MyRowkey = this.state.file[id].key;
        document.getElementById('Titre').value = this.state.file[id].Titre;
        document.getElementById('Description').value = this.state.file[id].Description;
        document.getElementById('Classification').value = this.state.file[id].Classification;
        document.getElementById('Specialite').value = this.state.file[id].Specialite;
        this.state.currentRow = id;
        console.log(id)

    }
 
    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <button
                type="button"
                className="btn btn-labeled btn-danger"
                
                onClick={this.removeItem.bind(this,rowIndex)}
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
   



   // firebase.database().ref('fiches').orderByChild('rows').equalTo(id).on("value", function (snapshot) {

         //   console.log(firebase.database().ref('fiches').child('Titre'));
            //console.log(newPostKey)

          //  snapshot.ref().remove();


    
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
                            <label >Titre</label>
                            
                            <input 
                                type="text" className="form-control"  
                                id="Titre" placeholder="Titre..." 
                                pattern="[A-Za-z].{3,}" title="Au moins 4 lettres"
                                required/>
                            </div>
                        <div className="form-group">
                            <label >Description</label>
                            <textarea id="Description" 
                                pattern="[A-Za-z]" title="aucune description"
                                 type="text" 
                                 rows="4"
                                 cols="255"
                                 className="form-control"
                            placeholder="Description..." 
                             required/>
                        </div>
                        <div className="form-group">
                            <label >Classification</label>
                            <select id="Classification" className="form-control"required> </select>
                        </div>
                        <div className="form-group">
                            <label >Specialites</label>
                            <select id='Specialite' className="form-control" required ></select>
                        </div>
                        <div className="form-group">
                            <label>Fiche</label>
                            <input id='Fiches' type='file' label='Upload' accept='.txt'
                                
                                ref={function (ref) { this.fileUpload = ref }.bind(this)}
                            />
                            <progress id="uploader" value={this.progress} max="100"></progress>
                              </div>
                        <button id='btn'
                     type="submit" className="btn btn-labeled btn-success">
                    <span className="btn-label"><i className="glyphicon glyphicon-ok"></i></span>Add</button>
                    </form>
                    <button id='update' type='button' className="btn btn-labeled btn-warning" onClick={this.updateItem.bind(this)}>Update</button>

                </div>
                <section className="content-header">
            <h2>Liste des fichiers </h2>
                </section>
                <BootstrapTable
                    ref='table'
            
                data={this.state.file}        
                striped={true}
                hover={true}
                pagination={true} 
                 options={options}
                >
                    <TableHeaderColumn dataField='Titre' >Titre</TableHeaderColumn>
                    <TableHeaderColumn dataField='date' isKey={true}>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='Description'>Description</TableHeaderColumn>
                    <TableHeaderColumn dataField='Classification' >Classification</TableHeaderColumn>
                    <TableHeaderColumn dataField='Specialite' dataSort={true}>Specialite</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataFormat={this.cellButton.bind(this)}>Supprimer</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataFormat={this.cellsButton.bind(this)}>Modifier</TableHeaderColumn>
                </BootstrapTable>   
             </div>
                )
    
    }
}
const mapDispatchToProps = (dispatch) => {
    createFile: () => dispatch(actions(" CREATE_FILE"));

    updateFile: () => dispatch(actions("UPDATE_FILE"));

    deleteFile: () => dispatch(actions("DELETE_FILE"));
}
function mapStateToProps(state) {
    return { FileForm: state.file }
}

export default connect(mapStateToProps, actions)(FileForm);