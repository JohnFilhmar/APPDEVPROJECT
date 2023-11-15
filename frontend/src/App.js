import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import Login from "./components/Login";
import TopNavbar from "./components/TopNavbar";
import Register from "./components/Register";
import DashTable from "./components/DashTable";

function App() {
  return (
    <>
      <Router>
        <AppContent />
      </Router>
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
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/" component={DashTable}/>
      </Switch>
    </>
  );
};

export default App;
