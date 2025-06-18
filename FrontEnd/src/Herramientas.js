import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { herramientasService } from "./api/herramientasService.js";
import { reportesService } from "./api/reportesService.js";

function Herramientas() {
  const [herramientas, setHerramientas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenAgrgar, setModalOpenAgregar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [editingHerramienta, setEditingHerramienta] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedHerramienta, setSelectedHerramienta] = useState(null);

  // Cargar herramientas al montar el componente
  useEffect(() => {
    loadHerramientas();
  }, []);

  const loadHerramientas = async () => {
    try {
      setLoading(true);
      const data = await herramientasService.getAll();
      setHerramientas(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar herramientas:', err);
      setError('Error al cargar las herramientas. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.ficha || !selectedHerramienta) {
      alert("Por favor completa los campos nombre, ficha y selecciona una herramienta");
      return;
    }

    try {
      // Crear el reporte con los datos del modelo de backend
      const reporteData = {
        ficha_trabajador: parseInt(form.ficha),
        nombre: form.nombre,
        id_herramienta: selectedHerramienta._id,
        fecha_recibido: form.fechaRecibido ? new Date(form.fechaRecibido) : new Date(),
        fecha_entrega: form.fechaEntregado ? new Date(form.fechaEntregado) : new Date(),
        estado_entrega: form.status === "Entregado" ? "Entregado" : "pendiente"
      };

      await reportesService.create(reporteData);
      
      // Limpiar el formulario
      setForm({
        nombre: "",
        ficha: "",
        status: "Pendiente",
        fechaEntregado: "",
        fechaRecibido: "",
      });
      setSelectedHerramienta(null);
      toggleModalReporte();
      alert("Reporte creado exitosamente");
    } catch (err) {
      console.error('Error al crear reporte:', err);
      alert('Error al crear el reporte: ' + (err.response?.data?.data?.message || err.message));
    }
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
      setSelectedHerramienta(null);
    }
  };

  const handleEditClick = (herramienta) => {
  // Hacemos un shallow‑clone para romper la referencia
  setEditingHerramienta({ ...herramienta });
  setEditModalOpen(true);
};
  const [nuevaHerramienta, setNuevaHerramienta] = useState({
    nombre_herramienta: "",
    num_partida: "",
    numero_serie: "",
    fecha_r: "",
    dep: "",
    medida: "",
  });
  const [nuevaFoto, setNuevaFoto] = useState(null);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await herramientasService.update(editingHerramienta._id, editingHerramienta);
      await loadHerramientas(); // Recargar datos
      setEditModalOpen(false);
      setEditingHerramienta(null);
    } catch (err) {
      console.error('Error al actualizar herramienta:', err);
      alert('Error al actualizar la herramienta');
    }
  };

  const handleCreateHerramienta = async (e) => {
    e.preventDefault();
    try {
      // Preparar los datos según el modelo del backend
      const herramientaData = {
        nombre_herramienta: nuevaHerramienta.nombre_herramienta,
        num_partida: parseInt(nuevaHerramienta.num_partida),
        numero_serie: parseInt(nuevaHerramienta.numero_serie),
        fecha_r: new Date(nuevaHerramienta.fecha_r),
        dep: nuevaHerramienta.dep,
        medida: nuevaHerramienta.medida,
        calibrado: false,
        calibracion_activa: false,
        estado_calibracion: 'Pendiente de calibración'
      };

      // Si hay imagen, agregarla
      if (nuevaFoto) {
        herramientaData.imagen = nuevaFoto;
      }

      await herramientasService.create(herramientaData);
      await loadHerramientas(); // Recargar datos
      setNuevaHerramienta({
        nombre_herramienta: "",
        num_partida: "",
        numero_serie: "",
        fecha_r: "",
        dep: "",
        medida: "",
      });
      setNuevaFoto(null);
      toggleModalAgregar();
      alert("Herramienta creada exitosamente");
    } catch (err) {
      console.error('Error al crear herramienta:', err);
      alert('Error al crear la herramienta: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta herramienta?')) {
      try {
        await herramientasService.delete(id);
        await loadHerramientas(); // Recargar datos
      } catch (err) {
        console.error('Error al eliminar herramienta:', err);
        alert('Error al eliminar la herramienta');
      }
    }
  };

  // Función para descargar reporte individual de una herramienta
  const handleDownloadReporte = async (herramienta) => {
    try {
      const blob = await herramientasService.downloadPDF(herramienta._id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `herramienta_${herramienta._id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error al descargar reporte:', err);
      alert('Error al descargar el reporte: ' + (err.response?.data?.message || err.message));
    }
  };

  // Función para crear reporte desde una herramienta
  const handleCreateReporte = async (herramienta) => {
    try {
      // Crear datos del reporte basados en la herramienta
      const reporteData = {
        ficha_trabajador: parseInt(herramienta.num_partida),
        nombre: herramienta.nombre_herramienta,
        id_herramienta: herramienta._id,
        fecha_recibido: new Date(),
        fecha_entrega: new Date(),
        estado_entrega: "pendiente"
      };

      // Crear el reporte usando el servicio
      await reportesService.create(reporteData);
      alert('Reporte creado exitosamente');
      
      // Opcional: navegar a la página de reportes
      navigate('/reportes');
    } catch (err) {
      console.error('Error al crear reporte:', err);
      alert('Error al crear el reporte: ' + (err.response?.data?.message || err.message));
    }
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

  const herramientasParaMostrar = searchTerm.trim()
  ? herramientas.filter((herramienta) =>
      herramienta.nombre_herramienta?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      herramienta.num_partida?.toString().includes(searchTerm)
    )
  : herramientas;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pemex-green to-pemex-dark-green">
        <div className="text-center">
          {/* Spinner animado */}
          <div className="relative mb-8">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-pemex-green border-b-transparent rounded-full animate-ping opacity-20"></div>
          </div>
          
          {/* Texto de carga */}
          <h2 className="text-2xl font-bold text-white mb-2">Cargando Herramientas</h2>
          <p className="text-white/80 text-lg">Por favor espera mientras se cargan los datos...</p>
          
          {/* Puntos animados */}
          <div className="flex justify-center mt-4 space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100">
        <div className="text-center max-w-md mx-auto p-8">
          {/* Icono de error */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
          
          {/* Mensaje de error */}
          <h2 className="text-2xl font-bold text-red-800 mb-4">Error al Cargar</h2>
          <p className="text-red-600 mb-6 leading-relaxed">{error}</p>
          
          {/* Botón de reintentar */}
          <button 
            onClick={loadHerramientas}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-16"
          } bg-pemex-green h-screen transition-all duration-300 fixed left-0`}
      >
        <div className="p-4 flex justify-between items-center">{sidebarOpen && <span className="text-white font-bold ">Menú</span>}
          <button onClick={toggleSidebar} className="andform hover:scale-150  transition-all duration-500 text-white p-2 rounded hover:bg-pemex-dark-green text-xl ">
            {sidebarOpen ? "◄" : "►"}
          </button>
        </div>

        <nav className="mt-8 space-y-2">
          <div
            onClick={() => navigate("/herramientas")}
            className={`andform hover:bg-gray-500  transition-all duration-500 flex items-center px-4 py-3 text-white bg-pemex-dark-green cursor-pointer`}
          >
            <span className="text-xl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" /></svg>
            </span>
            {sidebarOpen && <span className="ml-3">Herramientas</span>}
          </div>
          <div
            onClick={() => navigate("/reportes")}
            className={` blick hover:bg-gray-500  transition-all duration-500 andform  flex items-center px-4 py-3 text-white hover:bg-pemex-dark-green cursor-pointer`}
          >
            <span className="text-xl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
            </span>
            {sidebarOpen && <span className="ml-3">Reportes</span>}
          </div>
        </nav>

        <div className={`andform hover:scale-110  transition-all duration-500 absolute bottom-0 w-50 flex items-center px-3 py-2 m-2  text-pemex-gray hover:bg-pemex-dark-green cursor-pointer bg-red-600 rounded-full`} onClick={() => navigate("/")}>
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
          <div className="container mx-auto ">
            <div className="text-pemex-white font-bold text-xl text-center ">SISTEMA DE CONTROL METROLOGIA</div>
          </div>
        </nav>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Herramientas</h1>
          <div className="relative w-full max-w-md mx-auto">
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pemex-gree focus:border-pemex-green transition duration-300 placeholder-gray-400 hover:border-pemex-green" />
          </div>

          <div className="grid grid-cols-4 gap-4 p-4">
            {herramientasParaMostrar.map((herramienta, index) => (
              <div key={`${herramienta._id}-${index}`} className="flex-shrink-0 w-90 cursor-pointer group relative flex flex-col my-6 bg-white shadow-md border border-slate-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md ">
                  <div className="relative h-52 overflow-hidden">
                    <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={herramienta.imagen_url || 'https://via.placeholder.com/300x200?text=Sin+Imagen'} alt={herramienta.nombre_herramienta} />
                  </div>
                </div>
                <div className="p-4">
                  <h6 className="mb-2 text-slate-800 text-xl font-bold"> {herramienta.nombre_herramienta} </h6>
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-medium">ID:</span>
                      <span className="text-slate-600">{herramienta._id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-medium">Partida:</span>
                      <span className="text-slate-600">{herramienta.num_partida}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-medium">Serie:</span>
                      <span className="text-slate-600">{herramienta.numero_serie}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-medium">Fecha:</span>
                      <span className="text-slate-600">{new Date(herramienta.fecha_r).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-medium">Depto:</span>
                      <span className="text-slate-600">{herramienta.dep}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-medium">Medida:</span>
                      <span className="text-slate-600">{herramienta.medida}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-medium">Estado:</span>
                      <span className={`text-sm font-medium ${herramienta.estado_calibracion === 'Calibrado' ? 'text-green-600' : 'text-orange-600'}`}>
                        {herramienta.estado_calibracion || 'Pendiente de calibración'}
                      </span>
                    </div>
                  </div>
                  <div className="px-4 pt-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={herramienta.calibracion_activa || false}
                        onChange={async (e) => {
                          try {
                            await herramientasService.updateCalibracion(herramienta._id, {
                              calibracion_activa: e.target.checked
                            });
                            await loadHerramientas(); // Recargar datos
                          } catch (err) {
                            console.error('Error al actualizar calibración:', err);
                            alert('Error al actualizar el estado de calibración');
                          }
                        }}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-checked:bg-green-500 rounded-full relative after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-full"></div>
                      <span className="text-sm text-gray-700">Calibrado</span>
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 px-4 pt-4 pb-6 border-t">
                  <button onClick={() => handleEditClick(herramienta)} className="bg-pemex-green hover:bg-pemex-dark-green text-white text-sm py-2 rounded-md hover:animate-pulseLight  transition-all duration-300">Editar</button>
                  <button onClick={() => handleDownloadReporte(herramienta)} className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 rounded-md transition-all duration-300 hover:animate-downloadBounce active:animate-downloadPulse shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                    <span>Descargar</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(herramienta._id)} className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-md hover:animate-shake transition-all duration-300">Eliminar
                    <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <button onClick={() => {
                    setSelectedHerramienta(herramienta);
                    toggleModalReporte();
                  }} className="bg-gray-500 hover:bg-gray-700 text-white text-sm py-2 rounded-md transition-transform hover:scale-105">Reporte</button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={toggleModalAgregar} className="fixed bottom-6 right-6 z-50 rounded-full bg-green-500  text-white py-3 px-5 shadow-lg hover:bg-green-700 transition-all duration-300 hover:animate-float flex " type="button">+</button>
          {modalOpenAgrgar && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm" aria-modal="true" role="dialog">
              <div className="bg-white rounded-xl p-8 w-70   max-w-md shadow-2xl  nimate-[slideIn_0.35s_ease-out] transform transition-transform duration-300 hover:scale-[1.015] overflow-y-auto max-h-screen" >
                <h2 className="text-3xl font-extrabold text-center text-pemex-green mb-8 tracking-wide">Agregar Nueva Herramienta</h2>

                <form onSubmit={handleCreateHerramienta} className="space-y-6">
                  {[
                    { type: "text", placeholder: "Nombre de la Herramienta", name: "nombre_herramienta", value: nuevaHerramienta.nombre_herramienta },
                    { type: "number", placeholder: "ID de Herramienta", name: "num_partida", value: nuevaHerramienta.num_partida },
                    { type: "number", placeholder: "Número de Serie", name: "numero_serie", value: nuevaHerramienta.numero_serie },
                    { type: "date", placeholder: "Fecha de Registro", name: "fecha_r", value: nuevaHerramienta.fecha_r },
                    { type: "text", placeholder: "Departamento", name: "dep", value: nuevaHerramienta.dep },
                    { type: "text", placeholder: "Medida", name: "medida", value: nuevaHerramienta.medida },
                  ].map(({ type, placeholder, name, value }) => (
                    <input key={name} type={type} name={name} placeholder={placeholder} value={value} onChange={(e) =>
                      setNuevaHerramienta({ ...nuevaHerramienta, [name]: e.target.value })} required className="w-full rounded-lg border border-gray-300 px-4 py-3
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
            <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl animate-[slideIn_0.35s_ease-out] transition-transform duration-300 hover:scale-[1.03]">
              <h2 className="text-3xl font-extrabold text-center text-pemex-green mb-8 tracking-wide">
                Editar Herramienta
              </h2>

              <form onSubmit={handleEditSubmit} className="space-y-6">
                {/* NOMBRE */}
                <input
                  type="text"
                  name="nombre_herramienta"
                  placeholder="Nombre"
                  value={editingHerramienta.nombre_herramienta}
                  onChange={(e) =>
                    setEditingHerramienta((prev) => ({ ...prev, nombre_herramienta: e.target.value }))
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pemex-green focus:border-pemex-green transition-colors duration-300 hover:border-pemex-green shadow-sm text-gray-800 font-medium"
                />

                {/* ID (solo‑lectura) */}
                <input
                  type="number"
                  name="num_partida"
                  placeholder="ID"
                  value={editingHerramienta.num_partida}
                  onChange={(e) =>
                    setEditingHerramienta((prev) => ({ ...prev, num_partida: e.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pemex-green focus:border-pemex-green transition-colors duration-300 hover:border-pemex-green shadow-sm text-gray-800 font-medium"
                />

                {/* PARTIDA */}
                <input
                  type="text"
                  name="numero_serie"
                  placeholder="Partida"
                  value={editingHerramienta.numero_serie}
                  onChange={(e) =>
                    setEditingHerramienta((prev) => ({ ...prev, numero_serie: e.target.value }))
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pemex-green focus:border-pemex-green transition-colors duration-300 hover:border-pemex-green shadow-sm text-gray-800 font-medium"
                />

                {/* FECHA */}
                <input
                  type="date"
                  name="fecha_r"
                  placeholder="Fecha"
                  value={editingHerramienta.fecha_r}
                  onChange={(e) =>
                    setEditingHerramienta((prev) => ({ ...prev, fecha_r: e.target.value }))
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pemex-green focus:border-pemex-green transition-colors duration-300 hover:border-pemex-green shadow-sm text-gray-800 font-medium"
                />

                {/* DEPTO */}
                <input
                  type="text"
                  name="dep"
                  placeholder="Departamento"
                  value={editingHerramienta.dep}
                  onChange={(e) =>
                    setEditingHerramienta((prev) => ({ ...prev, dep: e.target.value }))
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pemex-green focus:border-pemex-green transition-colors duration-300 hover:border-pemex-green shadow-sm text-gray-800 font-medium"
                />

                {/* MEDIDA */}
                <input
                  type="text"
                  name="medida"
                  placeholder="Medida"
                  value={editingHerramienta.medida}
                  onChange={(e) =>
                    setEditingHerramienta((prev) => ({ ...prev, medida: e.target.value }))
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pemex-green focus:border-pemex-green transition-colors duration-300 hover:border-pemex-green shadow-sm text-gray-800 font-medium"
                />

                {/* BOTONES */}
                <div className="flex justify-end gap-5 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setEditModalOpen(false);
                      setEditingHerramienta(null);
                    }}
                    className="rounded-lg bg-red-600 px-6 py-3 text-white font-semibold hover:bg-red-700 transition-colors duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-pemex-green px-6 py-3 text-white font-semibold hover:bg-pemex-dark-green transition-all duration-300 hover:animate-bounceLight"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>

            {/* Animación slide‑in */}
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
                <button onClick={toggleModalReporte} className="andform hover:scale-110 transition-all duration-500 text-pemex-green hover:bg-pemex-green hover:text-white rounded-full p-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                  <span className="text-pemex-green font-bold">Herramienta</span>
                  <select 
                    value={selectedHerramienta?._id || ""} 
                    onChange={(e) => {
                      const herramienta = herramientas.find(h => h._id == e.target.value);
                      setSelectedHerramienta(herramienta);
                    }}
                    className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700" 
                    required
                  >
                    <option value="">Selecciona una herramienta</option>
                    {herramientas.map(herramienta => (
                      <option key={herramienta._id} value={herramienta._id}>
                        {herramienta.nombre_herramienta} - ID: {herramienta._id}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-pemex-green font-bold">Nombre del Trabajador</span>
                  <input type="text" name="nombre" value={form.nombre} onChange={handleChange} className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700" required />
                </label>
                <label className="block">
                  <span className="text-pemex-green font-bold">Ficha del Trabajador</span>
                  <input type="number" name="ficha" value={form.ficha} onChange={handleChange} className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700" required />
                </label>
                <label className="block">
                  <span className="text-pemex-green font-bold">Status</span>
                  <select name="status" value={form.status} onChange={handleChange} className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700">
                    <option value="Pendiente">Pendiente</option>
                    <option value="Entregado">Entregado</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-pemex-green font-bold">Fecha Recibido</span>
                  <input type="date" name="fechaRecibido" value={form.fechaRecibido} onChange={handleChange} className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700" />
                </label>
                <label className="block">
                  <span className="text-pemex-green font-bold">Fecha Entrega</span>
                  <input type="date" name="fechaEntregado" value={form.fechaEntregado} onChange={handleChange} className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700" />
                </label>
                <div className="flex justify-end gap-2 pt-3">
                  <button type="button" onClick={toggleModalReporte} className="andform rounded bg-gray-200 px-4 py-2 font-bold text-gray-600 hover:bg-gray-300">Cancelar</button>
                  <button type="submit" className="andform rounded bg-pemex-green px-4 py-2 font-bold text-white hover:bg-pemex-dark-green">Agregar</button>
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
