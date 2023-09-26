import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Footer  from './components/Footer';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Erreur from './pages/Erreur';
import SignUp from './pages/Signup';
export default function App() {
  return (
    <React.StrictMode>
      <Router>
        <Navigation/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Erreur />} />

        </Routes>
        <Footer /> 
      </Router>
    </React.StrictMode>
  );
}
