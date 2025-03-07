// const backendDomain = 'https://trademyindiabackend.onrender.com';
const backendDomain = 'http://localhost:8077';

const SummaryApi = {
  
  
  current_user: {
    url: `${backendDomain}/api/currentUser`,
    method: 'get',
  },
  update_current_user: {
    url: `${backendDomain}/api/update-singleuser/:id`,
    method: 'put',
  },
  logout_current_user: {
    url: `${backendDomain}/api/userLogout`,
    method: 'get',
  },
 
 
  Signup: {
    url: `${backendDomain}/api/signup`,
    method: 'post',
  },
  Login: {
    url: `${backendDomain}/api/login`,
    method: 'post',
  },
  Forgetuserpassword: {
    url: `${backendDomain}/api/forgetuserpassword`,
    method: 'post',
  },
  Changeuserpassword: {
    url: `${backendDomain}/api/changeuserpassword`,
    method: 'post',
  },
  investedPackages: {
    url: `${backendDomain}/api/invested-packages`,
    method: 'get',
  },
 
 

  
 
};

export default SummaryApi;
