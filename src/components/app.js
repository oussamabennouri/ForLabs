import React from 'react';
/*import Dashboard from './Dashboard';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import Footer from './Footer';*/
import * as firebase from "firebase";
import { browserHistory } from "react-router";
import { Header, Dashboard, Sidebar } from "react-adminlte-dash";



const navMenu = () => ([
  <Header.Item
    iconClass="fa fa-github"
    key="1"
    title="Github"
  />,



  <Header.UserMenu
    name="user name"
    aria-hidden="true"
    image="./Celtics.png"
    profileAction={() => browserHistory.push("/Myaccount")}

    signOutAction={() => {
              browserHistory.push("/signin");
      Object.keys(localStorage).forEach(key => {
        if (key.indexOf('firebase') !== -1) {
        firebase.auth().signOut().then(function() {
          console.log('Signed Out');
        localStorage.setItem('newname',0)
        localStorage.setItem('newmail',0)
        localStorage.setItem('newpass','0')
        }, function(error) {
          console.error('Sign Out Error', error);
        }); 
        localStorage.removeItem(key);


        }
      })
    }}
    key="2"
  />,
]);


const sb = pickTheme => ([
  <Sidebar.UserPanel
    name="Put username here"
    image="./Celtics.png"
    online
    key="1"
  />,
  <Sidebar.Search key="2" />,
  <Sidebar.Menu header="MENU PRINCIPALE" key="3">
    <Sidebar.Menu.Item icon={{ className: 'fa-dashboard' }} title="Acceuil" />
    <Sidebar.Menu.Item icon={{ className: 'fa-user-circle' }} title="Votre Acceuil" onClick={() => browserHistory.push("/Myaccount")}/>
    <Sidebar.Menu.Item icon={{ className: 'fa-file' }} title="Gestion des fiches" onClick={() => browserHistory.push("/AddFile")} />
    <Sidebar.Menu.Item icon={{ className: 'fa-user-md' }} title="Gestion des medecins" onClick={() => browserHistory.push("/addDoctor")} />
    <Sidebar.Menu.Item icon={{ className: 'fa-envelope' }} title="Gestion des alertes" href="/addAlert" />
    <Sidebar.Menu.Item icon={{ className: 'fa-dashboard' }} title="Historiques des alertes" href="/checkhistory" />
    <Sidebar.Menu.Item icon={{ className: 'fa-pie-chart' }} title="Analytics" href="/analytics"/>
    <Sidebar.Menu.Item icon={{ className: 'fa-dashboard' }} title="Support" href="" />
  </Sidebar.Menu>,
]);


const footer = () => ([
  <strong key="copyright">
    <span>Copyright © 2017-2018 </span>
    <a href="https://katomi.co/">Katomi</a>
    <span>. </span>
  </strong>,
  <span key="allrights"> All rights reserved.</span>,
  <div key="version" style={{ float: 'right' }}>
    <b>Version</b>
    <span> 0.1</span>
  </div>,
]);




const App = ({ children, theme, pickTheme }) => (
  <Dashboard
    navbarChildren={navMenu()}
    sidebarChildren={sb(pickTheme)}
    footerChildren={footer()}
    theme={theme}
  >
    <div style={{ height: "100vh" }} id="children">
      {children}
    </div>


  </Dashboard>
);

export default App;
