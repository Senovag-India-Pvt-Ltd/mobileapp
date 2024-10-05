import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Auth/Login';
import Bid from './pages/Bid/Bid';
import BidAccept from './pages/BidAccept/BidAccept';
import Logout from './pages/Logout/Logout';
import ChangePassword from './pages/ChangePassword/ChangePassword';





import HomePage from './pages/practice/Dashboard/HomePage';
import ListPage from './pages/practice/Dashboard/ListPage';

import DocPage from './pages/practice/Dashboard/DocPage';
import DocumentUpload from './pages/practice/Dashboard/DocumentUpload';
import Dashboard from './pages/practice/Dashboard/Dashboard';
import RejectPage from './pages/practice/Dashboard/RejectPage';
import DocPage2 from './pages/practice/Dashboard/DocPage2';
import ListPage2 from './pages/practice/Dashboard/ListPage2';








setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main" >
            {/* <Route path="/" exact={true}>
              <Redirect to="/login" />
            </Route> */}
             <Route exact path="/">
          {localStorage.getItem("userType") == "0" ? <Redirect to="/accept-bid" /> : 
           localStorage.getItem("userType") == "2" ? <Redirect to="/bid/test" /> : 
           <Redirect to="/login" />}
        </Route>
       
            <Route path="/folder/:name" exact={true}>
              <Page />
            </Route>
            <Route path="/login" exact={true}>
              <Login />
              </Route>
             


            
             
              <Route path="/reject" exact={true}>
  <RejectPage />
</Route>

              
              <Route path="/dash" exact={true}>
              <Dashboard/>
              </Route>


              <Route path="/home" exact={true}>
              <HomePage/>
              </Route>
              <Route path="/docu2" exact={true}>
              <DocPage2/>
              </Route>
              {/* <Route path="/list2/:inspectionType/:inspectionTaskId" exact={true}>
              <ListPage2/>
              </Route> */}
                <Route path="/list2" exact={true}>
              <ListPage2/>
              </Route>




              <Route path="/list/:approvalStageId" exact={true}>
                <ListPage/>
              </Route>
              <Route path="/docu/:applicationDocumentId" exact={true}>
                <DocPage/>
              </Route>
              

           
              
             <Route path="/bid/:name" exact={true}>
              <Bid />
            </Route>
            <Route path="/accept-bid" exact={true}>
              <BidAccept />
            </Route>
            <Route path="/change-password" exact={true}>
              <ChangePassword />
            </Route>
            <Route path="/logout" exact={true}>
              <Logout />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
