import express from 'express';
import { setupSwaggerDocs } from './utils/swaggerDocs';
import router from './routes/routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// Routes
app.use('/api/v1', router);
// Swagger setup
setupSwaggerDocs(app);

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database or start server:', error);
    }
};

startServer();