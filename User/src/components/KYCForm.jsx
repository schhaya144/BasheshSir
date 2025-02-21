import React, { useState } from 'react';

const KYCForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    participantName: '',
    email: '',
    contactNo: '',
    gst: '',
    panCardNumber: '',
    tshirtSize: 'S',
  });

  const [files, setFiles] = useState({
    companyLogo: null,
    aadhaarImage: null,
    passportPhoto: null,
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formDataToSend = new FormData();
    formDataToSend.append('companyName', formData.companyName);
    formDataToSend.append('participantName', formData.participantName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('contactNo', formData.contactNo);
    formDataToSend.append('gst', formData.gst);
    formDataToSend.append('panCardNumber', formData.panCardNumber);
    formDataToSend.append('tshirtSize', formData.tshirtSize);
    formDataToSend.append('companyLogo', files.companyLogo);
    formDataToSend.append('aadhaarImage', files.aadhaarImage);
    formDataToSend.append('passportPhoto', files.passportPhoto);

    try {
      const response = await fetch('http://localhost:8077/api/kyc', {
        method: 'POST',
        body: formDataToSend,
        credentials: 'include', 
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      alert('KYC form submitted successfully!');
      setFormData({
        companyName: '',
        participantName: '',
        email: '',
        contactNo: '',
        gst: '',
        panCardNumber: '',
        tshirtSize: 'S',
      });
      setFiles({
        companyLogo: null,
        aadhaarImage: null,
        passportPhoto: null,
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">KYC Form</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Company Logo */}
        <div className="mb-4">
          <label htmlFor="companyLogo" className="block text-sm font-medium text-gray-700">Company Logo</label>
          <input type="file" id="companyLogo" name="companyLogo" onChange={handleFileChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
        </div>

        {/* Company Name */}
        <div className="mb-4">
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
          <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
        </div>

        {/* Participant Name */}
        <div className="mb-4">
          <label htmlFor="participantName" className="block text-sm font-medium text-gray-700">Participant Name</label>
          <input type="text" id="participantName" name="participantName" value={formData.participantName} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
        </div>

        {/* Contact Number */}
        <div className="mb-4">
          <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700">Contact Number</label>
          <input type="number" id="contactNo" name="contactNo" value={formData.contactNo} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
        </div>

        {/* Aadhaar Image */}
        <div className="mb-4">
          <label htmlFor="aadhaarImage" className="block text-sm font-medium text-gray-700">Aadhaar Image</label>
          <input type="file" id="aadhaarImage" name="aadhaarImage" onChange={handleFileChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
        </div>

        {/* Passport Photo */}
        <div className="mb-4">
          <label htmlFor="passportPhoto" className="block text-sm font-medium text-gray-700">Passport Photo</label>
          <input type="file" id="passportPhoto" name="passportPhoto" onChange={handleFileChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
        </div>

        {/* GST */}
        <div className="mb-4">
          <label htmlFor="gst" className="block text-sm font-medium text-gray-700">GST Number</label>
          <input type="text" id="gst" name="gst" value={formData.gst} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
        </div>

        {/* PAN Card Number */}
        <div className="mb-4">
          <label htmlFor="panCardNumber" className="block text-sm font-medium text-gray-700">PAN Card Number</label>
          <input type="text" id="panCardNumber" name="panCardNumber" value={formData.panCardNumber} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
        </div>

        {/* T-shirt Size */}
        <div className="mb-4">
          <label htmlFor="tshirtSize" className="block text-sm font-medium text-gray-700">T-shirt Size</label>
          <select id="tshirtSize" name="tshirtSize" value={formData.tshirtSize} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md" required>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default KYCForm;
