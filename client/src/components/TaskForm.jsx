import { useState } from 'react';

const toDateInput = (d) => (d ? new Date(d).toISOString().slice(0, 10) : '');

export default function TaskForm({ initial, submitLabel, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    description: initial?.description || '',
    status: initial?.status || 'todo',
    priority: initial?.priority || 'medium',
    dueDate: toDateInput(initial?.dueDate),
  });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await onSubmit({ ...form, dueDate: form.dueDate || null });
      if (!initial) setForm({ title: '', description: '', status: 'todo', priority: 'medium', dueDate: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="card task-form" onSubmit={submit}>
      {error && <div className="alert">{error}</div>}
      <input name="title" placeholder="Task title" value={form.title} onChange={change} required maxLength={150} />
      <textarea name="description" placeholder="Description (optional)" value={form.description} onChange={change} rows={2} />
      <div className="row wrap">
        <select name="status" value={form.status} onChange={change}>
          <option value="todo">To do</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
        </select>
        <select name="priority" value={form.priority} onChange={change}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input name="dueDate" type="date" value={form.dueDate} onChange={change} />
        <span className="spacer" />
        {onCancel && <button type="button" className="btn" onClick={onCancel}>Cancel</button>}
        <button className="btn primary" disabled={busy}>{busy ? 'Saving…' : submitLabel}</button>
      </div>
    </form>
  );
}
