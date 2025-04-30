import { useEffect } from 'react'
import './App.css'
import Hero from './components/custom/Hero'

// Function to load the Google Maps API script dynamically
const loadGoogleMapsScript = (apiKey) => {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
};

function App() {
  useEffect(() => {
    loadGoogleMapsScript(import.meta.env.VITE_GOOGLE_PLACES_API_KEY);
  }, []);

  return (
    <>
      <Hero />
    </>
  )
}

export default App
