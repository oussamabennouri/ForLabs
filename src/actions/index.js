import firebase from '../firebaseConfig'
import _ from 'lodash';
import {
    FETCH_POSTS,
    DELETE_DOC,
    CREATE_DOC,
    UPDATE_DOC,
    DELETE_FILE,
    CREATE_FILE,
    UPDATE_FILE,
    DELETE_ALERT,
    CREATE_ALERT,
    UPDATE_ALERT,
} from './types';
const userRef = firebase.database().ref('medecin');
const fileRef = firebase.database().ref('fiches');
const alertRef = firebase.database().ref('alerte');

export function createPost(post) {
    firebase.database().ref("medecin").push(post);
    return (dispatch, getState) => {
        const posts = getState().post;     
userRef.on('value', snapshot => {
    dispatch({
        type:CREATE_DOC,
        payload: snapshot.val()
    });
})
    }
}


export function deletePost(key) {
    const refer="medecin/"+key;
   firebase.database().ref(refer).remove();
  
  return (dispatch, getState) => {
      const posts = getState().post;
      userRef.on('value', snapshot => {
          dispatch({
              type: DELETE_DOC,
              payload: snapshot.val()
          });
      })
  }
}  


export function updatePost(key,post){
    const refer = "medecin/" + key;
 firebase.database().ref(refer).update(post); 
 return (dispatch, getState) => {
     const posts = getState().post;
     userRef.on('value', snapshot => {
         dispatch({
             type: UPDATE_DOC,
             payload: snapshot.val()
         });
     })
 }
}   
export function createFile(file) {
    firebase.database().ref("fiches").push(file);
    return (dispatch, getState) => {
        const files = getState().products;
        fileRef.on('value', snapshot => {
            dispatch({
                type: CREATE_FILE,
                payload: snapshot.val()
            });
        })
    }
}
export function deleteFile(key) {
    const refer = "fiches/" + key;
    firebase.database().ref(refer).remove();

    return (dispatch, getState) => {
        const fiches = getState().file;
        fileRef.on('value', snapshot => {
            dispatch({
                type: DELETE_FILE,
                payload: snapshot.val()
            });
        })
    }
}


export function updateFile(key, file) {
    const refer = "fiches/" + key;
    firebase.database().ref(refer).update(file);
    return (dispatch, getState) => {
        const fiches = getState().post;
        fileRef.on('value', snapshot => {
            dispatch({
                type: UPDATE_FILE,
                payload: snapshot.val()
            });
        })
    }
}
export function createAlert(alert) {
    firebase.database().ref("alerte").push(alert);
    return (dispatch, getState) => {
        const alertes = getState().products;
        alertRef.on('value', snapshot => {
            dispatch({
                type: CREATE_ALERT,
                payload: snapshot.val()
            });
        })
    }
}
export function deleteAlert(key) {
    const refer = "alerte/" + key;
    firebase.database().ref(refer).remove();

    return (dispatch, getState) => {
        const alertes = getState().alert;
        alertRef.on('value', snapshot => {
            dispatch({
                type: DELETE_ALERT,
                payload: snapshot.val()
            });
        })
    }
}


export function updateAlert(key, alert) {
    const refer = "alerte/" + key;
    firebase.database().ref(refer).update(alert);
    return (dispatch, getState) => {
        const alertes = getState().alert;
        alertRef.on('value', snapshot => {
            dispatch({
                type: UPDATE_ALERT,
                payload: snapshot.val()
            });
        })
    }
}