//Aqui arrancamos el servidor
import app from "./app.js"
import "./database.js"
import dotenv from "dotenv";

dotenv.config();

const PORT = app.get('port');

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
}).on('error', (error) => {
    console.error('Error al iniciar el servidor:', error);
}); 