import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import MapDashboard from "./components/dashboard/map";
import ParentalDashboard from "./components/dashboard/";
import 'react-toastify/dist/ReactToastify.css';

// section map
/* map.css */
import 'leaflet/dist/leaflet.css';
import StudentTracker from "./components/dashboard/studentTracker";
import ParentTracker from "./components/dashboard/parentTracker";
import RegisterStudent from "./components/dashboard/RegisterStudent";
import StudentList from './components/dashboard/StudentList'



const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
`;

function App() {
  return (

    <Router>

      <AppContainer>
      <Switch>
        
      <Route
        path="/"
        exact
        component={AccountBox}
        />

        <Route
          path="/dashboard"
          exact
          component={MapDashboard}
          />

        <Route
          path="/parent"
          exact
          component={ParentalDashboard}
          />

        <Route
          path="/student"
          exact
          component={StudentTracker}
          />

        <Route
          path="/tracker"
          exact
          component={ParentTracker}
          />
          <Route
            path="/registerStudent"
            exact
            component={RegisterStudent}
            />
            <Route
              path="/studentList"
              exact
              component={StudentList}
              />


      </Switch>
      </AppContainer>


    </Router>


  );
}

export default App;
