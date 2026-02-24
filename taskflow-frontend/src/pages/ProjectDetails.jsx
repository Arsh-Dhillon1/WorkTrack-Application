import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks/${projectId}`);
      setTasks(res.data);
    } catch {
      toast.error('Failed to fetch tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Task title is required');
      return;
    }

    try {
      await api.post('/tasks', {
        title,
        project: projectId
      });

      setTitle('');
      fetchTasks();
      toast.success('Task created');
    } catch {
      toast.error('Error creating task');
    }
  };

  const handleMarkDone = async (taskId) => {
    try {
      await api.put(`/tasks/${taskId}`, {
        status: 'done'
      });

      fetchTasks();
    } catch {
      toast.error('Error updating task');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Project Tasks</h2>
          <Link
            to="/"
            className="text-blue-600 hover:underline font-medium"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Create Task */}
        <form onSubmit={handleCreateTask} className="flex gap-3 mb-8">
          <input
            placeholder="New Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center">No tasks yet.</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="p-5 border rounded-lg flex justify-between items-center hover:shadow-md transition"
              >
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p
                    className={`text-sm ${
                      task.status === 'done'
                        ? 'text-green-600'
                        : task.status === 'in-progress'
                        ? 'text-yellow-600'
                        : 'text-gray-500'
                    }`}
                  >
                    {task.status}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/tasks/${task._id}/edit`)}
                    className="px-4 py-1 border rounded-lg hover:bg-gray-100 transition"
                  >
                    Edit
                  </button>

                  {task.status !== 'done' && (
                    <button
                      onClick={() => handleMarkDone(task._id)}
                      className="px-4 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Mark Done
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default ProjectDetails;