# S.C.I.T.M-Sistema-de-control-de-inventario-de-taller-de-metrologia


## Descripción

S.C.I.T.M. es un sistema de escritorio robusto y fácil de usar, desarrollado con **Electron**, diseñado para controlar y gestionar eficientemente el inventario de aparatos dentro de un taller de metrología. Este software busca optimizar la organización, seguimiento y mantenimiento de los equipos, asegurando su disponibilidad y correcto funcionamiento, ofreciendo una experiencia de usuario intuitiva.

## Propósito

El propósito principal de S.C.I.T.M. es proporcionar una herramienta eficiente y centralizada para:

*   Registrar y catalogar todos los aparatos del taller.
*   Realizar un seguimiento del estado y ubicación de cada aparato.
*   Gestionar los programas de calibración y mantenimiento.
*   Generar reportes sobre el inventario y el estado de los equipos.
*   Facilitar la baja de aparatos obsoletos o dañados.

## Requisitos

### Requisitos de Usuario

*   Sistema operativo compatible (Windows, macOS, Linux).
*   Conexión a la base de datos (si se configura de forma remota).

### Requisitos de Desarrollador

*   Node.js (versión recomendada: LTS)
*   npm (Node Package Manager) o Yarn
*   Conocimientos de JavaScript, React, Node.js, Express y MongoDB.
*   Git para control de versiones.

## Tecnologías Utilizadas

El proyecto S.C.I.T.M se construye utilizando las siguientes tecnologías principales:

*   **Backend:**
    *   ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
    *   ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
*   **Frontend:**
    *   ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
*   **Aplicación de Escritorio:**
    *   ![Electron](https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=electron&logoColor=white)
*   **Base de Datos:**
    *   ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) (Versión específica según configuración, por ejemplo, MongoDB Atlas o instancia local)

## Estructura del Proyecto

A continuación, se presenta una visión general de la estructura de directorios y archivos del proyecto:

```
S.C.I.T.M/
├── backend/                     # Lógica del servidor y API
│   ├── node_modules/
│   ├── src/
│   │   ├── config/              # Archivos de configuración (DB, JWT)
│   │   ├── controllers/         # Controladores (lógica de rutas)
│   │   ├── middleware/          # Middlewares (autenticación, errores)
│   │   ├── models/              # Modelos de datos (Mongoose Schemas)
│   │   ├── routes/              # Definiciones de rutas de la API
│   │   ├── utils/               # Funciones de utilidad
│   │   └── server.js            # Punto de entrada del servidor backend
│   ├── .env.example             # Ejemplo de variables de entorno
│   ├── package.json
│   └── package-lock.json
├── inventario-react/            # Aplicación Frontend React
│   ├── node_modules/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── assets/              # Imágenes, fuentes, etc.
│   │   ├── components/          # Componentes reutilizables de React
│   │   ├── contexts/            # Contextos de React (ej: AuthContext)
│   │   ├── hooks/               # Hooks personalizados
│   │   ├── pages/               # Vistas principales (Dashboard, Inventario, etc.)
│   │   ├── services/            # Lógica de llamadas a la API
│   │   ├── styles/              # Estilos globales y específicos
│   │   ├── App.js               # Componente principal de React
│   │   ├── index.js             # Punto de entrada de la aplicación React
│   │   └── reportWebVitals.js
│   ├── .env.example             # Ejemplo de variables de entorno para React
│   ├── package.json
│   └── package-lock.json
├── electron-app/                # Lógica de la aplicación Electron
│   ├── main.js                  # Proceso principal de Electron
│   ├── preload.js               # Script de precarga (si es necesario)
│   ├── node_modules/
│   └── package.json
├── LICENSE                      # Archivo de licencia del proyecto
└── README.md                    # Este archivo
```

*   **`backend/`**: Contiene todo el código del servidor Node.js/Express, incluyendo la API REST.
*   **`inventario-react/`**: Es el proyecto Create React App que constituye la interfaz de usuario.
*   **`electron-app/`**: Contiene el código necesario para empaquetar la aplicación React como una aplicación de escritorio usando Electron. `main.js` es el punto de entrada para el proceso principal de Electron.

## Entendiendo el Backend

El backend está construido con Node.js y Express.js, proporcionando una API RESTful para que el frontend (React) interactúe con la base de datos y realice las operaciones necesarias. Se encarga de la lógica de negocio, autenticación de usuarios, gestión de datos y generación de reportes.

### Funcionalidades Principales del Backend

1.  **Autenticación de Usuarios (Login):**
    *   Valida credenciales de usuario contra la base de datos.
    *   Genera JSON Web Tokens (JWT) para sesiones seguras.
    *   Protege rutas sensibles para que solo usuarios autenticados puedan acceder.
2.  **Gestión de Inventario:**
    *   CRUD (Crear, Leer, Actualizar, Eliminar) para los aparatos del inventario.
    *   Manejo de detalles como número de serie, marca, modelo, estado, ubicación, fechas de calibración, historial de mantenimiento.
    *   Búsquedas y filtros avanzados.
