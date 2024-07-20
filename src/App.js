import './App.css';
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/Router"
import NavBar from './Components/Navbar';

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <div className="container-fluid p-0">
        <Router />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
