import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common/SummaryApi.jsx";
import { FaUser, FaPhone, FaKey, FaBuilding, FaGlobe, FaEnvelope, FaLock } from "react-icons/fa";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    whatsappNo: "",
    gst: "",
    companyId: "",
    companyWebsite: "",
    email: "",
    password: "",
    role: 3,
  });

  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(() => {
    const storedId = localStorage.getItem("u_id");
    return storedId ? parseInt(storedId) : 6000010;
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newUserId = (userId + 1).toString();
    const requestData = { ...formData, u_id: newUserId };

    try {
      const response = await fetch(SummaryApi.Signup.url, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.text();
      console.log("Server Response:", result);

      if (!response.ok) {
        throw new Error(`Server Error: ${result}`);
      }

      setUserId(parseInt(newUserId));
      localStorage.setItem("u_id", newUserId);
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#39237D] to-[#6A4AA1]">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-8 border border-white/20">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center border rounded-lg p-2 bg-white/20 shadow-md">
              <FaUser className="text-white mx-2" />
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required className="w-full bg-transparent text-white placeholder-white border-none focus:ring-0 outline-none" />
            </div>

            <div className="flex items-center border rounded-lg p-2 bg-white/20 shadow-md">
              <FaPhone className="text-white mx-2" />
              <input type="tel" name="contactNo" placeholder="Contact No" value={formData.contactNo} onChange={handleInputChange} required className="w-full bg-transparent text-white placeholder-white border-none focus:ring-0 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center border rounded-lg p-2 bg-white/20 shadow-md">
              <FaPhone className="text-white mx-2" />
              <input type="tel" name="whatsappNo" placeholder="WhatsApp No" value={formData.whatsappNo} onChange={handleInputChange} required className="w-full bg-transparent text-white placeholder-white border-none focus:ring-0 outline-none" />
            </div>

            <div className="flex items-center border rounded-lg p-2 bg-white/20 shadow-md">
              <FaKey className="text-white mx-2" />
              <input type="text" name="gst" placeholder="GST Number" value={formData.gst} onChange={handleInputChange} required className="w-full bg-transparent text-white placeholder-white border-none focus:ring-0 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center border rounded-lg p-2 bg-white/20 shadow-md">
              <FaBuilding className="text-white mx-2" />
              <input type="text" name="companyId" placeholder="Company ID" value={formData.companyId} onChange={handleInputChange} required className="w-full bg-transparent text-white placeholder-white border-none focus:ring-0 outline-none" />
            </div>

            <div className="flex items-center border rounded-lg p-2 bg-white/20 shadow-md">
              <FaGlobe className="text-white mx-2" />
              <input type="url" name="companyWebsite" placeholder="Company Website" value={formData.companyWebsite} onChange={handleInputChange} required className="w-full bg-transparent text-white placeholder-white border-none focus:ring-0 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center border rounded-lg p-2 bg-white/20 shadow-md">
              <FaEnvelope className="text-white mx-2" />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required className="w-full bg-transparent text-white placeholder-white border-none focus:ring-0 outline-none" />
            </div>

            <div className="flex items-center border rounded-lg p-2 bg-white/20 shadow-md">
              <FaLock className="text-white mx-2" />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required className="w-full bg-transparent text-white placeholder-white border-none focus:ring-0 outline-none" />
            </div>
          </div>

          <button type="submit" className="w-full py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-700 transition duration-300">
            Register
          </button>
        </form>

        {message && <p className="mt-4 text-center text-red-500">{message}</p>}

        <p className="text-center text-white mt-4">
          Already have an account? <button onClick={() => navigate("/")} className="text-teal-300 hover:underline">Login</button>
        </p>
      </div>
    </section>
  );
};

export default RegisterForm;
