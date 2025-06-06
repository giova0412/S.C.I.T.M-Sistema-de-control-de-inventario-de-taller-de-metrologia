import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Herramientas() {
  const [herramientas, setHerramientas] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenAgrgar, setModalOpenAgregar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [editingHerramienta, setEditingHerramienta] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);


  const [form, setForm] = useState({
    nombre: "",
    ficha: "",
    status: "Pendiente",
    fechaEntregado: "",
    fechaRecibido: "",
  });

  const [reportes, setReportes] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.nombre || !form.ficha) {
      alert("Por favor completa los campos nombre y ficha");
      return;
    }

    setReportes(prevReportes => [...prevReportes, form]);
    
    setForm({
      nombre: "",
      ficha: "",
      status: "Pendiente",
      fechaEntregado: "",
      fechaRecibido: "",
    });

    toggleModalReporte();
  };
   const toggleModalReporte = () => {
    setModalOpen(!modalOpen);
    if (modalOpen) {
      setForm({
        nombre: "",
        ficha: "",
        status: "Pendiente",
        fechaEntregado: "",
        fechaRecibido: "",
      });
    }
  };

  const handleEdit = (herramienta) => {
    setEditingHerramienta(herramienta);
    setEditModalOpen(true)
  };

  const [nuevaHerramienta, setNuevaHerramienta] = useState({
    nombre: "",
    aid: "",
    partida: "",
    fecha: "",
    depto: "",
  });
  const [nuevaFoto, setNuevaFoto] = useState(null);
  const handleEditSubmit = (e) => {
  e.preventDefault();
  
  setHerramientas((prev) =>
    prev.map((herramienta) =>
      herramienta.id === editingHerramienta.id ? editingHerramienta : herramienta
    )
  );

  setEditModalOpen(false);
  setEditingHerramienta(null);
};
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const toggleModalAgregar = () => {
    setModalOpenAgregar(!modalOpenAgrgar);
  };

  const handleDelete = (id) => {
  setHerramientas((prev) => prev.filter((herramienta) => herramienta.id !== id));
};
  const filteredHerramientas = herramientas.filter((herramienta) => {
    return (
      herramienta.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      herramienta.aid.toString().includes(searchTerm)
    );
  });
  return (
    <div className="flex  bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-16"
          } bg-pemex-green h-screen transition-all duration-300 fixed left-0`}
      >
        <div className="p-4 flex justify-between items-center">{sidebarOpen && <span className="text-white font-bold">Menú</span>}
          <button onClick={toggleSidebar} className="andform hover:scale-110  transition-all duration-500 text-white p-2 rounded hover:bg-pemex-dark-green ">
            {sidebarOpen ? "◄" : "►"}
          </button>
        </div>

        <nav className="mt-8 space-y-2">
          <div
            onClick={() => navigate("/reportes")}
            className={` blick hover:bg-gray-500  transition-all duration-500 andform  flex items-center px-4 py-3 text-white hover:bg-pemex-dark-green cursor-pointer`}
          >
            <span className="text-xl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
            </span>
            {sidebarOpen && <span className="ml-3">Reportes</span>}
          </div>

          <div
            onClick={() => navigate("/herramientas")}
            className={`andform hover:bg-gray-500  transition-all duration-500 flex items-center px-4 py-3 text-white bg-pemex-dark-green cursor-pointer`}
          >
           <span className="text-xl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" /></svg>
            </span>
            {sidebarOpen && <span className="ml-3">Herramientas</span>}
          </div>
        </nav>

        <div className={`andform hover:scale-110  transition-all duration-500 absolute bottom-0 w-full flex items-center px-4 py-3 text-white hover:bg-pemex-dark-green cursor-pointer`} onClick={() => navigate("/")}>
         <span className="text-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" /></svg>
            </span>
          {sidebarOpen && <span className="ml-3">Cerrar Sesión</span>}
        </div>
      </aside>

      {/* Contenido principal */}
      <main className={` flex-1 ${sidebarOpen ? "ml-64" : "ml-16"} transition-all duration-300`}>
        <nav className="bg-pemex-green p-4 shadow-md ">
          <div className="container mx-auto">
            <div className="text-pemex-white font-bold text-xl text-center">
              Mi Inventario
            </div>
          </div>
        </nav>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Herramientas</h1>
          <div  className="relative w-full max-w-md mx-auto">
            <span className="absolute inset-y-0 left-3 flex items-center text-pemex-green">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
              </svg>
            </span>
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por ID o nombre"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pemex-gree focus:border-pemex-green transition duration-300 placeholder-gray-400 hover:border-pemex-green"/>
        </div>
         
        <div className="grid grid-cols-4 gap-4 p-4 ">{filteredHerramientas.map((herramienta, index) => (
          <div key={herramienta.aid} className="flex-shrink-0 w-90 cursor-pointer group relative flex flex-col my-6 bg-white shadow-md border border-slate-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md ">
              <div className="relative h-52 overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={herramienta.foto} alt={herramienta.nombre} />
              </div>
            </div>
            <div className="p-4">
              <h6 className="mb-2 text-slate-800 text-xl font-bold"> {herramienta.nombre} </h6>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-medium">ID:</span>
                    <span className="text-slate-600">{herramienta.aid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-medium">Partida:</span>
                    <span className="text-slate-600">{herramienta.partida}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-medium">Fecha:</span>
                    <span className="text-slate-600">{herramienta.fecha}</span>
                  </div>
                  <div className="flex justify-between">
                      <span className="text-slate-600 font-medium">Depto:</span>
                      <span className="text-slate-600">{herramienta.depto}</span>
                    </div>
                  </div>
                  <div className="px-4 pt-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-checked:bg-green-500 rounded-full relative after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-full"></div>
                      <span className="text-sm text-gray-700">Calibrado</span>
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 px-4 pt-4 pb-6 border-t">
                  <button onClick={() => handleEdit(herramienta)} className="bg-pemex-green hover:bg-pemex-dark-green text-white text-sm py-2 rounded-md hover:animate-pulseLight  transition-all duration-300">Editar</button>
                  <button onClick={() => { /* función descarga */ }} className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 rounded-md transition-all duration-300 hover:animate-downloadBounce active:animate-downloadPulse shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                    <span>Descargar</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                      </svg>
                  </button>
                  <button onClick={() => handleDelete(herramienta.id)}  className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-md hover:animate-shake transition-all duration-300">Eliminar
                    <trash2 className="w-4 h-4" />
                  </button>

                  <button onClick={toggleModal} className="bg-gray-500 hover:bg-gray-700 text-white text-sm py-2 rounded-md transition-transform hover:scale-105">Reporte</button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={toggleModalAgregar} className="fixed bottom-6 right-6 z-50 rounded-full bg-green-500  text-white py-3 px-5 shadow-lg hover:bg-green-700 transition-all duration-300 hover:animate-float" type="button">+</button> {modalOpenAgrgar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm" aria-modal="true" role="dialog">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl animate-[slideIn_0.35s_ease-out] transform transition-transform duration-300 hover:scale-[1.015]" >
            <h2 className="text-3xl font-extrabold text-center text-pemex-green mb-8 tracking-wide">Agregar Nueva Herramienta</h2>

          <form onSubmit={(e) => { e.preventDefault();
            if (
              !nuevaHerramienta.nombre ||
              !nuevaHerramienta.aid ||
              !nuevaHerramienta.partida ||
              !nuevaHerramienta.fecha ||
              !nuevaHerramienta.depto ||
              !nuevaFoto
            ) {
              alert("Por favor completa todos los campos.");
              return;
            }setHerramientas([
              ...herramientas,
              { ...nuevaHerramienta, foto: URL.createObjectURL(nuevaFoto) },
            ]); setNuevaHerramienta({
              nombre: "",
              aid: "",
              partida: "",
              fecha: "",
              depto: "",
            });
            setNuevaFoto(null);
            toggleModalAgregar();
          }} className="space-y-6">
          {[
            { type: "text", placeholder: "Nombre", name: "nombre", value: nuevaHerramienta.nombre },
            { type: "number", placeholder: "ID", name: "aid", value: nuevaHerramienta.aid },
            { type: "text", placeholder: "Partida", name: "partida", value: nuevaHerramienta.partida },
            { type: "date", placeholder: "Fecha", name: "fecha", value: nuevaHerramienta.fecha },
            { type: "text", placeholder: "Departamento", name: "depto", value: nuevaHerramienta.depto },
          ].map(({ type, placeholder, name, value }) => (
            <input key={name} type={type} name={name} placeholder={placeholder} value={value}onChange={(e) =>
              setNuevaHerramienta({ ...nuevaHerramienta, [name]: e.target.value })}required className="w-full rounded-lg border border-gray-300 px-4 py-3
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pemex-green focus:border-pemex-green transition-colors duration-300 hover:border-pemex-green shadow-sm text-gray-800 font-medium"/>
          ))}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNuevaFoto(e.target.files[0])}
          className="w-full
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-pemex-green file:text-white
            hover:file:bg-pemex-dark-green
            transition-all duration-300"
          required
        />

        {nuevaFoto && (
          <img
            src={URL.createObjectURL(nuevaFoto)}
            alt="Vista previa"
            className="mb-4 max-h-40 mx-auto rounded-lg
            animate-[fadeIn_0.5s_ease-in-out]
            transform hover:scale-102 transition-all duration-300" // zoom reducido aquí
          />
        )}

        <div className="flex justify-end gap-5 pt-4">
          <button
            type="submit"
            className="rounded-lg bg-pemex-green px-6 py-3 text-white font-semibold
                       hover:bg-pemex-dark-green
                       transition-colors duration-300
                       transform hover:scale-102 hover:shadow-lg" // zoom reducido aquí
          >
            Agregar
          </button>
          <button type="button" onClick={toggleModalAgregar} className="rounded-lg bg-red-600 px-6 py-3 text-white font-semibold hover:bg-red-700 transition-colors duration-300 transform hover:scale-102 hover:shadow-lg"> Cancelar</button>
        </div>
      </form>
    </div>

    <style jsx>{`
      @keyframes slideIn {
        0% {
          opacity: 0;
          transform: translateY(-20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    `}</style>
  </div>
)}


          </div>

          {editModalOpen && editingHerramienta && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
    aria-modal="true"
    role="dialog"
  >
    <div
      className="bg-white rounded-xl p-8 w-full max-w-md
                 shadow-2xl
                 animate-[slideIn_0.35s_ease-out]
                 transform
                 transition-transform duration-300
                 hover:scale-[1.03]"
      style={{ animationName: 'slideIn', animationDuration: '0.35s', animationTimingFunction: 'ease-out' }}
    >
      <h2 className="text-3xl font-extrabold text-center text-pemex-green mb-8 tracking-wide">
        Editar Herramienta
      </h2>

      <form onSubmit={handleEditSubmit} className="space-y-6">
        {[
          { type: 'text', placeholder: 'Nombre', name: 'nombre', value: editingHerramienta.nombre },
          { type: 'number', placeholder: 'ID', name: 'aid', value: editingHerramienta.aid },
          { type: 'text', placeholder: 'Partida', name: 'partida', value: editingHerramienta.partida },
          { type: 'date', placeholder: 'Fecha', name: 'fecha', value: editingHerramienta.fecha },
          { type: 'text', placeholder: 'Departamento', name: 'depto', value: editingHerramienta.depto },
        ].map(({ type, placeholder, name, value }) => (
          <input
            key={name}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setEditingHerramienta({ ...editingHerramienta, [name]: e.target.value })}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3
                       placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-pemex-green focus:border-pemex-green
                       transition-colors duration-300
                       hover:border-pemex-green
                       shadow-sm
                       text-gray-800
                       font-medium"
          />
        ))}

        <div className="flex justify-end gap-5 pt-6">
          <button
            type="button"
            onClick={() => {
              setEditModalOpen(false);
              setEditingHerramienta(null);
            }}
            className="rounded-lg bg-red-600 px-6 py-3 text-white font-semibold
                       hover:bg-red-700
                       transition-colors duration-300
                       transform hover:scale-105 hover:shadow-lg"
          >
            Cancelar
          </button>
          <button
            type="submit"
           className="rounded-lg bg-pemex-green px-6 py-3 text-white 
             font-semibold hover:bg-pemex-dark-green 
             transition-all duration-300 hover:animate-bounceLight"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>

    <style jsx>{`
      @keyframes slideIn {
        0% {
          opacity: 0;
          transform: translateY(-20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}</style>
  </div>
)}

{modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                        <div className="max-h-[90vh] overflow-auto w-full max-w-md rounded-lg bg-white p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h4 className="text-xl font-bold text-pemex-green">Agregar Reporte</h4>
                                <button
                                    onClick={toggleModalReporte}
                                    className="andform hover:scale-110 transition-all duration-500 text-pemex-green hover:bg-pemex-green hover:text-white rounded-full p-1.5"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <label className="block">
                                    <span className="text-pemex-green font-bold">Nombre</span>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={form.nombre}
                                        onChange={handleChange}
                                        className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700"
                                        required
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-pemex-green font-bold">Ficha</span>
                                    <input
                                        type="text"
                                        name="ficha"
                                        value={form.ficha}
                                        onChange={handleChange}
                                        className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700"
                                        required
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-pemex-green font-bold">Status</span>
                                    <select
                                        name="status"
                                        value={form.status}
                                        onChange={handleChange}
                                        className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700"
                                    >
                                        <option value="Pendiente">Pendiente</option>
                                        <option value="Entregado">Entregado</option>
                                    </select>
                                </label>

                                <label className="block">
                                    <span className="text-pemex-green font-bold">Fecha entregado</span>
                                    <input
                                        type="date"
                                        name="fechaEntregado"
                                        value={form.fechaEntregado}
                                        onChange={handleChange}
                                        className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-pemex-green font-bold">Fecha recibido</span>
                                    <input
                                        type="date"
                                        name="fechaRecibido"
                                        value={form.fechaRecibido}
                                        onChange={handleChange}
                                        className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700"
                                    />
                                </label>

                                <div className="flex justify-end gap-2 pt-3">
                                    <button
                                        type="button"
                                        onClick={toggleModalReporte}
                                        className="andform rounded bg-gray-200 px-4 py-2 font-bold text-gray-600 hover:bg-gray-300"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="andform rounded bg-pemex-green px-4 py-2 font-bold text-white hover:bg-pemex-dark-green"
                                    >
                                        Agregar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

      </main>
    </div>
  );
}

export default Herramientas;
