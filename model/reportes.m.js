import { model, Schema, mongoose } from "mongoose";
const ReportSchema = new Schema({
    ficha_trabajador: {
        required: true,
        type: Number,
    },
    nombre: {
        required: true,
        unique: true,
        type: String,
    },
    id_herramienta: {
        type: Number, // <-- Cambiado de ObjectId a Number   
        required: true,
    },
    fecha_recibido: {
        type: Date,
        required: true,
    },
    fecha_entrega: {
        type: Date,
        required: true,
    },
    imagen:{
        type:String,
        required:true,
    }
},
{
    versionKey: false,
    timestamps: true,
});

export default model("reportes", ReportSchema);

