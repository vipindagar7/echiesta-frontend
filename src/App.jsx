import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import RegisterDj from './pages/Register-Dj';
import StarNightRegister from './pages/StarNightRegister';
import RegisterEvent from './pages/Register-event';
// layouts
import MainLayout from './layouts/main-layout';
import ProtectedRoute from './lib/protectedRole';
import ScannerLayout from './layouts/scannerLayout';
import UserLayout from './layouts/userLayout';
import AdminLayout from './layouts/adminLayout';

import Dashboard from './pages/protected/user/UserDashboard';

import AdminDashboard from './pages/protected/admin/AdminDashboard';
import CreateUser from './pages/protected/admin/CreateUser';
import GetUsers from './pages/protected/admin/GetUsers';

import ScannerDashboard from './pages/protected/scanner/ScannerDashboard';

import GetConcertRegistration from './pages/protected/common/GetConcertRegistration';
import GetEventRegistration from './pages/protected/common/GetEventRegistration';
import EventRegistrationDetails from './pages/protected/common/GetEventRegistrationDetail';
import TicketCard from './pages/protected/common/GetConcertDetails';
import ScannerCamera from './components/scannerCamers';
import ScannerTicketCard from './components/scannerGetTicket.';
import GamerLayout from './layouts/gamerLayout';
import GamerDashboard from './pages/protected/gaming/GamingDashboard';
import GetGamingRegistration from './pages/protected/gaming/GetGamingRegistration';
import GetCounslingRegistration from './pages/protected/gaming/GetCounslingRegistration';

function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>

          {/* Layout Wrapper */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/admin-login" element={<Login />} />
          </Route>

          {/* User */}
          <Route
            path="/user"
            element={
              <ProtectedRoute role="user">
                <UserLayout />
              </ProtectedRoute>
            }
          >
            {/* Nested routes */}
            <Route index element={<Dashboard />} />
            <Route path="get-concert-registration" element={<GetConcertRegistration />} />
            <Route path="get-concert-registration/:id" element={<TicketCard />} />
            <Route path="get-event-registration" element={<GetEventRegistration />} />
            <Route path="event-registration-details/:id" element={<EventRegistrationDetails />} />
          </Route>

          {/* scanner */}
          <Route
            path="/scanner"
            element={
              <ProtectedRoute role="scanner">
                <ScannerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ScannerDashboard />} />
            <Route path="get-concert-registration" element={<GetConcertRegistration />} />
            <Route path="get-concert-registration/:id" element={<TicketCard />} />
            <Route path="get-event-registration" element={<GetEventRegistration />} />
            <Route path="event-registration-details/:id" element={<EventRegistrationDetails />} />

          </Route>
          {/* admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Nested routes */}
            <Route index element={<AdminDashboard />} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="get-users" element={<GetUsers />} />
            <Route path="get-concert-registration/:id" element={<TicketCard />} />
            <Route path="get-concert-registration" element={<GetConcertRegistration />} />
            <Route path="get-event-registration" element={<GetEventRegistration />} />
            <Route path="event-registration-details/:id" element={<EventRegistrationDetails />} />
            <Route path="getGamingRegistration" element={<GetGamingRegistration />} />
            <Route path="getCounslingRegistration" element={<GetCounslingRegistration />} />
          </Route>
          {/* admin */}
          <Route
            path="/gamer"
            element={
              <ProtectedRoute role="gamer">
                <GamerLayout />
              </ProtectedRoute>
            }
          >
            {/* Nested routes */}
            <Route index element={<GamerDashboard />} />
            <Route path="getGamingRegistration" element={<GetGamingRegistration />} />

            <Route path="getCounslingRegistration" element={<GetCounslingRegistration />} />

          </Route>d
          {/* scanner dashboard */}
          <Route
            path="/scanner"
            element={
              <ProtectedRoute role="scanner">
                <ScannerLayout />
              </ProtectedRoute>
            }
          >
            {/* Default → Camera */}
            <Route index element={<ScannerDashboard />} />

            {/* Search page */}
            <Route path="scan" element={<ScannerCamera />} />

            <Route path="ticket/:id" element={<ScannerTicketCard />} />

          </Route>

        </Routes >

      </BrowserRouter >

    </>
  );
}

export default App;
