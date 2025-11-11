// import React, { useState } from 'react';
// import axios from 'axios'; // Or use the native Fetch API
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(''); // Clear previous errors

//         try {
//             const response = await axios.post('http://localhost:3001/api/auth/login', {
//                 email,
//                 password,
//             });

//             // Assuming the API returns a token or user data on successful login
//             const { token } = response.data;
//             localStorage.setItem('token', token); // Store token (e.g., in localStorage)

//             // Redirect or update UI to show logged-in state
//             console.log('Login successful!', response.data);
//             navigate('/Task');
//             // Example: history.push('/dashboard'); 
//         } catch (err) {
//             setError('Invalid credentials. Please try again.'); // Display error to user
//             console.error('Login error:', err);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Login</h2>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <div>
//                 <label htmlFor="email">Email:</label>
//                 <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//             </div>
//             <div>
//                 <label htmlFor="password">Password:</label>
//                 <input
//                     type="password"
//                     id="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//             </div>
//             <button type="submit">Log In</button>
//         </form>
//     );
// };

// export default Login;




import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL ;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/Task');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200"
        >
          Log In
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-indigo-600 font-medium hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
