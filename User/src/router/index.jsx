import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../Login_registration/Login';
import DisclosureAgreement from '../Login_registration/DisclosureAgreement';


import RegisterForm from '../Login_registration/Register.jsx';

import KYCForm from '../components/KYCForm.jsx';

export const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '',
        element: <Login />,
      },

      {
        path: 'signup',
        element: <RegisterForm />,
      },

      {
        path: 'DisclosureAgreement',
        element: <DisclosureAgreement />,
      },
  
      {
        path: 'kyc',
        element: <KYCForm />,
      },
  
      
    
]}
]);
