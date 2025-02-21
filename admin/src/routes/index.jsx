import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Login from '../pages/Login'
import Dashboard from '../components/Dashboard'
import CourseForm from '../components/CourseForm'
import Sidebar from '../components/Sidebar'
import EventForm from '../components/EventForm'
import MemberTable from '../components/MemberTable'
import ForgotPassword from '../pages/ForgotPassword'
import SubAdminCreation from '../components/SubAdminCreation'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Login />,
      },
      {
        path: 'forgotpassword',
        element: <ForgotPassword />,
      },
      {
        path: 'dashboard',
        element: <Sidebar />,
        children: [
          {
            path: 'dashboardCards',
            element: <Dashboard />,
          },
          {
            path: 'courses',
            element: <CourseForm />,
          },
          {
            path: 'event',
            element: <EventForm />,
          },
          {
            path: 'member-table',
            element: <MemberTable />,
          },
          {
            path: 'subadmin-creation',
            element: <SubAdminCreation/>,
          },
        ],
      },
    ],
  },
])
