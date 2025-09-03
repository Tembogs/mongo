import express from 'express';
import userRouterv1 from './routes/v1/users.routes.js';
import setUpMiddlewares from './middlewares/index.js';
import userRouterv2 from './routes/v2/product.routes.js';
import userRouterv3 from './routes/v3/order.routes.js';


const app = express();

setUpMiddlewares(app);
app.use('/api/v1/users', userRouterv1)
app.use('/api/v2/product', userRouterv2)
app.use('/api/v3/order', userRouterv3)

app.get('/', (req, res) => {
  res.json({
    message: 'welcome to the todo list api',
    timestamp: new Date().toLocaleTimeString(),
  })
})
export default app;