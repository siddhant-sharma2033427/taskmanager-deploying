import './App.css';
import {BrowserRouter,Routes, Route } from "react-router-dom"

//importing components
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
