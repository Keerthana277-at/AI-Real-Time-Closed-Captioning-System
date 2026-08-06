import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";

import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoutes";

function App(){
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={
          <ProtectedRoute>
             <Dashboard/>
          </ProtectedRoute>
          }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;