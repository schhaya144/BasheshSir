
// import React, { useState } from 'react'
// import { Outlet, Link } from 'react-router-dom'
// import { TbLayoutDashboardFilled } from 'react-icons/tb'
// import {
//   FaChalkboardTeacher,
//   FaCalendarAlt,
//   FaClipboardList,
//   FaSignOutAlt,
// } from 'react-icons/fa'
// import { FaBars } from 'react-icons/fa6'
// import { FaUserShield } from 'react-icons/fa'

// const Sidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false)

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed)
//   }

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside
//         className={`${
//           isCollapsed ? 'w-16' : 'w-60'
//         } bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-white fixed h-full shadow-lg transition-all duration-300`}
//       >
//         <div className="p-4 flex items-center justify-between">
//           {!isCollapsed && (
//             <div className="flex flex-col items-center">
//               <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-teal-400 to-blue-500 p-5 shadow-md">
//                 <FaUserShield size={36} className="text-white" />
//               </div>
//               <h1 className="text-xl font-semibold mt-2">Admin Panel</h1>
//             </div>
//           )}
//           <button
//             onClick={toggleSidebar}
//             className="text-white focus:outline-none hover:text-teal-400 transition duration-200"
//           >
//             <FaBars size={20} />
//           </button>
//         </div>

//         <nav className="mt-8">
//           <Link
//             to="dashboardCards"
//             className="flex items-center px-4 py-3 hover:bg-teal-500 hover:text-white rounded-lg transition-colors duration-300"
//           >
//             <TbLayoutDashboardFilled className="mr-2" size={20} />
//             {!isCollapsed && <span>Dashboard</span>}
//           </Link>

//           <Link
//             to="courses"
//             className="flex items-center px-4 py-3 hover:bg-teal-500 hover:text-white rounded-lg transition-colors duration-300"
//           >
//             <FaChalkboardTeacher className="mr-2" size={20} />
//             {!isCollapsed && <span>Courses</span>}
//           </Link>

//           <Link
//             to="event"
//             className="flex items-center px-4 py-3 hover:bg-teal-500 hover:text-white rounded-lg transition-colors duration-300"
//           >
//             <FaCalendarAlt className="mr-2" size={20} />
//             {!isCollapsed && <span>Events</span>}
//           </Link>

//           <Link
//             to="member-table"
//             className="flex items-center px-4 py-3 hover:bg-teal-500 hover:text-white rounded-lg transition-colors duration-300"
//           >
//             <FaClipboardList className="mr-2" size={20} />
//             {!isCollapsed && <span>Member Table</span>}
//           </Link>

//           <Link
//             to="subadmin-creation"
//             className="flex items-center px-4 py-3 hover:bg-teal-500 hover:text-white rounded-lg transition-colors duration-300"
//           >
//             <FaClipboardList className="mr-2" size={20} />
//             {!isCollapsed && <span>Sub-Admin Creation</span>}
//           </Link>

//           <Link
//             to="/"
//             className="flex items-center px-4 py-3 hover:bg-teal-500 hover:text-white rounded-lg transition-colors duration-300"
//           >
//             <FaSignOutAlt className="mr-2" size={20} />
//             {!isCollapsed && <span>Logout</span>}
//           </Link>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div
//         className={`flex-grow ${
//           isCollapsed ? 'ml-16' : 'ml-60'
//         } h-[100vh]  transition-all duration-300`}
//       >
//         <main className="p-3">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   )
// }

// export default Sidebar
import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { TbLayoutDashboardFilled } from 'react-icons/tb';
import {
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaClipboardList,
  FaSignOutAlt,
} from 'react-icons/fa';
import { FaBars } from 'react-icons/fa6';
import { FaUserShield } from 'react-icons/fa';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [role, setRole] = useState(null);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    // Fetch user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setRole(userData.role);
      setPermissions(userData.permissions || []);
    }
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Check if the user has a specific permission
  const hasPermission = (permission) => role === 1 || permissions.includes(permission);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? 'w-16' : 'w-60'
        } bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-white fixed h-full shadow-lg transition-all duration-300`}
      >
        <div className="p-4 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-teal-400 to-blue-500 p-5 shadow-md">
                <FaUserShield size={36} className="text-white" />
              </div>
              <h1 className="text-xl font-semibold mt-2">Admin Panel</h1>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none hover:text-teal-400 transition duration-200"
          >
            <FaBars size={20} />
          </button>
        </div>

        <nav className="mt-8">
          {hasPermission("view-dashboard") && (
            <Link
              to="dashboardCards"
              className="flex items-center px-4 py-3 hover:bg-teal-500 hover:text-white rounded-lg transition-colors duration-300"
            >
              <TbLayoutDashboardFilled className="mr-2" size={20} />
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
          )}

          {hasPermission("edit-package-course") && (
            <Link
              to="courses"
              className="flex items-center px-4 py-3 hover:bg-teal-500 hover:text-white rounded-lg transition-colors duration-300"
            >
              <FaChalkboardTeacher className="mr-2" size={20} />
              {!isCollapsed && <span>Courses</span>}
            </Link>
          )}

          {hasPermission("event-permission") && (
            <Link
              to="event"
              className="flex items-center px-4 py-3 hover:bg-teal-500 hover:text-white rounded-lg transition-colors duration-300"
            >
              <FaCalendarAlt className="mr-2" size={20} />
              {!isCollapsed && <span>Events</span>}
            </Link>
          )}

          {hasPermission("manage-users") && (
            <Link
              to="member-table"
              className="flex items-center px-4 py-3 hover:bg-teal-500 hover:text-white rounded-lg transition-colors duration-300"
            >
              <FaClipboardList className="mr-2" size={20} />
              {!isCollapsed && <span>Member Table</span>}
            </Link>
          )}

          {hasPermission("edit-sub-settings") && (
            <Link
              to="subadmin-creation"
              className="flex items-center px-4 py-3 hover:bg-teal-500 hover:text-white rounded-lg transition-colors duration-300"
            >
              <FaClipboardList className="mr-2" size={20} />
              {!isCollapsed && <span>Sub-Admin Creation</span>}
            </Link>
          )}

          <Link
            to="/"
            className="flex items-center px-4 py-3 hover:bg-teal-500 hover:text-white rounded-lg transition-colors duration-300"
            onClick={() => localStorage.removeItem("userData")} // Clear storage on logout
          >
            <FaSignOutAlt className="mr-2" size={20} />
            {!isCollapsed && <span>Logout</span>}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`flex-grow ${isCollapsed ? 'ml-16' : 'ml-60'} h-[100vh] transition-all duration-300`}>
        <main className="p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
