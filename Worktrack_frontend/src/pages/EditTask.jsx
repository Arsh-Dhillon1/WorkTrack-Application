import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

function EditTask() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('todo');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/tasks/single/${taskId}`);
        setTitle(res.data.title);
        setStatus(res.data.status);
      } catch {
        toast.error('Failed to load task');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Title cannot be empty');
      return;
    }

    try {
      await api.put(`/tasks/${taskId}`, {
        title,
        status
      });

      toast.success('Task updated');
      navigate(-1);
    } catch {
      toast.error('Update failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-8">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Edit Task</h2>
          <Link
            to="/"
            className="text-blue-600 hover:underline font-medium"
          >
            Dashboard
          </Link>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">

          <div>
            <label className="block mb-2 font-medium">
              Task Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Update Task
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditTask;