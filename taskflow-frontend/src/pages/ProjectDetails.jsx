import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    } catch (error) {
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
    } catch (error) {
      toast.error('Error creating task');
    }
  };

  const handleMarkDone = async (taskId) => {
    try {
      await api.put(`/tasks/${taskId}`, {
        status: 'done'
      });

      fetchTasks();
    } catch (error) {
      toast.error('Error updating task');
    }
  };

  return (
    <div>
      <h2>Project Tasks</h2>

      <form onSubmit={handleCreateTask}>
        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <hr />

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.status}

            <button
              onClick={() => navigate(`/tasks/${task._id}/edit`)}
            >
              Edit
            </button>

            {task.status !== 'done' && (
              <button
                onClick={() => handleMarkDone(task._id)}
              >
                Mark Done
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectDetails;