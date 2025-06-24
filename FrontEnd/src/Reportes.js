import React, { useState, useEffect } from "react";
import { useNavigate }  from "react-router-dom";
import { reportesService } from "./api/reportesService.js";
import { herramientasService } from "./api/herramientasService.js";

const Reportes = () => {
    // Estado para lista de reportes
    const [reportes, setReportes] = useState([]);
    const [herramientas, setHerramientas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    // Estado para filtro y tabs
    const [searchTerm, setSearchTerm] = useState("");
    const [tab, setTab] = useState("all");
    const [editingReporte, setEditingReporte] = useState(null);
    const [selectedHerramientas, setSelectedHerramientas] = useState([]);
    const [editingHerramientas, setEditingHerramientas] = useState([]);
    
    // Cargar reportes y herramientas al montar el componente
    useEffect(() => {
        loadReportes();
        loadHerramientas();
    }, []);

    const loadReportes = async () => {
        try {
            setLoading(true);
            const data = await reportesService.getAll();
            setReportes(data);
            setError(null);
        } catch (err) {
            console.error('Error al cargar reportes:', err);
            setError('Error al cargar los reportes. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const loadHerramientas = async () => {
        try {
            const data = await herramientasService.getAll();
            setHerramientas(data);
        } catch (err) {
            console.error('Error al cargar herramientas:', err);
        }
    };

    const handleEdit = (reporte, index) => {
        // Convertir los datos del backend al formato del formulario
        const reporteFormato = {
            ...reporte,
            ficha: reporte.ficha_trabajador || reporte._id,
            status: reporte.estado_entrega === "Entregado" ? "Entregado" : "Pendiente",
            fechaEntregado: reporte.fecha_entrega ? new Date(reporte.fecha_entrega).toISOString().split('T')[0] : "",
            fechaRecibido: reporte.fecha_recibido ? new Date(reporte.fecha_recibido).toISOString().split('T')[0] : ""
        };
        setEditingReporte(reporteFormato);
        setEditingHerramientas(reporte.id_herramienta ? reporte.id_herramienta.map(String) : []);
        setEditModalOpen(true);
    };

    // Estado para modal y formulario
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({
        nombre: "",
        ficha: "",
        status: "Pendiente",
        fechaEntregado: "",
        fechaRecibido: "",
    });

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
            setSelectedHerramientas([]);
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Actualizar inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Enviar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validación para selección múltiple
        if (!form.nombre || !form.ficha || selectedHerramientas.length === 0) {
            alert("Completa nombre, ficha y selecciona al menos una herramienta");
            return;
        }
        try {
            // Crear el reporte con los datos del modelo del backend
            const reporteData = {
                ficha_trabajador: parseInt(form.ficha),
                nombre: form.nombre,
                id_herramienta: selectedHerramientas.map(id => parseInt(id)),
                fecha_recibido: form.fechaRecibido ? new Date(form.fechaRecibido) : new Date(),
                fecha_entrega: form.fechaEntregado ? new Date(form.fechaEntregado) : new Date(),
                estado_entrega: form.status === "Entregado" ? "Entregado" : "pendiente"
            };

            await reportesService.create(reporteData);
            await loadReportes(); // Recargar datos
            setForm({
                nombre: "",
                ficha: "",
                status: "Pendiente",
                fechaEntregado: "",
                fechaRecibido: "",
            });
            setSelectedHerramientas([]);
            toggleModalReporte();
        } catch (err) {
            console.error('Error al crear reporte:', err);
            alert('Error al crear el reporte');
        }
    };

    // Editar reporte
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            // Convertir los datos del formulario al formato del backend
            const reporteData = {
                nombre: editingReporte.nombre,
                ficha_trabajador: parseInt(editingReporte.ficha),
                id_herramienta: editingHerramientas.map(id => parseInt(id)),
                fecha_recibido: editingReporte.fechaRecibido ? new Date(editingReporte.fechaRecibido) : new Date(),
                fecha_entrega: editingReporte.fechaEntregado ? new Date(editingReporte.fechaEntregado) : new Date(),
                estado_entrega: editingReporte.status === "Entregado" ? "Entregado" : "pendiente"
            };

            await reportesService.update(editingReporte.ficha, reporteData);
            await loadReportes(); // Recargar datos
            setEditModalOpen(false);
            setEditingReporte(null);
        } catch (err) {
            console.error('Error al actualizar reporte:', err);
            alert('Error al actualizar el reporte');
        }
    };

    // Eliminar reporte
    const handleDelete = async (ficha) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este reporte?')) {
            try {
                await reportesService.delete(ficha);
                await loadReportes(); // Recargar datos
            } catch (err) {
                console.error('Error al eliminar reporte:', err);
                alert('Error al eliminar el reporte');
            }
        }
    };

    // Descargar PDF
    const handleDownloadPDF = async () => {
        try {
            const blob = await reportesService.downloadPDF();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'reportes.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            console.error('Error al descargar PDF:', err);
            alert('Error al descargar el PDF');
        }
    };

    // Filtrar reportes según tab y búsqueda
    const filteredReportes = reportes.filter((r) => {
        const matchesTab =
            tab === "all" ||
            (tab === "monitored" && r.estado_entrega === "pendiente") ||
            (tab === "unmonitored" && r.estado_entrega === "Entregado");
        const matchesSearch =
            r.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (r.ficha_trabajador || r._id).toString().includes(searchTerm.toLowerCase());

        return matchesTab && matchesSearch;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="text-center">
                    {/* Spinner animado */}
                    <div className="relative mb-8">
                        <div className="w-16 h-16 border-4 border-pemex-green border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <div className="absolute inset-0 w-16 h-16 border-4 border-blue-500 border-b-transparent rounded-full animate-ping opacity-20"></div>
                    </div>
                    
                    {/* Texto de carga */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Cargando Reportes</h2>
                    <p className="text-gray-600 text-lg">Por favor espera mientras se cargan los datos...</p>
                    
                    {/* Puntos animados */}
                    <div className="flex justify-center mt-4 space-x-1">
                        <div className="w-2 h-2 bg-pemex-green rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-pemex-green rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-pemex-green rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                    <h2 className="text-2xl font-bold text-red-800 mb-4">Error al Cargar Reportes</h2>
                    <p className="text-red-600 mb-6 leading-relaxed">{error}</p>
                    
                    {/* Botón de reintentar */}
                    <button 
                        onClick={loadReportes}
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
        <div className=" h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? "w-64" : "w-16"} bg-pemex-green h-screen transition-all duration-300 fixed left-0`}>
                <div className="p-4 flex justify-between items-center">
                    {sidebarOpen && <span className="text-white font-bold">Menú</span>}
                    <button onClick={toggleSidebar} className="andform hover:scale-110 transition-all duration-500 text-white p-2 rounded hover:bg-pemex-dark-green">
                        {sidebarOpen ? "◄" : "►"}
                    </button>
                </div>

                <nav className="mt-8 space-y-2">
                    <div onClick={() => navigate("/herramientas")} className="andform hover:bg-gray-500 transition-all duration-500 flex items-center px-4 py-3 text-white bg-pemex-dark-green cursor-pointer">
                        <span className="text-xl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                                </svg>
                        </span>
                        {sidebarOpen && <span className="ml-3">Herramientas</span>}
                    </div>
                    <div onClick={() => navigate("/reportes")} className="andform hover:bg-gray-500 transition-all duration-500 flex items-center px-4 py-3 text-white hover:bg-pemex-dark-green cursor-pointer">
                        <span className="text-xl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                        </span>
                        {sidebarOpen && <span className="ml-3">Reportes</span>}
                    </div>
                </nav>

                <div className="andform hover:scale-110 transition-all duration-500 absolute bottom-0 w-50 flex items-center px-4 py-3 text-pemex-gray hover:bg-pemex-dark-green cursor-pointer rounded-full bg-pemex-red m-2" onClick={() => navigate("/")}>
                    <span className="text-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                    </span>
                    {sidebarOpen && <span className="ml-3">Cerrar Sesión</span>}
                </div>
            </aside>

            {/* Contenido principal */}
            <main className={`${sidebarOpen ? "ml-64" : "ml-16"} transition-all duration-300`}>
                <nav className="bg-pemex-green p-4 shadow-md">
                    <div className="container mx-auto">
                        <div className="text-pemex-white font-bold text-xl text-center">
                            SISTEMA DE CONTROL METROLOGIA
                        </div>
                    </div>
                </nav>

                {/* Botón para abrir modal */}
                <div className="flex flex-col gap-2 shrink-0 sm:flex-row mt-4 m-5">
                    <button onClick={toggleModalReporte} className="andform hover:scale-100 transition-all duration-500 flex select-none items-center gap-3 rounded-lg bg-pemex-green py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" strokeWidth="2" className="w-4 h-4">
                            <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                        </svg>
                        Agrega un Reporte
                    </button>
                    <button onClick={handleDownloadPDF} className="andform hover:scale-100 transition-all duration-500 flex select-none items-center gap-3 rounded-lg bg-blue-600 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Descargar PDF
                    </button>
                </div>

                {/* Tabs y buscador */}
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row mt-4 m-4">
                    <div className="block w-full overflow-hidden md:w-max">
                        <nav>
                            <ul role="tablist" className="relative flex flex-row p-1 rounded-lg bg-blue-gray-50 bg-opacity-60">
                                {[
                                    { label: "Todos", value: "all" },
                                    { label: "Pendientes", value: "monitored" },
                                    { label: "Entregado", value: "unmonitored" },
                                ].map(({ label, value }) => (
                                    <li
                                        key={value}
                                        role="tab"
                                        className={`relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center cursor-pointer select-none ${tab === value
                                            ? "text-blue-gray-900 bg-white rounded-md shadow z-20"
                                            : "text-blue-gray-900 bg-transparent"
                                            }`}
                                        data-value={value}
                                        onClick={() => setTab(value)}
                                    >
                                        <div className="z-20 text-inherit">{label}</div>
                                        {tab === value && (
                                            <div className="absolute inset-0 z-10 h-full bg-white rounded-md shadow"></div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className="w-full md:w-72 ">
                        <div className="relative h-10 w-full min-w-[200px]">
                            <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                                </svg>
                            </div>
                            <input type="text" value={searchTerm} placeholder="Buscar por nombre o ficha" onChange={(e) => setSearchTerm(e.target.value)} className="andform w-full h-full px-3 py-2 text-sm text-gray-700 border border-blue-gray-200 rounded-md bg-white pr-10 placeholder-blue-gray-300 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pemex-green focus:border-transparent hover:border-pemex-green transform hover:scale-[1.02] shadow-sm hover:shadow-md"/>
                        </div>
                    </div>
                </div>

                {/* Tabla */}
                <div className="mt-6  overflow-auto rounded-xl border border-blue-gray-100 m-5">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                <th className="border-b border-blue-gray-200 bg-pemex-green p-5 transition-colors hover:bg-pemex-dark-green">
                                    <div className="flex items-center justify-between gap-2 font-sans text-sm font-bold uppercase tracking-wide text-white">
                                        Nombre
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 opacity-70">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="border-b border-blue-gray-200 bg-pemex-green p-5 transition-colors hover:bg-pemex-dark-green">
                                    <div className="flex items-center justify-between gap-2 font-sans text-sm font-bold uppercase tracking-wide text-white">
                                        Ficha
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 opacity-70">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="border-b border-blue-gray-200 bg-pemex-green p-5 transition-colors hover:bg-pemex-dark-green">
                                    <div className="flex items-center justify-between gap-2 font-sans text-sm font-bold uppercase tracking-wide text-white">
                                        Herramienta
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 opacity-70">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="border-b border-blue-gray-200 bg-pemex-green p-5 transition-colors hover:bg-pemex-dark-green">
                                    <div className="flex items-center justify-between gap-2 font-sans text-sm font-bold uppercase tracking-wide text-white">
                                        Status
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 opacity-70">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="border-b border-blue-gray-200 bg-pemex-green p-5 transition-colors hover:bg-pemex-dark-green">
                                    <div className="flex items-center justify-between gap-2 font-sans text-sm font-bold uppercase tracking-wide text-white">
                                        Fecha Entregado
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 opacity-70">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="border-b border-blue-gray-200 bg-pemex-green p-5 transition-colors hover:bg-pemex-dark-green">
                                    <div className="flex items-center justify-between gap-2 font-sans text-sm font-bold uppercase tracking-wide text-white">
                                        Fecha Recibido
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 opacity-70">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="border-b border-blue-gray-200 bg-pemex-green p-5 transition-colors hover:bg-pemex-dark-green">
                                    <div className="flex items-center justify-between gap-2 font-sans text-sm font-bold uppercase tracking-wide text-white">
                                        Acciones
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 opacity-70">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                        </svg>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReportes.length === 0 ? (
                                <tr><td colSpan={7} className="text-center p-4 text-pemex-green font-bold"> No hay reportes para mostrar</td></tr>
                            ) : (
                                filteredReportes.map((reporte, index) => (
                                    <tr key={index} className={`border border-blue-gray-50 ${index % 2 === 0 ? "bg-pemex-green/10" : "bg-white"}`}>
                                        <td className="p-4 capitalize">{reporte.nombre}</td>
                                        <td className="p-4">{reporte.ficha_trabajador || reporte._id}</td>
                                        <td className="p-4 capitalize">{(reporte.nombres_herramientas && reporte.nombres_herramientas.length > 0) ? reporte.nombres_herramientas.join(", ") : 'No disponible'}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold ${reporte.estado_entrega === "pendiente"? "bg-red-100 text-red-800": "bg-green-100 text-green-800"} transition-all duration-300 hover:scale-105`}>
                                                <span className={`w-2 h-2 mr-2 rounded-full ${reporte.estado_entrega === "pendiente" ? "bg-red-500": "bg-green-500"}`}></span>
                                                {reporte.estado_entrega}
                                            </span>
                                        </td>
                                        <td className="p-4">{new Date(reporte.fecha_entrega).toLocaleDateString()}</td>
                                        <td className="p-4">{new Date(reporte.fecha_recibido).toLocaleDateString()}</td>
                                        <td className="p-4 flex gap-2">
                                            <button onClick={() => handleEdit(reporte, index)}className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 text-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                                Editar
                                            </button>

                                            <button 
                                                onClick={async () => {
                                                    try {
                                                        const blob = await reportesService.downloadOnePDF(reporte.ficha_trabajador || reporte._id);
                                                        const url = window.URL.createObjectURL(blob);
                                                        const a = document.createElement('a');
                                                        a.href = url;
                                                        a.download = `reporte_${reporte.ficha_trabajador || reporte._id}.pdf`;
                                                        document.body.appendChild(a);
                                                        a.click();
                                                        window.URL.revokeObjectURL(url);
                                                        document.body.removeChild(a);
                                                    } catch (err) {
                                                        console.error('Error al descargar reporte:', err);
                                                        alert('Error al descargar el reporte');
                                                    }
                                                }}
                                                className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all duration-300 text-sm"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                </svg>
                                                Descargar
                                            </button>

                                            <button
                                                onClick={() => {
                                                    handleDelete(reporte.ficha_trabajador || reporte._id);
                                                }}
                                                className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-300 text-sm"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                        <div className="max-h-[90vh] overflow-auto w-full max-w-md rounded-lg bg-white p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h4 className="text-xl font-bold text-pemex-green">Agregar Reporte</h4>
                                <button onClick={toggleModalReporte} className="andform hover:scale-110 transition-all duration-500 text-pemex-green hover:bg-pemex-green hover:text-white rounded-full p-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <label className="block">
                                    <span className="text-pemex-green font-bold">Herramientas</span>
                                    <select
                                        multiple
                                        value={selectedHerramientas}
                                        onChange={e => {
                                            const options = Array.from(e.target.selectedOptions, option => option.value);
                                            setSelectedHerramientas(options);
                                        }}
                                        className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700"
                                        required
                                    >
                                        {herramientas.map(herramienta => (
                                            <option key={herramienta._id} value={herramienta._id}>
                                                {herramienta.nombre_herramienta} - ID: {herramienta._id}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="text-xs text-gray-500">(Mantén Ctrl o Shift para seleccionar varias)</span>
                                </label>

                                <label className="block">
                                    <span className="text-pemex-green font-bold">Nombre del Trabajador</span>
                                    <input type="text" name="nombre" value={form.nombre} onChange={handleChange} className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700" required/>
                                </label>

                                <label className="block">
                                    <span className="text-pemex-green font-bold">Ficha del Trabajador</span>
                                    <input type="number" name="ficha" value={form.ficha} onChange={handleChange} className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700" required/>
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
                                    <input type="date" name="fechaRecibido" value={form.fechaRecibido} onChange={handleChange} className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700"/>
                                </label>

                                <label className="block">
                                    <span className="text-pemex-green font-bold">Fecha Entrega</span>
                                    <input type="date" name="fechaEntregado" value={form.fechaEntregado} onChange={handleChange} className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700"/>
                                </label>

                                <div className="flex justify-end gap-2 pt-3">
                                    <button type="button" onClick={toggleModalReporte} className="andform rounded bg-gray-200 px-4 py-2 font-bold text-gray-600 hover:bg-gray-300">Cancelar</button>
                                    <button type="submit" className="andform rounded bg-pemex-green px-4 py-2 font-bold text-white hover:bg-pemex-dark-green">Agregar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {editModalOpen && editingReporte && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                        <div className="max-h-[90vh] overflow-auto w-full max-w-md rounded-lg bg-white p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h4 className="text-xl font-bold text-pemex-green">Editar Reporte</h4>
                                <button onClick={() => setEditModalOpen(false)} className="andform hover:scale-110 transition-all duration-500 text-pemex-green hover:bg-pemex-green hover:text-white rounded-full p-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleEditSubmit} className="space-y-4">
                                <label className="block">
                                    <span className="text-pemex-green font-bold">Nombre</span>
                                    <input type="text" value={editingReporte.nombre} onChange={(e) => setEditingReporte({ ...editingReporte, nombre: e.target.value })} className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700"required/>
                                </label>

                                <label className="block">
                                    <span className="text-pemex-green font-bold">Ficha</span>
                                    <input type="text" value={editingReporte.ficha} onChange={(e) => setEditingReporte({ ...editingReporte, ficha: e.target.value })} className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700"required/>
                                </label>

                                <label className="block">
                                    <span className="text-pemex-green font-bold">Status</span>
                                    <select value={editingReporte.status} onChange={(e) => setEditingReporte({ ...editingReporte, status: e.target.value })} className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700">
                                        <option value="Pendiente">Pendiente</option>
                                        <option value="Entregado">Entregado</option>
                                    </select>
                                </label>

                                <label className="block">
                                    <span className="text-pemex-green font-bold">Fecha entregado</span>
                                    <input type="date" value={editingReporte.fechaEntregado} onChange={(e) => setEditingReporte({ ...editingReporte, fechaEntregado: e.target.value })} className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700"/>
                                </label>

                                <label className="block">
                                    <span className="text-pemex-green font-bold">Fecha recibido</span>
                                    <input type="date" value={editingReporte.fechaRecibido} onChange={(e) => setEditingReporte({ ...editingReporte, fechaRecibido: e.target.value })} className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700"/>
                                </label>

                                <label className="block">
                                    <span className="text-pemex-green font-bold">Herramientas</span>
                                    <select
                                        multiple
                                        value={editingHerramientas}
                                        onChange={e => {
                                            const options = Array.from(e.target.selectedOptions, option => option.value);
                                            setEditingHerramientas(options);
                                        }}
                                        className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700"
                                        required
                                    >
                                        {herramientas.map(herramienta => (
                                            <option key={herramienta._id} value={herramienta._id}>
                                                {herramienta.nombre_herramienta} - ID: {herramienta._id}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="text-xs text-gray-500">(Mantén Ctrl o Shift para seleccionar varias)</span>
                                </label>

                                <div className="flex justify-end gap-2 pt-3">
                                    <button type="button" onClick={() => setEditModalOpen(false)} className="andform rounded bg-gray-200 px-4 py-2 font-bold text-gray-600 hover:bg-gray-300">Cancelar</button>
                                    <button type="submit" className="andform rounded bg-pemex-green px-4 py-2 font-bold text-white hover:bg-pemex-dark-green">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Reportes;