3.  **Generación de Reportes:**
    *   Agrega y procesa datos para generar informes (ej: inventario general, equipos por calibrar, historial de un equipo).
    *   Proporciona endpoints para que el frontend solicite y muestre estos reportes.

## Entendiendo el Frontend (Interfaz de Usuario)

La interfaz de usuario es una Single Page Application (SPA) desarrollada con React. Se comunica con el backend a través de la API REST para mostrar datos, enviar actualizaciones y ofrecer una experiencia interactiva al usuario. Electron se utiliza para empaquetar esta aplicación React como una aplicación de escritorio nativa.

### Vistas y Funcionalidades Principales del Frontend

1.  **Login/Autenticación:**
    *   Formulario para ingresar credenciales.
    *   Manejo de estado de autenticación y redirección.
2.  **Dashboard (Panel de Control):**
    *   Vista principal después del login.
    *   Resumen del inventario, alertas importantes (ej: equipos que requieren calibración), accesos directos a funcionalidades clave.
3.  **Gestión de Inventario:**
    *   Tabla o lista de aparatos con opción de búsqueda y filtros.
    *   Formularios para añadir, ver detalles y editar aparatos.
    *   Funcionalidad para registrar mantenimientos y calibraciones.
4.  **Generación de Reportes:**
    *   Interfaz para seleccionar tipos de reportes y aplicar filtros.
    *   Visualización de los reportes generados (tablas, gráficos).
    *   Opción para imprimir o exportar reportes.

## Base de Datos

Se utiliza **MongoDB** como sistema de gestión de base de datos NoSQL. Se recomienda el uso de **MongoDB Atlas** para un despliegue en la nube gestionado, aunque también puede configurarse una instancia local. **Mongoose** se utiliza como ODM (Object Data Modeling) en el backend para interactuar con MongoDB, definir esquemas y validar datos.

### Esquema Conceptual (Ejemplo Simplificado)

*   **Usuarios:** `nombre`, `email`, `password_hash`, `rol` (admin, técnico)
*   **Aparatos:** `nombre`, `numeroSerie`, `marca`, `modelo`, `descripcion`, `ubicacion`, `estado` (activo, en mantenimiento, dado de baja), `fechaAdquisicion`, `ultimaCalibracion`, `proximaCalibracion`, `historialMantenimiento` (array de objetos: `fecha`, `descripcion`, `realizadoPor`)
*   **Calibraciones:** `aparatoId`, `fechaCalibracion`, `fechaVencimiento`, `certificadoUrl`, `realizadoPor`

## API Endpoints y su Interacción con el Frontend React

El backend expone una API RESTful con la que el frontend interactúa. A continuación, se describen los principales módulos y sus endpoints.

### Módulo de Autenticación (`/api/auth`)

*   **`POST /api/auth/login`**
    *   **Descripción:** Autentica a un usuario.
    *   **Request Body:** `{ "email": "usuario@example.com", "password": "supassword" }`
    *   **Response (Éxito):** `{ "token": "JWT_TOKEN_AQUI", "usuario": { "id": "...", "nombre": "...", "email": "..." } }`
    *   **Response (Error):** `{ "mensaje": "Credenciales incorrectas" }`
    *   **Interacción React:** El servicio `authService.js` en React realiza esta petición. Al recibir el token, lo almacena (ej: localStorage o Context API) y actualiza el estado de autenticación para redirigir al usuario al Dashboard.

*   **`GET /api/auth/perfil`** (Ruta Protegida)
    *   **Descripción:** Obtiene el perfil del usuario autenticado actualmente (usando el token enviado en el header `Authorization: Bearer TOKEN`).
    *   **Response (Éxito):** `{ "id": "...", "nombre": "...", "email": "..." }`
    *   **Interacción React:** Se puede llamar después del login o al cargar la aplicación para verificar la sesión del usuario.

### Módulo de Inventario (`/api/inventario`) (Rutas Protegidas)

*   **`POST /api/inventario`**
    *   **Descripción:** Crea un nuevo aparato en el inventario.
    *   **Request Body:** Objeto con los detalles del aparato (ej: `{ "nombre": "Multímetro Digital", "numeroSerie": "SN123", ... }`).
    *   **Response (Éxito 201):** Objeto del aparato creado.
    *   **Interacción React:** Desde un formulario en la vista de "Añadir Aparato", se envían los datos. La respuesta actualiza el listado de aparatos.

*   **`GET /api/inventario`**
    *   **Descripción:** Obtiene la lista de todos los aparatos. Permite query params para paginación, búsqueda y filtros (ej: `/api/inventario?buscar=multimetro&page=1&limite=10`).
    *   **Response (Éxito 200):** `{ "data": [lista_de_aparatos], "total": ..., "pagina": ..., "paginasTotales": ... }`
    *   **Interacción React:** Se llama al cargar la vista de inventario. Los datos se muestran en una tabla. Los controles de paginación y búsqueda realizan nuevas peticiones con los query params correspondientes.

