import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

function ProjectDetails() {
  const { projectId } = useParams();

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
  }, []);

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

      {/* Create Task */}
      <form onSubmit={handleCreateTask}>
        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <hr />

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.status}
            {task.status !== 'done' && (
              <button onClick={() => handleMarkDone(task._id)}>
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