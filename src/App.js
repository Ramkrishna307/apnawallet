import { BrowserRouter as Router,Routes,Route, BrowserRouter } from "react-router-dom";
import DashBoard from "./Pages/DashBoard";
import SignUp from "./Pages/SignUp";
import "./App.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer/>
    <Router>
    <Routes>
        <Route   path="/" element={<SignUp/>}/>
        <Route  path="dashboard" element={<DashBoard/>}/>
    </Routes>
    </Router>
    </>
  );
}

export default App;
