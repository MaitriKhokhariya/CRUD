// // src/Task.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// const Task = () => {
//     const navigate = useNavigate();

//     const [tasks, setTasks] = useState([]);

//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         status: "pending",
//     });
//     const [editingTask, setEditingTask] = useState(null);


//     // pagination
//     const [currentPage, setCurrentPage] = useState(1);
//     const [postsPerPage] = useState(2);
//     const indexOfLastPost = currentPage * postsPerPage;
//     const indexOfFirstPost = indexOfLastPost - postsPerPage;
//     const currentPosts = tasks.slice(indexOfFirstPost, indexOfLastPost);

//     const API_URL = "http://localhost:3001/api"; // ✅ your actual backend endpoint

//     // Fetch all tasks (READ)
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (!token) {
//             navigate('/login'); // Navigate to the dashboard page
//         }
//         console.log("token", token)

//         fetchTasks();
//     }, []);

//     const fetchTasks = async () => {
//         try {
//             const token = localStorage.getItem("token");

//             const res = await axios.get(API_URL, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setTasks(res.data);
//         } catch (err) {
//             console.error("Error fetching tasks:", err);
//         }
//     };

//     // Handle form input
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // Create new task
//     const handleCreate = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             console.log("token", token)

//             if (!formData.title.trim()) return alert("Title is required!");
//             const res = await axios.post("http://localhost:3001/api/createTasks", formData, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setTasks([...tasks, res.data]);
//             setFormData({ title: "", description: "", status: "pending" });
//         } catch (err) {
//             console.error("Error creating task:", err);
//         }
//     };

//     // Update existing task
//     const handleUpdate = async (id) => {
//         try {
//             const token = localStorage.getItem("token");
//             const res = await axios.put(`http://localhost:3001/api/${id}`, formData, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
//             setEditingTask(null);
//             setFormData({ title: "", description: "", status: "pending" });
//         } catch (err) {
//             console.error("Error updating task:", err);
//         }
//     };

//     // Delete task
//     const handleDelete = async (id) => {
//         try {
//             const token = localStorage.getItem("token");
//             await axios.delete(`${API_URL}/${id}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setTasks(tasks.filter((task) => task._id !== id));
//         } catch (err) {
//             console.error("Error deleting task:", err);
//         }
//     };

//     // Handle edit mode
//     const handleEdit = (task) => {
//         setEditingTask(task._id);
//         setFormData({
//             title: task.title,
//             description: task.description,
//             status: task.status,
//         });
//     };
//     const logout = () => {

//         const token = localStorage.getItem("token");
//         if (token) {

//             localStorage.removeItem('token');
//         }

//     }

//     return (
//         <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
//             <h1>Task Manager</h1>
//             <button onClick={logout}>Logout</button>
//             {/* Form */}
//             <div style={{ marginBottom: 20 }}>
//                 <input
//                     name="title"
//                     placeholder="Task title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     style={{ marginRight: 10 }}
//                 />
//                 <input
//                     name="description"
//                     placeholder="Task description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     style={{ marginRight: 10 }}
//                 />
//                 <select
//                     name="status"
//                     value={formData.status}
//                     onChange={handleChange}
//                     style={{ marginRight: 10 }}
//                 >
//                     <option value="pending">Pending</option>
//                     <option value="todo">To-do</option>
//                     <option value="done">Done</option>
//                 </select>

//                 {editingTask ? (
//                     <button onClick={() => handleUpdate(editingTask)}>Update</button>
//                 ) : (
//                     <button onClick={handleCreate}>Add Task</button>
//                 )}

//                 {editingTask && (
//                     <button
//                         onClick={() => {
//                             setEditingTask(null);
//                             setFormData({ title: "", description: "", status: "pending" });
//                         }}
//                         style={{ marginLeft: 10 }}
//                     >
//                         Cancel
//                     </button>
//                 )}
//             </div>

//             {/* Task List */}
//             <table border="1" width="100%">
//                 <thead>
//                     <tr>
//                         <th width="20%">Title</th>
//                         <th width="40%">Description</th>
//                         <th width="15%">Status</th>
//                         <th width="25%">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {/* {tasks.length ? (
//                         tasks.map((task) => (
//                             <tr key={task._id}>
//                                 <td>{task.title}</td>
//                                 <td>{task.description}</td>
//                                 <td>{task.status}</td>
//                                 <td>
//                                     <button onClick={() => handleEdit(task)}>Edit</button>
//                                     <button
//                                         onClick={() => handleDelete(task._id)}
//                                         style={{ marginLeft: 10 }}
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="4" align="center">
//                                 No tasks found
//                             </td>
//                         </tr>
//                     )} */}

//                     <Tasklist tasks={currentPosts} />
//                     <Pagination
//                         postsPerPage={postsPerPage}
//                         totalPosts={tasks.length}
//                         setCurrentPage={setCurrentPage}
//                         currentPage={currentPage}
//                     />
//                 </tbody>
//             </table>
//         </div>
//     );
// };


// const Tasklist = ({ tasks }) => {
//     return (
//         <>
//             {tasks.length ? (
//                 tasks.map((task) => (
//                     <tr key={task._id}>
//                         <td>{task.title}</td>
//                         <td>{task.description}</td>
//                         <td>{task.status}</td>
//                         <td>
//                             <button onClick={() => handleEdit(task)}>Edit</button>
//                             <button
//                                 onClick={() => handleDelete(task._id)}
//                                 style={{ marginLeft: 10 }}
//                             >
//                                 Delete
//                             </button>
//                         </td>
//                     </tr>
//                 ))
//             ) : (
//                 <tr>
//                     <td colSpan="4" align="center">
//                         No tasks found
//                     </td>
//                 </tr>
//             )}
//         </>
//     )
// }


// const Pagination = ({
//     postsPerPage,
//     totalPosts,
//     setCurrentPage,
//     currentPage,
// }) => {
//     const pageNumbers = [];

//     for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
//         pageNumbers.push(i);
//     }

//     const paginate = (pageNumber, e) => {
//         e.preventDefault();
//         setCurrentPage(pageNumber);
//     };

//     return (
//         <nav>
//             <ul className="pagination">
//                 {pageNumbers.map((number) => (
//                     <li
//                         key={number}
//                         className={`page-item ${currentPage === number ? "active" : ""}`}
//                     >
//                         <a
//                             onClick={(e) => paginate(number, e)}
//                             href="!#"
//                             className="page-link"
//                         >
//                             {number}
//                         </a>
//                     </li>
//                 ))}
//             </ul>
//         </nav>
//     );
// };

// export default Task;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Task = () => {
//   const navigate = useNavigate();

//   const [tasks, setTasks] = useState([]);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     status: "pending",
//   });
//   const [editingTask, setEditingTask] = useState(null);

//   // pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [postsPerPage] = useState(4);

//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = tasks.slice(indexOfFirstPost, indexOfLastPost);

//   const API_URL = "http://localhost:3001/api";

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) navigate("/");
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get(API_URL, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(res.data);
//     } catch (err) {
//       console.error("Error fetching tasks:", err);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleCreate = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!formData.title.trim()) return alert("Title is required!");
//       const res = await axios.post(`${API_URL}/createTasks`, formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks([...tasks, res.data]);
//       setFormData({ title: "", description: "", status: "pending" });
//     } catch (err) {
//       console.error("Error creating task:", err);
//     }
//   };

//   const handleUpdate = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.put(`${API_URL}/${id}`, formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
//       setEditingTask(null);
//       setFormData({ title: "", description: "", status: "pending" });
//     } catch (err) {
//       console.error("Error updating task:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`${API_URL}/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(tasks.filter((task) => task._id !== id));
//     } catch (err) {
//       console.error("Error deleting task:", err);
//     }
//   };

//   const handleEdit = (task) => {
//     setEditingTask(task._id);
//     setFormData({
//       title: task.title,
//       description: task.description,
//       status: task.status,
//     });
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4">
//       <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-semibold text-gray-800">Task Manager</h1>
//           <button
//             onClick={logout}
//             className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Form */}
//         <div className="flex flex-wrap gap-3 mb-6">
//           <input
//             name="title"
//             placeholder="Task title"
//             value={formData.title}
//             onChange={handleChange}
//             className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//           />
//           <input
//             name="description"
//             placeholder="Task description"
//             value={formData.description}
//             onChange={handleChange}
//             className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//           />
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="pending">Pending</option>
//             <option value="todo">To-do</option>
//             <option value="done">Done</option>
//           </select>

//           {editingTask ? (
//             <button
//               onClick={() => handleUpdate(editingTask)}
//               className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
//             >
//               Update
//             </button>
//           ) : (
//             <button
//               onClick={handleCreate}
//               className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
//             >
//               Add Task
//             </button>
//           )}

//           {editingTask && (
//             <button
//               onClick={() => {
//                 setEditingTask(null);
//                 setFormData({ title: "", description: "", status: "pending" });
//               }}
//               className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
//             >
//               Cancel
//             </button>
//           )}
//         </div>

//         {/* Task Table */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300">
//             <thead className="bg-indigo-600 text-white">
//               <tr>
//                 <th className="py-2 px-4 text-left">Title</th>
//                 <th className="py-2 px-4 text-left">Description</th>
//                 <th className="py-2 px-4 text-left">Status</th>
//                 <th className="py-2 px-4 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               <TaskList
//                 tasks={currentPosts}
//                 handleEdit={handleEdit}
//                 handleDelete={handleDelete}
//               />
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="mt-6 flex justify-center">
//           <Pagination
//             postsPerPage={postsPerPage}
//             totalPosts={tasks.length}
//             setCurrentPage={setCurrentPage}
//             currentPage={currentPage}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const TaskList = ({ tasks, handleEdit, handleDelete }) => {
//   return (
//     <>
//       {tasks.length ? (
//         tasks.map((task) => (
//           <tr key={task._id} className="border-t">
//             <td className="py-2 px-4">{task.title}</td>
//             <td className="py-2 px-4">{task.description}</td>
//             <td className="py-2 px-4 capitalize">{task.status}</td>
//             <td className="py-2 px-4 text-center">
//               <button
//                 onClick={() => handleEdit(task)}
//                 className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 mr-2"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(task._id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </td>
//           </tr>
//         ))
//       ) : (
//         <tr>
//           <td colSpan="4" className="text-center py-4 text-gray-500">
//             No tasks found
//           </td>
//         </tr>
//       )}
//     </>
//   );
// };

// const Pagination = ({ postsPerPage, totalPosts, setCurrentPage, currentPage }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="flex gap-2">
//       {pageNumbers.map((number) => (
//         <button
//           key={number}
//           onClick={() => setCurrentPage(number)}
//           className={`px-3 py-1 rounded-lg border ${
//             currentPage === number
//               ? "bg-indigo-600 text-white"
//               : "bg-white text-gray-700 hover:bg-gray-100"
//           }`}
//         >
//           {number}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Task;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Task = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
  });
  const [editingTask, setEditingTask] = useState(null);

  // Filters + Pagination
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const postsPerPage = 5;

  const API_URL = import.meta.env.VITE_API_URL;
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;

  // Fetch User (once on mount)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchUser = async () => {
      try {
        setLoadingUser(true);
        const res = await axios.get(`${API_URL}/auth/user_id`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("User data:", res.data);
        setUser(res.data); // { name: "John", email: "...", ... }
      } catch (err) {
        console.error("Error fetching user:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
          navigate("/");
        }
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // Fetch Tasks (on filter/page change)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetchTasks();
  }, [currentPage, statusFilter, search]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page: currentPage,
          limit: postsPerPage,
          status: statusFilter || undefined,
          search: search || undefined,
        },
      });
      setTasks(res.data.tasks || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!formData.title.trim()) return alert("Title is required!");
      await axios.post(`${API_URL}/createTasks`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ title: "", description: "", status: "pending" });
      fetchTasks();
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Failed to create task");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API_URL}/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingTask(null);
      setFormData({ title: "", description: "", status: "pending" });
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Failed to update task");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task._id);
    setFormData({
      title: task.title,
      description: task.description || "",
      status: task.status,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        {/* Header with User Name */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">

            {loadingUser ? (
              <span className="text-sm text-gray-500">Loading user...</span>
            ) : user ? (
              <>

                <span className="text-sm text-indigo-600 font-medium">
                  Welcome, <strong>{user.name || "User"}</strong>
                </span>
                <div>
                  <img src={`${VITE_IMG_URL}/${user.avatar}`} className=" h-20 w-20 rounded-[50%]" />
                </div>  </>
            ) : (
              <span className="text-sm text-red-600">Failed to load user</span>
            )}
          </div>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="todo">To-do</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* Task Form */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
          <input
            name="title"
            placeholder="Task title *"
            value={formData.title}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <input
            name="description"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="pending">Pending</option>
            <option value="todo">To-do</option>
            <option value="done">Done</option>
          </select>

          <div className="flex gap-2">
            {editingTask ? (
              <>
                <button
                  onClick={() => handleUpdate(editingTask)}
                  className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setEditingTask(null);
                    setFormData({ title: "", description: "", status: "pending" });
                  }}
                  className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleCreate}
                className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Add Task
              </button>
            )}
          </div>
        </div>

        {/* Task Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold">Title</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Description</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Status</th>
                <th className="py-3 px-4 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr key={task._id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4 text-sm text-gray-900">{task.title}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {task.description || "-"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${task.status === "done"
                          ? "bg-green-100 text-green-800"
                          : task.status === "todo"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                          }`}
                      >
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-sm">
                      <button
                        onClick={() => handleEdit(task)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 mr-2 transition text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-500">
                    {search || statusFilter
                      ? "No tasks match your filter."
                      : "No tasks yet. Create your first task!"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex gap-1">
      <button
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-lg border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {pages.map((num) => (
        <button
          key={num}
          onClick={() => setCurrentPage(num)}
          className={`px-3 py-1 rounded-lg border ${currentPage === num
            ? "bg-indigo-600 text-white border-indigo-600"
            : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-lg border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Task;