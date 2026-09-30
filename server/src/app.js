const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');
const taskRoutes = require('./routes/task.routes');
const { notFound, errorHandler } = require('./middleware/error');

const app = express();

// Allow the deployed frontend(s): CLIENT_URL can be a comma-separated list
const origins = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',').map((o) => o.trim()) : true;
app.use(cors({ origin: origins }));
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'TaskFlow API is running' }));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
