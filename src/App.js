import React, { useEffect, lazy } from 'react';
import './App.css';
import firebase from "./config/firebase";
import { Route, Routes, BrowserRouter as Router} from "react-router-dom";
import { ROUTES } from "./config/routes";

const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('./modules/auth/pages/RegisterPage'))
const MessengerPage = lazy(() => import('./modules/home/pages/MessengerPage'))


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path={ROUTES.login} element={<LoginPage/>}/>
          <Route path={ROUTES.register} element={<RegisterPage/>}/>
          <Route path={ROUTES.messenger} element={<MessengerPage/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
