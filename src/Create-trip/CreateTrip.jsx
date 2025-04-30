import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import toast, { Toaster } from 'react-hot-toast';
import './trip.css';
import { AI_Prompt, SelectBudgetOptions, SelectTravelestList } from '@/constants/Options';
import { chatSession } from '@/service/AImodel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/service/Firebaseconfig';
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formdata, setFormdata] = useState({
    location: null,
    noofdays: null,
    budget: null,
    Traveler: null,
  });
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
const route=useNavigate()

  const handleInputChange = (name, value) => {
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formdata);
  }, [formdata]);

  const onGenerateTrip = async () => {
    // Parse the user object to check if it's valid JSON
    let user;
    try {
      const userStr = localStorage.getItem('user');
      user = userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      console.error("Error parsing user from localStorage:", e);
      user = null;
    }
    
    // Check if user is logged in
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formdata?.location) {
      toast.error('Please select a destination');
      return;
    }

    if (!formdata?.noofdays) {
      toast.error('Please enter number of days');
      return;
    }

    if (formdata?.noofdays > 15) {
      toast('Trip duration should not exceed 15 days', 'warning');
      // or possibly:
      // toast('Trip duration should not exceed 5 days', { type: 'warning' });
      return;
    }

    if (!formdata?.budget) {
      toast.error('Please select your budget');
      return;
    }

    if (!formdata?.Traveler) {
      toast.error('Please select with whom you are traveling');
      return;
    }

    setLoading(true);
    toast.success('Trip generation started!');

    try {
      const Final_prompt = AI_Prompt
        .replace('{location}', formdata?.location?.label)
        .replace('{totaldays}', formdata?.noofdays)
        .replace('{traveler}', formdata?.Traveler)
        .replace('{budget}', formdata?.budget);

      console.log(Final_prompt);

      const result = await chatSession.sendMessage(Final_prompt);
      console.log(result?.response?.text());
       saveAitrip(result?.response?.text());
    } catch (error) {
      console.error('Error generating trip:', error);
      toast.error('Failed to generate trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      localStorage.setItem('user', JSON.stringify(codeResp));
      getUserProfile(codeResp);
      setOpenDialog(false);
    },
    onError: (error) => {
      console.log("Google login error:", error);
      toast.error("Login failed. Please try again.");
    },
  });

  const getUserProfile = (tokenInfo) => {
    axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: 'application/json',
        },
      }
    ).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    }).catch((error) => {
      console.error('Error fetching user profile:', error);
      toast.error("Failed to fetch user profile.");
    });
  };

  const saveAitrip = async (tripdata) => {
    // Get the user from localStorage with the correct key
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
  
    // Create a document with conditional email field
    const docData = {
      userselection: formdata,
      Tripdata:JSON.parse(tripdata),
      id: docId
    };
    route('/view-trip/'+docId)
    // Only add the email field if it exists
    if (user && user.email) {
      docData.userEmail = user.email;
    }
  
    await setDoc(doc(db, "AITrips", docId), docData);
  };

  return (
    <div className='sm:p-10 md:px-32 lg:px-56 xl:px-10 px-5 '>
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className='font-bold text-3xl'>Tell us your travel preference</h2>
      <p className='mt-3 text-gray-500 flex '>Just provide some basic information.</p>

      <div className='mt-10 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>Choose a destination</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location', v);
              },
              className: 'w-full rounded-lg bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:bg-black',
              placeholder: 'Search for a place...',
            }}
          />
        </div>
        <div>
          <h2 className='text-xl mt-5 my-3 font-medium bg-gray'>How many days are you planning for?</h2>
          <input
            type="number"
            placeholder={'Ex. 3'}
            className='bg-gray-100 text-black p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500'
            onChange={(e) => handleInputChange('noofdays', e.target.value)}
          />
        </div>
      </div>

      <div>
      <h2 className='text-xl mt-10 my-3 font-medium'>What is your budget?</h2>
      <div className='grid grid-cols-3 gap-5 mt-5'>
        {SelectBudgetOptions.map((item, index) => (
          <div
            key={index}
            onClick={() => handleInputChange('budget', item.title)}
            className={`relative hover:scale-105 transition-all p-12 border rounded-lg hover:shadow-lg shadow-cyan-800 bg-gray-100 cursor-pointer 
              ${formdata?.budget === item.title ? 'scale-108 border-2 border-green-400' : ''}`}
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
        
            <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>

         
            <div className="relative z-10 text-white text-center p-4">
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-200'>{item.desc}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
       <div> <h2 className='text-xl mt-10 my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2></div>
      <div className='grid grid-cols-3 gap-5 mt-5'>
        
  {SelectTravelestList.map((item, index) => (
    <div
      key={index}
      onClick={() => handleInputChange('Traveler', item.people)}
      className={`relative hover:scale-105 transition-all p-12 border rounded-lg hover:shadow-lg shadow-cyan-800 bg-gray-100 cursor-pointer ${
        formdata?.Traveler === item.people ? 'scale-108 transition-all border-2 border-green-400' : ''
      }`}
      style={{
        backgroundImage: `url(${item.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark Overlay for Better Text Visibility */}
      <div className="absolute inset-0 bg-black opacity-40 rounded-lg"> </div>

      {/* Text Content */}
      <div className="relative z-10 text-white text-center p-4">
        <h2 className='text-4xl'>{item.icon}</h2>
        <h2 className='font-bold text-lg'>{item.title}</h2>
        <h2 className='text-sm text-gray-200'>{item.desc}</h2>
      </div>
    </div>
  ))}
</div>

      <div className='my-10 flex justify-end '>
        <button
          disabled={loading}
          onClick={onGenerateTrip}
          className='px-6 py-2 bg-gray-600 border-2 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
        >
          {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'}
        </button>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign in to continue</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col items-center ">
                <img src="/logo.svg" alt="Logo" className="h-16 w-16" />
                <h2 className='font-bold text-lg mt-7'>Sign in with Google</h2>
                <p>Sign in to the app with Google authentication</p>
                <Button
                  variant="outline"
                  className='w-full mt-5 flex bg-white items-center text-black hover:bg-gray-400'
                  onClick={() => login()}
                >
                  <FcGoogle className='h-7 mr-2' /> Sign in with Google
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      </div>
  );
}

export default CreateTrip;