import { useEffect, useState } from 'react';
import { api } from '../api.js';
import TaskForm from './TaskForm.jsx';

const STATUS_LABEL = { todo: 'To do', 'in-progress': 'In progress', done: 'Done' };
const FILTERS = ['all', 'todo', 'in-progress', 'done'];

export default function TaskPanel({ project }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    api.getTasks(project._id)
      .then((d) => setTasks(d.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [project._id]);

  const createTask = async (body) => {
    const { data } = await api.createTask({ ...body, project: project._id });
    setTasks((t) => [data, ...t]);
  };

  const updateTask = async (id, body) => {
    const { data } = await api.updateTask(id, body);
    setTasks((t) => t.map((x) => (x._id === id ? data : x)));
  };

  const deleteTask = async (id) => {
    setError('');
    try {
      await api.deleteTask(id);
      setTasks((t) => t.filter((x) => x._id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  const quickStatus = async (task, status) => {
    setError('');
    try { await updateTask(task._id, { status }); } catch (e) { setError(e.message); }
  };

  const visible = filter === 'all' ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <section>
      <h2>{project.name}</h2>
      {project.description && <p className="muted">{project.description}</p>}

      <TaskForm submitLabel="Add task" onSubmit={createTask} />

      {error && <div className="alert">{error}</div>}

      <div className="tabs">
        {FILTERS.map((f) => (
          <button key={f} className={f === filter ? 'tab active' : 'tab'} onClick={() => setFilter(f)}>
            {f === 'all' ? `All (${tasks.length})` : `${STATUS_LABEL[f]} (${tasks.filter((t) => t.status === f).length})`}
          </button>
        ))}
      </div>

      {loading ? <p className="muted">Loading tasks…</p> : (
        <ul className="tasks">
          {visible.map((t) =>
            editingId === t._id ? (
              <li key={t._id}>
                <TaskForm
                  initial={t}
                  submitLabel="Save"
                  onCancel={() => setEditingId(null)}
                  onSubmit={async (b) => { await updateTask(t._id, b); setEditingId(null); }}
                />
              </li>
            ) : (
              <li key={t._id} className={`card task ${t.status}`}>
                <div className="task-main">
                  <div className="task-title">{t.title}</div>
                  {t.description && <div className="muted small-text">{t.description}</div>}
                  <div className="meta">
                    <span className={`badge ${t.priority}`}>{t.priority}</span>
                    {t.dueDate && <span className="muted small-text">Due {new Date(t.dueDate).toLocaleDateString()}</span>}
                  </div>
                </div>
                <div className="task-actions">
                  <select value={t.status} onChange={(e) => quickStatus(t, e.target.value)}>
                    <option value="todo">To do</option>
                    <option value="in-progress">In progress</option>
                    <option value="done">Done</option>
                  </select>
                  <button className="icon" title="Edit" onClick={() => setEditingId(t._id)}>✎</button>
                  <button className="icon danger" title="Delete" onClick={() => deleteTask(t._id)}>🗑</button>
                </div>
              </li>
            )
          )}
          {!visible.length && <li className="empty">No tasks here yet.</li>}
        </ul>
      )}
    </section>
  );
}
