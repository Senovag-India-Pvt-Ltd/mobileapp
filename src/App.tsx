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
import UploadImagePage from './pages/practice/upload';


setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main" placeholder={undefined}>
            <Route path="/" exact={true}>
              <Redirect to="/upload" />
            </Route>
            <Route path="/folder/:name" exact={true}>
              <Page />
            </Route>
            <Route path="/login" exact={true}>
              <Login />
              </Route>
              <Route path="/upload" exact={true}>
              <UploadImagePage />
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
