import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

function EditTask() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('todo');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/tasks/single/${taskId}`);
        setTask(res.data);
        setTitle(res.data.title);
        setStatus(res.data.status);
      } catch (error) {
        toast.error('Failed to load task');
      }
    };

    fetchTask();
  }, [taskId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/tasks/${taskId}`, {
        title,
        status
      });

      toast.success('Task updated');
      navigate(-1);
    } catch (error) {
      toast.error('Update failed');
    }
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Task</h2>

      <form onSubmit={handleUpdate}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button type="submit">Update Task</button>
      </form>
    </div>
  );
}

export default EditTask;