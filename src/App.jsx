import React from 'react';
import './App.css';
import RegisterDj from './pages/Register-Dj';
import RegisterEvent from './pages/Register-event';
import Home from './pages/Home';
import MainLayout from './layouts/main-layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StarNightRegister from './pages/StarNightRegister';
import { LogIn } from 'lucide-react';
import Login from './pages/Login';
import ProtectedRoute from './lib/protectedRole';
import UserLayout from './layouts/userLayout';
import Dashboard from './pages/UserDashboard';
import AdminLayout from './layouts/adminLayout';
import AdminDashboard from './pages/AdminDashboard';
import CreateUser from './pages/CreateUser';
import GetUsers from './pages/GetUsers';
import GetConcertRegistration from './pages/GetConcertRegistration';
import GetEventRegistration from './pages/GetEventRegistration';
import EventRegistrationDetails from './pages/GetEventRegistrationDetail';

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
            <Route path="get-concert-registration" element={<GetConcertRegistration />} />
            <Route path="get-event-registration" element={<GetEventRegistration />} />
            <Route path="event-registration-details/:id" element={<EventRegistrationDetails />} />

          </Route>

        </Routes >

      </BrowserRouter >

    </>
  );
}

export default App;
