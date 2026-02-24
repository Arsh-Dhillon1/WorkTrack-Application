import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Profile() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h2>Profile</h2>

      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Role:</strong> {user?.role}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Profile;