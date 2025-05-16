//conexion ala base de datos
import mongoose,{mongo} from "mongoose";
mongoose.connect('mongodb+srv://230314Giovany:Fabuloso1*3@cluster0g.panx4.mongodb.net/groceries_db?retryWrites=true&w=majority&appName=Cluster0G')
.then((db)=>console.log('conexion a mongo lista 👍'))
.catch((error)=>console.error(error));
export default mongoose;