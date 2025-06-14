import React, { useState } from "react";
import { useNavigate }  from "react-router-dom";

const Reportes = () => {
    // Estado para lista de reportes
    const [reportes, setReportes] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    // Estado para filtro y tabs
    const [searchTerm, setSearchTerm] = useState("");
    const [tab, setTab] = useState("all");
    const [editingReporte, setEditingReporte] = useState(null);
    const handleEdit = (reporte, index) => {
        setEditingReporte({ ...reporte, index });
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

    const toggleModalReporte = () => setModalOpen(!modalOpen);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Actualizar inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Enviar formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación simple
        if (!form.nombre || !form.ficha) {
            alert("Completa nombre y ficha");
            return;
        }
        setReportes((prev) => [...prev, form]);
        setForm({
            nombre: "",
            ficha: "",
            status: "Pendiente",
            fechaEntregado: "",
            fechaRecibido: "",
        });
        toggleModalReporte();
    };
    // Editar reporte
    const handleEditSubmit = (e) => {
        const newReportes = [...reportes];
        newReportes[editingReporte.index] = {
            nombre: editingReporte.nombre,
            ficha: editingReporte.ficha,
            status: editingReporte.status,
            fechaEntregado: editingReporte.fechaEntregado,
            fechaRecibido: editingReporte.fechaRecibido
        };
        setReportes(newReportes);
        setEditModalOpen(false);
        setEditingReporte(null);
    };

    // Filtrar reportes según tab y búsqueda
    const filteredReportes = reportes.filter((r) => {
        const matchesTab =
            tab === "all" ||
            (tab === "monitored" && r.status === "Pendiente") ||
            (tab === "unmonitored" && r.status === "Entregado");
        const matchesSearch =
            r.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.ficha.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesTab && matchesSearch;
    });

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
                                <tr><td colSpan={5} className="text-center p-4 text-pemex-green font-bold"> No hay reportes para mostrar</td></tr>
                            ) : (
                                filteredReportes.map((reporte, index) => (
                                    <tr key={index} className={`border border-blue-gray-50 ${index % 2 === 0 ? "bg-pemex-green/10" : "bg-white"}`}>
                                        <td className="p-4 capitalize">{reporte.nombre}</td>
                                        <td className="p-4">{reporte.ficha}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold ${reporte.status === "Pendiente"? "bg-red-100 text-red-800": "bg-green-100 text-green-800"} transition-all duration-300 hover:scale-105`}>
                                                <span className={`w-2 h-2 mr-2 rounded-full ${reporte.status === "Pendiente" ? "bg-red-500": "bg-green-500"}`}></span>
                                                {reporte.status}
                                            </span>
                                        </td>
                                        <td className="p-4">{reporte.fechaEntregado}</td>
                                        <td className="p-4">{reporte.fechaRecibido}</td>
                                        <td className="p-4 flex gap-2">
                                            <button onClick={() => handleEdit(reporte, index)}className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 text-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                                Editar
                                            </button>

                                            <button className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all duration-300 text-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                </svg>
                                                Descargar
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setReportes((prev) =>
                                                        prev.filter((_, i) => i !== index)
                                                    );
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
                                    <span className="text-pemex-green font-bold">Nombre</span>
                                    <input type="text" name="nombre" value={form.nombre} onChange={handleChange} className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700" required/>
                                </label>

                                <label className="block">
                                    <span className="text-pemex-green font-bold">Ficha</span>
                                    <input type="text" name="ficha" value={form.ficha} onChange={handleChange} className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700" required/>
                                </label>

                                <label className="block">
                                    <span className="text-pemex-green font-bold">Status</span>
                                    <select name="status" value={form.status}onChange={handleChange} className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700">
                                        <option value="Pendiente">Pendiente</option>
                                        <option value="Entregado">Entregado</option>
                                    </select>
                                </label>

                                <label className="block">
                                    <span className="text-pemex-green font-bold">Fecha entregado</span>
                                    <input type="date" name="fechaEntregado" value={form.fechaEntregado} onChange={handleChange} className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700"/>
                                </label>

                                <label className="block">
                                    <span className="text-pemex-green font-bold">Fecha recibido</span>
                                    <input type="date" name="fechaRecibido" value={form.fechaRecibido} onChange={handleChange} className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700"/>
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
                                    <input type="date" value={editingReporte.fechaRecibido}vonChange={(e) => setEditingReporte({ ...editingReporte, fechaRecibido: e.target.value })} className="andform w-full rounded border border-pemex-green px-3 py-2 text-sm text-gray-700"/>
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
