import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (error) {
      toast.error('Failed to fetch projects');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Project name is required');
      return;
    }

    try {
      await api.post('/projects', { name });
      setName('');
      fetchProjects();
      toast.success('Project created');
    } catch (error) {
      toast.error('Error creating project');
    }
  };
  return (
    <div className="bg-red-500 min-h-screen">
    <Link to="/profile">Go to Profile</Link>
      <h2>Dashboard</h2>

      {/* Create Project Form */}
      <form onSubmit={handleCreate}>
        <input
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Create Project</button>
      </form>

      <hr />

      {/* Project List */}
      <ul>
        {projects.map((project) => (
          <li
            key={project._id}
            onClick={() => navigate(`/projects/${project._id}`)}
            style={{ cursor: 'pointer' }}
          >
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;