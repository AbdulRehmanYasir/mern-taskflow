import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';
import ProjectSidebar from './ProjectSidebar.jsx';
import TaskPanel from './TaskPanel.jsx';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getProjects()
      .then((d) => {
        setProjects(d.data);
        if (d.data.length) setSelectedId(d.data[0]._id);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Each handler calls the API, then updates state so the UI changes immediately
  const createProject = async (body) => {
    const { data } = await api.createProject(body);
    setProjects((p) => [data, ...p]);
    setSelectedId(data._id);
  };

  const updateProject = async (id, body) => {
    const { data } = await api.updateProject(id, body);
    setProjects((p) => p.map((x) => (x._id === id ? data : x)));
  };

  const deleteProject = async (id) => {
    await api.deleteProject(id);
    setProjects((p) => {
      const rest = p.filter((x) => x._id !== id);
      if (selectedId === id) setSelectedId(rest[0]?._id ?? null);
      return rest;
    });
  };

  const selected = projects.find((p) => p._id === selectedId);

  return (
    <div className="layout">
      <header className="topbar">
        <strong>TaskFlow</strong>
        <span className="spacer" />
        <span className="muted">{user.name}</span>
        <button className="btn" onClick={logout}>Log out</button>
      </header>
      <div className="body">
        <ProjectSidebar
          projects={projects}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onCreate={createProject}
          onUpdate={updateProject}
          onDelete={deleteProject}
        />
        <main className="main">
          {error && <div className="alert">{error}</div>}
          {loading ? <p className="muted">Loading projects…</p> : selected ? <TaskPanel key={selected._id} project={selected} /> : (
            <div className="empty">Create a project to get started.</div>
          )}
        </main>
      </div>
    </div>
  );
}
