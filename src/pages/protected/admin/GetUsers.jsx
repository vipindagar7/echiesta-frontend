import React, { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${API_URL}/api/auth/getUsers`,
          { withCredentials: true, headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  } }
        );

        setUsers(res.data.data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      setDeletingId(id);

      await axios.delete(
        `${API_URL}/api/auth/delete/${id}`,
        { withCredentials: true, headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  } }
      );

      setUsers((prev) => prev.filter((user) => user._id !== id));

    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Users</h2>

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 && (
            <p className="text-center mt-5 text-gray-500">No users found</p>
          )}
          
          {users.map((u) => (
            <tr key={u._id} className="text-center border-t p-2">
              <td className="p-2">{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td className="p-2">
                <button
                  onClick={() => deleteUser(u._id)}
                  disabled={deletingId === u._id}
                  className="bg-red-600 px-3 py-1 text-white rounded-lg"
                >
                  {deletingId === u._id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetUsers;