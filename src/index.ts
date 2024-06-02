import "reflect-metadata"
import express from "express"
import { initializeDataSource } from "./initializeDataSource"
import authRoutes from './routes/authRoutes';
import { verifyToken } from './middlewares/authMiddleware';

initializeDataSource()

const app = express()

app.use(express.json())

const router = express.Router();

app.use('/api/v1/auth', authRoutes);

router.get('/api/v1/protected-route', verifyToken, (request, response) => {
    response.json({ message: "This route is protected and requires a valid token" });
});

app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
