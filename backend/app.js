import express from 'express';
import { PORT, NODE_ENV } from './config/env.js';
import { errorMiddleware } from './middlewares/error.middlewares.js';
import { connectToDB } from './database/mongodb.js';
import { authRouter } from './routes/auth.routes.js';
import { questionRouter } from './routes/question.routes.js';

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded bodies

app.use('/api/auth', authRouter);
app.use('/api/questions', questionRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to odoo api')
});

(async () => {
    try {
        await connectToDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
        });
    }
    catch (err) {
        console.error(`Failed to start server: ${err.message}`);
    }
})();
