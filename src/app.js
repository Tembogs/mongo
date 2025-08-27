import express from 'express';
import userRouterv1 from './routes/v1/users.routes.js';
import setUpMiddlewares from './middlewares/index.js';


const app = express();

setUpMiddlewares(app);
app.use('/api/v1/users', userRouterv1)
app.get('/', (req, res) => {
  res.json({
    message: 'welcome to the todo list api',
    timestamp: new Date().toLocaleTimeString(),
  })
})
export default app;