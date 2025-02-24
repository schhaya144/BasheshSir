import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiTrash, FiDownload } from "react-icons/fi";
import * as XLSX from "xlsx";

const MemberTable = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    u_id: "",
    name: "",
    contactNo: "",
    email: "",
    role: 3,
  });
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8077/api/member");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:8077/api/member/${editingId}`, formData);
    } 
    fetchUsers();
    setFormData({ u_id: "", name: "", contactNo: "", email: "", role: 3 });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8077/api/member/${id}`);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditingId(user._id);
    setFormData({
      u_id: user.u_id,
      name: user.name,
      contactNo: user.contactNo,
      email: user.email,
      role: user.role,
    });
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "UserDetails.xlsx");
  };
 // Pagination Logic
 const indexOfLastUser = currentPage * usersPerPage;
 const indexOfFirstUser = indexOfLastUser - usersPerPage;
 const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

 const nextPage = () => {
   if (indexOfLastUser < users.length) {
     setCurrentPage(currentPage + 1);
   }
 };

 const prevPage = () => {
   if (currentPage > 1) {
     setCurrentPage(currentPage - 1);
   }
 };
  return (
    <div className="container mx-auto p-6  min-h-screen bg-gray-900 text-white rounded-lg shadow-lg ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">User Management</h2>
        <button onClick={handleExportToExcel} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center">
          <FiDownload className="mr-2" /> Download Excel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <input type="number" name="u_id" placeholder="User ID" value={formData.u_id} onChange={handleChange} required className="p-2 border border-gray-700 rounded bg-gray-800" />
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="p-2 border border-gray-700 rounded bg-gray-800" />
        <input type="number" name="contactNo" placeholder="Contact No" value={formData.contactNo} onChange={handleChange} className="p-2 border border-gray-700 rounded bg-gray-800" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-2 border border-gray-700 rounded bg-gray-800" />
        <select name="role" value={formData.role} onChange={handleChange} className="p-2 border border-gray-700 rounded bg-gray-800">
          <option value="1">Admin</option>
          <option value="2">Manager</option>
          <option value="3">User</option>
        </select>
        <button type="submit" className="col-span-1 md:col-span-5  px-4 py-2 rounded bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white">
          Update User
        </button>
      </form>

      <table className="w-full border border-gray-700 text-sm">
        <thead>
          <tr className="bg-gray-700">
            <th className="border border-gray-700 px-4 py-2">ID</th>
            <th className="border border-gray-700 px-4 py-2">Name</th>
            <th className="border border-gray-700 px-4 py-2">Contact</th>
            <th className="border border-gray-700 px-4 py-2">Email</th>
            <th className="border border-gray-700 px-4 py-2">Role</th>
            <th className="border border-gray-700 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user._id} className="hover:bg-gray-800">
              <td className="border border-gray-700 px-4 py-2">{user.u_id}</td>
              <td className="border border-gray-700 px-4 py-2">{user.name}</td>
              <td className="border border-gray-700 px-4 py-2">{user.contactNo}</td>
              <td className="border border-gray-700 px-4 py-2">{user.email}</td>
              <td className="border border-gray-700 px-4 py-2">{user.role}</td>
              <td className="border border-gray-700 px-4 py-2 flex justify-center gap-2">
                <button onClick={() => handleEdit(user)} className="text-yellow-500">
                  <FiEdit />
                </button>
                <button onClick={() => handleDelete(user._id)} className="text-red-500">
                  <FiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-600">
          Previous
        </button>
        <span className="text-lg">Page {currentPage}</span>
        <button onClick={nextPage} disabled={indexOfLastUser >= users.length} className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-600">
          Next
        </button>
      </div>
    </div>
  );
};

export default MemberTable;