import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      localStorage.setItem('user', JSON.stringify(codeResp));
      getUserProfile(codeResp);
      setOpenDialog(false);
    },
    onError: (error) => {
      console.error('Google login error:', error);
    },
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: 'application/json',
          },
        }
      )
      .then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  return (
    <div className="p-2 shadow-sm flex justify-between items-center px-5">
      <img src="logo.svg" alt="Logo" />

      <div>
        {user ? (
          <div className="flex items-center gap-3">
                <a href="/my-trip">
                
                <button className='bg-gray-600 cursor-pointer hover:bg-gray-800 py-2 px-4 rounded-full font-bold'> My Trip </button>
                </a>
                <a href="/Trip">
                
                <button className='bg-gray-600 cursor-pointer hover:bg-gray-800 py-2 px-4 rounded-full font-bold'>  Create Trip </button>
                </a>
            <Popover className="flex items-center gap-3 cursor-pointer">
              <PopoverTrigger className="flex items-center gap-2 cursor-pointer">
                <button className='cursor-pointer '>
                  <img
                    src={user?.picture}
                    className="h-[36px] w-[36px] rounded-full"
                    alt="User"
                  />
                </button>

              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer text-red-500 hover:underline"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <button
            onClick={() => setOpenDialog(true)}
            className="bg-gray-600 hover:bg-gray-800 py-2 px-4 rounded-full"
          >
            Sign in
          </button>
        )}

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-md">
            <div className>
              <DialogHeader>
                <DialogTitle>Sign in to continue</DialogTitle>
                <DialogDescription>
                  <div className="flex flex-col items-center">
                    <img src="/logo.svg" alt="Logo" className="h-16 w-16" />
                    <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
                    <p>Sign in to the app with Google authentication</p>
                    <Button
                      variant="outline"
                      className="w-full mt-5 flex bg-white items-center text-black hover:bg-gray-400"
                      onClick={login}
                    >
                      <FcGoogle className="h-7 mr-2" /> Sign in with Google
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Header;
