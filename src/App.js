import { BrowserRouter as Router,Routes,Route, BrowserRouter } from "react-router-dom";
import DashBoard from "./Pages/DashBoard";
import SignUp from "./Pages/SignUp";
function App() {
  return (
    <>
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
