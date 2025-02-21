import React, { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IoLogoWhatsapp } from "react-icons/io";
import SummaryApi from './common/SummaryApi.jsx';
// import { setUserDetails } from './store/UserSlice.js';
import Context from './Login_registration/Context.jsx';
import { setUserDetails } from './store/UserSlice.js';

function App() {
  const dispatch = useDispatch();
  const location = useLocation(); // Hook to get the current location

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  useEffect(() => {
    // Fetch user details on mount
    fetchUserDetails();
  }, []);

  // Define routes where the Tapbar should not be displayed
  const hideTapbarRoutes = ['/', '/signup'];

  return (
    <Context.Provider
      value={{
        fetchUserDetails,
      }}
    >
      <div className="flex flex-col justify-center items-center  min-h-screen">
        <div className=" w-full shadow-md  relative">
          
          <Outlet />
        
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
