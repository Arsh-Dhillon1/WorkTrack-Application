import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Profile() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Profile</h2>
          <Link
            to="/"
            className="text-blue-600 hover:underline font-medium"
          >
            Dashboard
          </Link>
        </div>

        {/* User Info */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Name</span>
            <span>{user?.name}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Email</span>
            <span>{user?.email}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Role</span>
            <span className="capitalize">{user?.role}</span>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Profile;