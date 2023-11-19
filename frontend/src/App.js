import React from "react";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import Login from "./components/Login";
import TopNavbar from "./components/TopNavbar";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import NotFound from './components/NotFound';
import ECommerce from './components/ECommerce';
import Messages from './components/Messages';
import Footer from './components/Footer';
import ItemForm from './components/ItemForm';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Profile from "./components/Profile";

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

const AppContent = () => {
  const location = useLocation();
  const isLoginPath = location.pathname === '/login';
  const isRegisterPath = location.pathname === '/register';
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="container mx-auto">

          {isLoggedIn && <TopNavbar />}
          
          <Switch>
            
            {/* Public Routes */}
            {!isLoggedIn && (
              <Switch>
                <Redirect from="/" to="/login"/>
                <Redirect from="/dashboard" to="/login"/>
                <Redirect from="/ecomm" to="/login"/>
                <Redirect from="/messaging" to="/login"/>
                <Redirect from="/itemform" to="/login"/>
                <Redirect from="/profile" to="/login"/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
              </Switch>
            )}
            
            {/* Authenticated Routes */}
            {isLoggedIn && (
              <Switch>
                <Redirect from="/login" to="/dashboard"/>
                <Redirect from="/register" to="/dashboard"/>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/ecomm" component={ECommerce}/>
                <Route exact path="/messaging" component={Messages}/>
                <Route exact path="/itemform" component={ItemForm}/>
                <Route exact path="/profile" component={Profile}/>
              </Switch>
            )}
            
            {/* Fallback for unknown routes */}
            <Route exact path="*" component={NotFound}/>
          </Switch>
        </div>
      </div>
      <footer className="border-t-4">
        {!isLoginPath && !isRegisterPath && <Footer />}
      </footer>
    </div>
  );
};

export default App;
