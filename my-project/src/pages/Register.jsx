// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
 

// const Register = () => {
//     const navigate = useNavigate();
//     const [image, setImage] = useState(null);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         avatar: null
//     });

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setFormData({
//             ...formData,
//             avatar: image
//         });
//         console.log("Form Data:", formData);
//         try {
//             const response = await axios.post('http://localhost:3001/api/auth/register',
//                 formData,
//                 {
//                     headers: {
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 });
//             console.log('User created successfully:', response.data);
//             if (response.data) {
//                 setFormData({ name: '', email: '', password: '' ,avatar: null});
//                 navigate('/login'); // Navigate to the dashboard page
//             }
//             // Optionally reset form or show success message
//         } catch (error) {
//             console.error('Error creating user:', error);
//             // Handle error display
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//             <div>
//                 <label htmlFor="name">Name:</label>
//                 <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                 />
//             </div>
//             <div>
//                 <label htmlFor="email">Email:</label>
//                 <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                 />
//             </div>
//             <div>
//                 <label htmlFor="password">Password:</label>
//                 <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                 />
//             </div>


//             <input type="file" name="avatar"   onChange={(e) => setImage(e.target.files[0])}   accept="image/*" />
//             <button type="submit">Submit</button>
//         </form>
//     );
// };

// export default Register;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL ;

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // for image preview
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // preview the image
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('avatar', image);

    try {
      const response = await axios.post(
        `${API_URL}/auth/register`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('User created successfully:', response.data);
      if (response.data) {
        setFormData({ name: '', email: '', password: '' });
        setImage(null);
        setPreview(null);
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your name"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your password"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Profile Image
          </label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-600
              hover:file:bg-indigo-100"
          />

          {/* Image Preview */}
          {preview && (
            <div className="mt-4 flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-indigo-400"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/')}
            className="text-indigo-600 font-medium hover:underline cursor-pointer"
          >
            Log in
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
