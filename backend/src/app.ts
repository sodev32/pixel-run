import express from 'express';
import healthRouter from './routes/health';
import scoreRuter from './routes/score';

const app = express();

// すべてのAPIでJSONを受け取れるようにする
app.use(express.json());

app.use('/health', healthRouter);
app.use('/score', scoreRuter);

export default app;
