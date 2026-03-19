import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import VideoBackground from './components/videoBg';
import Events from './components/event';
import Schedule from './components/schedule';
import Contact from './components/contact';
import RegisterDj from './pages/Register-Dj';
import RegisterEvent from './pages/Register-event';
import Home from './pages/Home';
import MainLayout from './layouts/main-layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StarNightRegister from './pages/StarNightRegister';

function App() {
  return (
    <>
     <BrowserRouter>

      <Routes>

        {/* Layout Wrapper */}
        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />

        <Route path="/register-events" element={<RegisterEvent />} />
          <Route path="/register" element={<RegisterEvent />} />


          <Route path="/star-night" element={<RegisterDj />} />
          <Route path="/star-night-register" element={<StarNightRegister />} />

        </Route>

      </Routes>

    </BrowserRouter>

    </>
  );
}

export default App;