*   **`GET /api/inventario/:id`**
    *   **Descripción:** Obtiene los detalles de un aparato específico.
    *   **Response (Éxito 200):** Objeto del aparato.
    *   **Interacción React:** Al seleccionar un aparato para ver sus detalles o editarlo. Los datos se cargan en un formulario.

*   **`PUT /api/inventario/:id`**
    *   **Descripción:** Actualiza un aparato existente.
    *   **Request Body:** Objeto con los campos a actualizar.
    *   **Response (Éxito 200):** Objeto del aparato actualizado.
    *   **Interacción React:** Desde el formulario de edición, se envían los datos modificados.

*   **`DELETE /api/inventario/:id`**
    *   **Descripción:** Elimina un aparato del inventario.
    *   **Response (Éxito 200):** Mensaje de confirmación o el objeto eliminado.
    *   **Interacción React:** Tras confirmación del usuario, se envía la petición y se actualiza la lista de aparatos.

### Módulo de Reportes (`/api/reportes`) (Rutas Protegidas)

*   **`GET /api/reportes/general`**
    *   **Descripción:** Genera un reporte general del inventario.
    *   **Response (Éxito 200):** Datos del reporte (ej: `{ "totalAparatos": 150, "aparatosActivos": 120, ... }`).
    *   **Interacción React:** La vista de reportes llama a este endpoint y muestra los datos recibidos.

*   **`GET /api/reportes/calibraciones`**
    *   **Descripción:** Genera un reporte de aparatos por estado de calibración (ej: próximos a vencer, vencidos).
    *   **Response (Éxito 200):** Lista de aparatos con su estado de calibración.
    *   **Interacción React:** Permite al usuario ver qué equipos necesitan atención para su calibración.

*(Más endpoints de reportes pueden ser añadidos según las necesidades).*

## Interacción Frontend-Backend (Resumen de Comunicación API)

1.  **Autenticación:** El frontend envía credenciales al backend. Si son válidas, el backend responde con un JWT.
2.  **Almacenamiento del Token:** El frontend almacena este token (ej: en `localStorage` o un Context de React).
3.  **Peticiones Autenticadas:** Para acceder a rutas protegidas de la API, el frontend incluye el JWT en el encabezado `Authorization` de cada petición (ej: `Authorization: Bearer <token>`).
4.  **Middleware de Verificación:** El backend utiliza un middleware para verificar el JWT en cada petición a rutas protegidas. Si el token es válido, permite el acceso; de lo contrario, devuelve un error de autenticación (401 o 403).
5.  **Flujo de Datos CRUD:**
    *   **Leer (GET):** React solicita datos (lista de inventario, detalles de un item). El backend consulta la DB y devuelve los datos en formato JSON. React los muestra en la UI.
    *   **Crear (POST):** React envía los datos de un nuevo item (ej: desde un formulario). El backend valida y guarda en la DB, devolviendo el item creado. React actualiza la UI.
    *   **Actualizar (PUT):** Similar a crear, pero para modificar un item existente.
    *   **Eliminar (DELETE):** React envía el ID del item a eliminar. El backend lo borra de la DB y React actualiza la UI.

## Bibliotecas y Dependencias Clave del Backend (ejemplo `backend/package.json`)

*   **`express`**: Framework web para Node.js, usado para construir la API RESTful.
*   **`mongoose`**: ODM para MongoDB, facilita la interacción con la base de datos, definición de esquemas y validación de datos.
*   **`jsonwebtoken`**: Para la generación y verificación de JSON Web Tokens (JWT) para la autenticación.
*   **`bcryptjs`**: Para el hashing seguro de contraseñas de usuarios.
*   **`dotenv`**: Para cargar variables de entorno desde un archivo `.env`.
*   **`cors`**: Middleware para habilitar Cross-Origin Resource Sharing, permitiendo que la app React (en un dominio/puerto diferente) acceda a la API.
*   **`morgan`**: Middleware para el logging de peticiones HTTP (útil para desarrollo).
*   **`nodemon`** (Dependencia de desarrollo): Para reiniciar automáticamente el servidor Node.js durante el desarrollo cuando se detectan cambios en los archivos.

## Hoja de Ruta (Roadmap)

*   [X] Definición de la estructura del proyecto y tecnologías.
*   [ ] **Backend:** Desarrollo completo de los módulos de Autenticación, Inventario y Reportes.
*   [ ] **Frontend:** Diseño e implementación de todas las vistas y componentes React.
*   [ ] **Electron:** Configuración final y empaquetado de la aplicación.
*   [ ] Implementación de la gestión detallada de calibraciones y mantenimientos.
*   [ ] Creación del sistema de notificaciones (en app y/o email).
*   [ ] Pruebas unitarias y de integración exhaustivas.
*   [ ] Documentación de usuario final.
*   [ ] Optimización y mejoras de rendimiento.

## Licencia

Este proyecto se distribuye bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Contacto

Si tienes preguntas, sugerencias o deseas reportar un error, por favor abre un "Issue" en este repositorio de GitHub.

