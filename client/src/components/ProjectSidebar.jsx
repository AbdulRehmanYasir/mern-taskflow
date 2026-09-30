import { useState } from 'react';

export default function ProjectSidebar({ projects, selectedId, onSelect, onCreate, onUpdate, onDelete }) {
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [error, setError] = useState('');

  const guard = async (fn) => {
    setError('');
    try { await fn(); } catch (e) { setError(e.message); }
  };

  const add = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    guard(async () => { await onCreate({ name: name.trim() }); setName(''); });
  };

  const save = (id) => {
    if (!editName.trim()) return;
    guard(async () => { await onUpdate(id, { name: editName.trim() }); setEditingId(null); });
  };

  const remove = (p) => {
    if (window.confirm(`Delete "${p.name}" and all its tasks?`)) guard(() => onDelete(p._id));
  };

  return (
    <aside className="sidebar">
      <h3>Projects</h3>
      {error && <div className="alert">{error}</div>}
      <form className="row" onSubmit={add}>
        <input placeholder="New project" value={name} onChange={(e) => setName(e.target.value)} />
        <button className="btn primary">Add</button>
      </form>
      <ul className="list">
        {projects.map((p) => (
          <li key={p._id} className={p._id === selectedId ? 'item active' : 'item'}>
            {editingId === p._id ? (
              <div className="row">
                <input autoFocus value={editName} onChange={(e) => setEditName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && save(p._id)} />
                <button className="btn small primary" onClick={() => save(p._id)}>Save</button>
                <button className="btn small" onClick={() => setEditingId(null)}>×</button>
              </div>
            ) : (
              <>
                <button className="item-name" onClick={() => onSelect(p._id)}>{p.name}</button>
                <span className="actions">
                  <button className="icon" title="Rename" onClick={() => { setEditingId(p._id); setEditName(p.name); }}>✎</button>
                  <button className="icon danger" title="Delete" onClick={() => remove(p)}>🗑</button>
                </span>
              </>
            )}
          </li>
        ))}
        {!projects.length && <li className="muted small-text">No projects yet.</li>}
      </ul>
    </aside>
  );
}
