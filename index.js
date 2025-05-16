//Aqui arrancamos el servidor
import app from "./app.js";
import "./database.js"
import dotenv from "dotenv";
dotenv.config();
app.listen(app.get('port'),()=>console.log("Server listening on port " + app.get('port')));
