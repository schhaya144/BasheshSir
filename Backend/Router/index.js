const express = require('express');
const router = express.Router();
const multer = require('multer');

const userLoginController = require('../controller/userlogin');



const {
  userRegisterationController,
  getAllUsersController,
} = require('../controller/userRegistration');
// routs for bank details data


const { getCurrentUser } = require('../controller/currentUserController');
const userLogout = require('../controller/userLogout');

const authToken = require('../middleware/auth');

const { saveKYC } = require('../controller/kycController');
const adminLoginController = require('../controller/adminController/loginAdmin');
const authRole = require('../middleware/authRole');
const { createSubadmin } = require('../controller/adminController/createSubadmin');
const { addCourse, getCourses, updateCourse, deleteCourse, getTotalCourses } = require('../controller/courseController');
const { addEvent, getEvents, updateEvent, deleteEvent, getTotalEvents } = require('../controller/eventController');
const { getMembers, updateMembers, deleteMembers, getTotalUsers } = require('../controller/adminController/memberController');

router.post('/signup', userRegisterationController);
router.get('/currentUser', authToken, getCurrentUser);
// login
router.post('/login', userLoginController);
router.post('/admin-login', adminLoginController);
router.get('/userLogout', userLogout);
router.get('/get-allusers', getAllUsersController);
router.post("/create-subadmin", authToken, authRole("manage-users"), createSubadmin )






// Configure Multer for file uploadssss
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // specify your uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });







// kyc form 
router.post(
  '/kyc',
  authToken,
  upload.fields([
    { name: 'companyLogo', maxCount: 1 },
    { name: 'aadhaarImage', maxCount: 1 },
    { name: 'passportPhoto', maxCount: 1 },
  ]),
  saveKYC
);

//Course routes
router.post('/addCourse', upload.single('banner'), addCourse);
router.get('/getCourses', getCourses);
router.put(
  '/updateCourse/:id',
  upload.single('banner'),
  updateCourse
);
router.delete('/deleteCourse/:id', deleteCourse);
router.get('/getTotalCourses', getTotalCourses);

// Routes for Event
router.post('/events', addEvent);
router.get('/events', getEvents);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);
router.get('/events/count', getTotalEvents);

// members 
router.get('/member', getMembers)
router.put('/member/:id', updateMembers)
router.delete('/member/:id', deleteMembers)
router.get("/users/count", getTotalUsers);

module.exports = router;
