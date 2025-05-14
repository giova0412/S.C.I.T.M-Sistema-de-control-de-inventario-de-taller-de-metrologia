import express from "express";
import morgan from "morgan";
import loginRoutes from './routes/login.routes.js';

const app = express();
//configuracion de puerto
app.set('port',process.env.PORT||3000);
//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Rutas
app.use('/api/auth', loginRoutes);

export default app;