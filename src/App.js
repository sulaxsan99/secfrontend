import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";
import Slidebar from "./components/Slidebar";
import Visitor from "./components/Visitor";
import Student from "./components/Student";
import Staff from "./components/Staff";
import NavBar from "./components/NavBar";
import Schedule from "./components/Schedule";
import 'bootstrap/dist/css/bootstrap.css';
function App() {
  return (
    <BrowserRouter>
    <NavBar/>
     <div className='d-flex ' >
      <div className='w-auto'>
        <Slidebar />
      </div>
      <div className='col'>
        {/* <NavBar /> */}
        <Routes >
        <Route path="/" element={<DefaultLayout />} />
        
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/Signup" element={<Signup />} />
        
       

        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
      </div>
    </div>
      
  </BrowserRouter>
  );
}
function DefaultLayout() {
  return (
    <div>
        <NavBar/>
        <div className='d-flex ' >
    
    <div className='w-auto'>
      <Slidebar />
    </div>
    <div className='col'>
      {/* <NavBar /> */}
      <Routes >
      <Route index element={<Dashboard />} />
      {/* <Route  path="/" element={<Dashboard/>} /> */}
   
      <Route path="/Visitor" element={<Visitor/>} />
      <Route path="/Student" element={<Student/>} />
      <Route path="/Staff" element={<Staff/>} />
      <Route path="/Schedule" element={<Schedule/>} />
     

      {/* <Route path="*" element={<NoPage />} /> */}
    </Routes>
    </div>
  </div>
    </div>
    
      
  );
}
export default App;
