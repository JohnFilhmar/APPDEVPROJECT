import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import TopNavbar from "./components/TopNavbar";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import useRequireAuth from "./hooks/useRequireAuth";

function App() {
  const isLoggedIn = useRequireAuth();

  return (
    <>
      <div className="container mt-5">
        <Router>
          <AppContent isLoggedIn={isLoggedIn} />
        </Router>
      </div>
    </>
  );
}

const AppContent = ({ isLoggedIn }) => {
  return (
    <>
      {!isLoggedIn && <TopNavbar />}
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        {/* Use a PrivateRoute component for routes that require authentication */}
        <PrivateRoute
          exact
          path="/dashboard"
          component={Dashboard}
          isLoggedIn={isLoggedIn}
        />
        {/* Add more routes as needed */}
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </>
  );
};

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default App;
