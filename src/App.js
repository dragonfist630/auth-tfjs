import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoggedUser from './pages/LoggedUser/LoggedUser';
import AuthUser from './pages/authUser/AuthUser';
import RegisterUser from './pages/RegisterUser/RegisterUser';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { loadModels } from './modelLoader/modelLoader';
import Login from './pages/Login/Login';

export default function App() {
  useEffect(() => {
    const loadFaceModels = async () => {
      await loadModels();
    };
    loadFaceModels();
  }, []);

  return (
    <Router basename="/auth-tfjs">
      <Routes>
        <Route path="/" element={<RegisterUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loggedUser" element={<LoggedUser />} />
        <Route path="/authenticated" element={<AuthUser />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}
