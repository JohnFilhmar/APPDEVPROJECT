import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import Login from "./components/Login";
import TopNavbar from "./components/TopNavbar";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";

function App() {
  return (
    <>
      <div className="container mt-5">
        <Router>
          <AppContent />
        </Router>
      </div>
    </>
  );
}

const AppContent = () => {
  const location = useLocation();
  const isLoginPath = location.pathname === '/login';
  const isRegisterPath = location.pathname === '/register';

  return (
    <>
      {!isLoginPath && !isRegisterPath && <TopNavbar />}
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/dashboard" component={Dashboard}/>
      </Switch>
    </>
  );
};

export default App;
