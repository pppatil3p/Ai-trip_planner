import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './Create-trip/CreateTrip';
import Header from './components/custom/Header';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripid]/Viewtrip';
import Mytrip from './my-trip/Mytrip';
import Itinerary from './view-trip/componants/Itinerary '; 
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <App />
      </>
    ),
  },
  {
    path: '/Trip',
    element: (
      <>
        <Header />
        <CreateTrip />
      </>
    ),
  },
  {
    path: '/my-trip',
    element: (
      <>
        <Header />
        <Mytrip />
      </>
    ),
  },
  {
    path: '/view-trip/:tripid',
    element: (
      <>
        <Header />
        <Viewtrip />
      </>
    ),
  },
  {
    path: '/itinerary', 
    element: (
      <>
        <Header />
        <Itinerary />
      </>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OUTH_CLIENT_ID}>
      <Toaster position="top-center" />
      <ToastContainer /> 
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
