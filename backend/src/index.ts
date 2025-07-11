import { Hono } from 'hono'
import { userRoutes } from './routes/user'
import { blogRoutes } from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono();

app.use('/*', cors())
app.route('/api/v1/user', userRoutes);
app.route('/api/v1/blog', blogRoutes);

export default app;