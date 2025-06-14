import express from "express";
import morgan from "morgan";
import loginRoutes from './routes/login.routes.js';
import inventarioRoutes from "./routes/inventario.routes.js";
import reportesRoutes from "./routes/reportes.routes.js";

const app = express();
//configuracion de puerto
app.set('port',process.env.PORT||3000);
//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Rutas
app.use('/api/auth', loginRoutes);
app.use("/api/inventario", inventarioRoutes);
app.use("/api/reportes", reportesRoutes);

export default app;