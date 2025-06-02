import { model, Schema } from "mongoose";

const InventarioSchema = new Schema(
  {
    id_herramienta: {
      type: Number,
      required: true,
    },
    nombre_herramienta: {
      type: String,
      required: true,
    },
    num_partida: {
      type: Number,
      required: true,
      unique: true,
    },
    numero_serie: {
      type: Number,
      required: true,
    },
    fecha_r: {
      type: Date,
      required: true,
    },
    dep: {
      type: String,
      required: true,
    },
    medida: {
      type: String,
      required: true,
    },
    calibrado: {
      type: Boolean,
      required: true,
    },
    fecha_calibrado:{
      type:Date,
      required:true,
    },
    fecha_pendiente:{
      type:Date,
      required:false,
    }
  }, 
  {
    versionKey: false,
    timestamps: true,
  }
);

// Oculta _id y timestamps en la respuesta JSON
InventarioSchema.method("toJSON", function () {
  const { _id, createdAt, updatedAt, ...object } = this.toObject();
  return object;
});

export default model("Inventario", InventarioSchema);

