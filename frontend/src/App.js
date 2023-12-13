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
import Notfound from './components/NotFound';

const App = () => (
  <BrowserRouter basename="/">
    <AppContent />
  </BrowserRouter>
);

const AppContent = () => {
  const location = useLocation();
  const isLoginPath = location.pathname === '/login';
  const isRegisterPath = location.pathname === '/register';
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const isAdmin = localStorage.getItem('userRole') === 'ADMIN';

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        { !isLoginPath && !isRegisterPath && <TopNavbar />}
        <div className="container mx-auto">
          {
            !isLoggedIn && (
              <>
                <Redirect exact from="/" to="/login"/>
                <Redirect from="/dashboard" to="/login"/>
                <Redirect from="/ecomm" to="/login"/>
                <Redirect from="/transac" to="/login"/>
                <Redirect from="/userprofiles" to="/login"/>
                <Redirect from="/itemform" to="/login"/>
                <Redirect from="/profile" to="/login"/>
                <Redirect from="/profile/account" to="/login"/>
                <Redirect from="/profile/edit" to="/login"/>
                <Redirect from="/profile/purhcases/all" to="/login"/>
                <Redirect from="/profile/purhcases/pending" to="/login"/>
                <Redirect from="/profile/purhcases/topickup" to="/login"/>
                <Redirect from="/profile/notifications" to="/login"/>
              </>
            )
          }
          {
            isLoggedIn && isAdmin && (
              <>
                <Redirect exact from="/" to="/dashboard"/>
                <Redirect from="/login" to="/dashboard"/>
                <Redirect from="/register" to="/dashboard"/>
              </>
            )
          }
          {
            isLoggedIn && !isAdmin && (
              <>
                <Redirect exact from="/" to="/ecomm"/>
                <Redirect from="/login" to="/ecomm"/>
                <Redirect from="/register" to="/ecomm"/>
                <Redirect from="/dashboard" to="/ecomm"/>
                <Redirect from="/transac" to="/ecomm"/>
                <Redirect from="/userprofiles" to="/ecomm"/>
                <Redirect from="/itemform" to="/ecomm"/>
              </>
            )
          }
          <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/shop" component={ECommerce} />
            {
              isLoggedIn && (
                <>
                  <Route path="/profile" component={Profile} />
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/ecomm" component={ECommerce} />
                  <Route path="/transac" component={Transactions} />
                  <Route path="/userprofiles" component={UserProfiles} />
                  <Route path="/itemform/:userId" component={ItemForm} />
                </>
              )
            }
              <Route path="*" component={Notfound} />
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
