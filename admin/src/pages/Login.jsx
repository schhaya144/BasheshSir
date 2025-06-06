// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await fetch("http://localhost:8077/api/admin-login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Invalid credentials");
//       }

//       // Store token and role in localStorage
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.role);

//       // Redirect based on role
//       if (data.role === 1) {
//         navigate("/dashboard"); // Admin Dashboard
//       } else if (data.role === 2) {
//         navigate("/dashboard/subadmin"); // Sub-Admin Dashboard
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
//       <div className="container max-w-md mx-auto p-4">
//         <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
//           <h1 className="text-3xl font-bold text-center mb-6 border-b border-gray-700 pb-2">
//             Admin Login
//           </h1>

//           {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-sm font-medium mb-2">Email:</label>
//               <input
//                 type="email"
//                 placeholder="Enter admin email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Password:</label>
//               <input
//                 type="password"
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 required
//               />
//             </div>

//             <button type="submit" className="w-full py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold rounded-lg hover:from-teal-500 hover:to-blue-600">
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AdminLogin;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8077/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      // Store user data in localStorage
      const userData = { token: data.token, role: data.role, permissions: data.permissions || [] };
      localStorage.setItem("userData", JSON.stringify(userData));

      // Redirect based on role
      navigate("/dashboard/dashboardCards");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      <div className="container max-w-md mx-auto p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
          <h1 className="text-3xl font-bold text-center mb-6 border-b border-gray-700 pb-2">
            Admin Login
          </h1>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-2">Email:</label>
              <input
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password:</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button type="submit" className="w-full py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold rounded-lg hover:from-teal-500 hover:to-blue-600">
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
