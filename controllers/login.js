import loginDAO from "../dao/login.dao.js";
const loginController = {};

loginController.register = (req, res) => {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) {
        return res.status(400).json({ message: "Faltan campos requeridos" });
    }
    loginDAO.findByNombre(nombre)
        .then((existingUser) => {
            if (existingUser) {
                return res.status(400).json({ message: "El usuario ya existe" });
            }
            return loginDAO.insert({ nombre, email, password });
        })
        .then((user) => {
            if (user) {
                res.status(201).json({ message: "Usuario registrado exitosamente", user });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
};

loginController.login = (req, res) => {
    const { nombre, password } = req.body;
    if (!nombre || !password) {
        return res.status(400).json({ message: "Faltan campos requeridos" });
    }
    loginDAO.findByNombre(nombre)
        .then((user) => {
            if (!user || user.password !== password) {
                return res.status(401).json({ message: "Credenciales inválidas" });
            }
            // Marcar sesión como abierta
            return loginDAO.setSesionAbierta(user._id, true).then(() => user);
        })
        .then((user) => {
            if (user) {
                res.json({ message: "Inicio de sesión exitoso", user: { id: user._id, nombre: user.nombre } });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
};

loginController.logout = (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ message: "Falta el nombre de usuario" });
    }
    loginDAO.findByNombre(nombre)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            // Marcar sesión como cerrada
            return loginDAO.setSesionAbierta(user._id, false).then(() => {
                res.json({ message: "Sesión cerrada exitosamente" });
            });
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
};

export default loginController;
