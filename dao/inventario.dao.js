import Inventario from "../model/inventario.m.js";

const InventarioDAO = {};

InventarioDAO.insert = async (herramienta) => {
    return await Inventario.create(herramienta);
};

InventarioDAO.getAll = async () => {
    return await Inventario.find();
};

InventarioDAO.getOne = async (id_herramienta) => {
    return await Inventario.findOne({ id_herramienta: id_herramienta });
};
InventarioDAO.updateOne=async(Inventario,id_herramienta)=>{
    return await Product.findOneAndUpdate({id_herramienta:id_herramienta},Inventario)
}
InventarioDAO.deleteOne=async(id_herramienta)=>{
    return await Product.findOneAndDelete({id_herramienta:id_herramienta})
}

export default InventarioDAO;



