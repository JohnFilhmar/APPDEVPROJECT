import React from "react";
import { BrowserRouter, Redirect, Route, Switch, useLocation } from "react-router-dom";
import Login from "./components/Login";
import TopNavbar from "./components/TopNavbar";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ECommerce from './components/ECommerce';
import Transactions from './components/transactions/Transactions';
import UserProfiles from './components/userprofiles/UserProfiles';
import Footer from './components/Footer';
import ItemForm from './components/ItemForm';
import Profile from "./components/profile/Profile";

const App = () => (
  <BrowserRouter basename="/">
    <AppContent />
  </BrowserRouter>
);

const AppContent = () => {
  const location = useLocation();
  const isLoginPath = location.pathname === '/login';
  const isRegisterPath = location.pathname === '/register';
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {isLoggedIn && <TopNavbar />}
        <div className="container mx-auto">
          {!isLoggedIn && (
            <>
              <Redirect exact from="/" to="/login"/>
              <Redirect from="/dashboard" to="/login"/>
              <Redirect from="/ecomm" to="/login"/>
              <Redirect from="/transac" to="/login"/>
              <Redirect from="/userprofiles" to="/login"/>
              <Redirect from="/itemform" to="/login"/>
              <Redirect from="/profile" to="/login"/>
              <Redirect from="/Canubing1_2" to="/login"/>
              <Redirect from="/Bayanan" to="/login"/>
            </>
          )}
          {isLoggedIn && (
            <>
              <Redirect exact from="/" to="/dashboard"/>
              <Redirect from="/login" to="/dashboard"/>
              <Redirect from="/register" to="/dashboard"/>
            </>
          )}
          <Switch>
            {!isLoggedIn && (
              <>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
              </>
            )}
            {isLoggedIn && (
              <>
                <Route path="/profile" component={Profile} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/ecomm" component={ECommerce} />
                <Route path="/transac" component={Transactions} />
                <Route path="/userprofiles" component={UserProfiles} />
                <Route path="/itemform/:userId" component={ItemForm} />
              </>
            )}
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
