// import React, { useState } from "react";
// import axios from "axios";

// const SubAdminCreation = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [contactNo, setContactNo] = useState("");
//   const [role, setRole] = useState(2); // Subadmin role
//   const [permissions, setPermissions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const availablePermissions = [
//     "view-dashboard",
//     "manage-users",
//     "edit-sub-settings",
//     // "view-reports",
//     "edit-package-course",
//     "event-permission",
//   ];

//   const handleCheckboxChange = (permission) => {
//     setPermissions((prevPermissions) =>
//       prevPermissions.includes(permission)
//         ? prevPermissions.filter((perm) => perm !== permission)
//         : [...prevPermissions, permission]
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");
  
//     const subAdminData = {
//       name,
//       email,
//       password,
//       contactNo,
//       role,
//       permissions,
//     };
  
//     try {
//       const token = localStorage.getItem("token"); // Fetch token from local storage or cookies
//       const response = await axios.post(
//         "http://localhost:8077/api/create-subadmin",
//         subAdminData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Pass JWT token for authentication
//             "Content-Type": "application/json",
//           },
//           withCredentials: true, // Ensures cookies are sent if needed
//         }
//       );
  
//       setMessage("Sub-admin created successfully!");
//       setName("");
//       setEmail("");
//       setPassword("");
//       setContactNo("");
//       setPermissions([]);
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message || "Failed to create sub-admin. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
//           Create Subadmin
//         </h2>
//         {message && <p className="text-center text-red-500">{message}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <input
//             type="text"
//             placeholder="Contact No"
//             value={contactNo}
//             onChange={(e) => setContactNo(e.target.value)}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />

//           <div className="mt-4">
//             <h3 className="text-lg font-medium text-gray-700 mb-2">
//               Permissions:
//             </h3>
//             <div className="space-y-2">
//               {availablePermissions.map((permission) => (
//                 <label key={permission} className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     checked={permissions.includes(permission)}
//                     onChange={() => handleCheckboxChange(permission)}
//                     className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//                   />
//                   <span className="text-gray-700">{permission}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             {loading ? "Creating..." : "Create Subadmin"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SubAdminCreation;


import { useState } from "react";
import axios from "axios";

const SubAdminCreation = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [role] = useState(2);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const availablePermissions = [
    "view-dashboard",
    "manage-users",
    "edit-sub-settings",
    "edit-package-course",
    "event-permission",
  ];

  const handleCheckboxChange = (permission) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((perm) => perm !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const subAdminData = { name, email, password, contactNo, role, permissions };

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8077/api/create-subadmin", subAdminData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        withCredentials: true,
      });

      setMessage("Sub-admin created successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setContactNo("");
      setPermissions([]);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to create sub-admin. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen bg-gray-900 text-white  rounded-lg shadow-lg p-6">
      <div className="w-full p-6 bg-gradient-to-br from-gray-800 via-gray-800 to-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4 border-b border-gray-600 pb-2">Create Subadmin</h2>
        {message && <p className="text-center text-red-400">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:ring focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:ring focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:ring focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Contact No"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            required
            className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:ring focus:ring-blue-400"
          />

          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Permissions:</h3>
            <div className="space-y-2">
              {availablePermissions.map((permission) => (
                <label key={permission} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={permissions.includes(permission)}
                    onChange={() => handleCheckboxChange(permission)}
                    className="h-5 w-5 text-blue-400 border-gray-300 rounded focus:ring-blue-400"
                  />
                  <span>{permission}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white py-2 rounded-lg font-bold"
          >
            {loading ? "Creating..." : "Create Subadmin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubAdminCreation;
