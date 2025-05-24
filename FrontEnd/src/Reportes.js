import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Reportes() {
    const [reportes, setReportes] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const [modalReporte, setModalReporte] = useState(false);
    const [searchTerm, setSearchTerm] = useState(" ");

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    const toggleModalReporte = () => {
        setModalReporte(!modalReporte);
    }

    return (
        <div className="Flex h-screen bg-gray-100">
            <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-pemex-green h-screen transition-all duration-300 fixed left-0`}>
                <div className="p-4 flex justify-between items-center">
                    {sidebarOpen && <span className="text-white font-bold">Menú</span>}
                    <button onClick={toggleSidebar} className="text-white p-2 rounded hover:bg-pemex-dark-green">
                        {sidebarOpen ? '◄' : '►'}
                    </button>
                </div>

                <nav className="mt-8 space-y-2">
                    <div onClick={() => navigate('/reportes')} className={`flex items-center px-4 py-3 text-white hover:bg-pemex-dark-green cursor-pointer`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
                            class="w-8 h-8 text-blue-0 hover:text-blue-900 transition-all duration-300 ease-in-out group">
                            <rect x="10" y="8" width="40" height="48" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none" />
                            <path d="M20 30h24" stroke="currentColor" stroke-width="2" stroke-dasharray="24" stroke-dashoffset="24"
                                class="group-hover:stroke-dashoffset-0 transition-all duration-700 ease-in-out" />
                            <polygon points="44,28 50,34 48,36 42,30" fill="currentColor"
                                class="transform group-hover:translate-x-1 transition duration-700" />
                        </svg>
                        {sidebarOpen && <span className="ml-3">Reportes</span>}
                    </div>
                    <div onClick={() => navigate('/herramientas')} className={`flex items-center px-4 py-3 text-white bg-pemex-dark-green cursor-pointer`}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="h-10 w-10 text-indigo-500 animate-pulse"
                            viewBox="0 0 24 24"
                            fill="currentColor">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm1 9h-4v8h-2v-8H7V9h4V5h2v4h4v2z" />
                        </svg>
                        {sidebarOpen && <span className="ml-3">Herramientas</span>}
                    </div>
                </nav>
                <div className={`absolute bottom-0 w-full flex items-center px-4 py-3 text-white hover:bg-pemex-dark-green cursor-pointer`} onClick={() => navigate('/')}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-600 hover:-translate-x-1 hover:text-red-800 transition-transform duration-300 ease-in-out"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                    </svg>
                    {sidebarOpen && <span className="ml-3">Cerrar Sesión</span>}
                </div>
            </aside>



            {/* Contenido principal */}
            <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
                <nav className="bg-pemex-green p-4 shadow-md">
                    <div className="container mx-auto">
                        <div className="text-pemex-white font-bold text-xl text-center">
                            Mi Inventario
                        </div>
                    </div>
                </nav>
                <div class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                    <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
                        <div class="flex items-center justify-between gap-8 mb-8">
                            <div>
                                <h5
                                    class="block font-bold font-sans text-xl antialiased  leading-snug tracking-normal text-center text-blue-gray-900">
                                    Reportes
                                </h5>
                                <p class="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                                    Ver información sobre los reportes
                                </p>
                            </div>
                            <div class="flex flex-col gap-2 shrink-0 sm:flex-row">

                                <button onClick={toggleModalReporte}
                                    class="andform hover:scale-100 transition-all duration-500 flex select-none items-center gap-3 rounded-lg bg-pemex-green py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10  hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                        stroke-width="2" class="w-4 h-4">
                                        <path
                                            d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z">
                                        </path>
                                    </svg>
                                    Agrega un Reporte
                                </button>


                            </div>
                        </div>
                        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <div class="block w-full overflow-hidden md:w-max">
                                <nav>
                                    <ul role="tablist" class="relative flex flex-row p-1 rounded-lg bg-blue-gray-50 bg-opacity-60">
                                        <li role="tab"
                                            class="relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
                                            data-value="all">
                                            <div class="z-20 text-inherit">
                                                Todos
                                            </div>
                                            <div class="absolute inset-0 z-10 h-full bg-white rounded-md shadow"></div>
                                        </li>
                                        <li role="tab"
                                            class="relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
                                            data-value="monitored">
                                            <div class="z-20 text-inherit">
                                                &nbsp;&nbsp;Pendientes&nbsp;&nbsp;
                                            </div>
                                        </li>
                                        <li role="tab"
                                            class="relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
                                            data-value="unmonitored">
                                            <div class="z-20 text-inherit">
                                                &nbsp;&nbsp;Entregado&nbsp;&nbsp;
                                            </div>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="w-full md:w-72">
                                <div class="relative h-10 w-full min-w-[200px]">
                                    <div class="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                            stroke="currentColor" aria-hidden="true" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                                        </svg>
                                    </div>
                                    <input
                                        class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                        placeholder=" " value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                    <label
                                        class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                        Buscar
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="p-6 px-8 overflow-scroll  mt-5 ">
                        <table class="w-full mt-4 text-left table-auto min-w-max">
                            <thead>
                                <tr>
                                    <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Nombre
                                        </p>
                                    </th>
                                    <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Ficha
                                        </p>
                                    </th>
                                    <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Status
                                        </p>
                                    </th>
                                    <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Fecha Entregado
                                        </p>
                                    </th>
                                    <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Fecha Recibido
                                        </p>
                                    </th>
                                    <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Editar
                                        </p>
                                    </th>
                                    <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Descarga
                                        </p>
                                    </th>
                                    <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Eliminar
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex items-center gap-3">
                                            <div class="flex flex-col">
                                                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    John Michael
                                                </p>

                                            </div>
                                        </div>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex flex-col">
                                            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                Manager
                                            </p>

                                        </div>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="w-max">
                                            <button
                                                class="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                                                <span class="">Entragado</span>
                                            </button>
                                        </div>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            23/04/18
                                        </p>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            25/04/18
                                        </p>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <button
                                            class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button">
                                            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                                    class="w-4 h-4">
                                                    <path
                                                        d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
                                                    </path>
                                                </svg>
                                            </span>
                                        </button>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <button className="relative h-10 max-h-[40px] w-7 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="w-6 h-6 text-green-500 hover:text-pemex-green transition duration-200"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                                            </svg>
                                        </button>

                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50" >
                                        <button className="relative h-10 max-h-[40px] w-7 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="w-6 h-6 text-red-600 hover:text-red-800 transition duration-200"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7m4-3h2a1 1 0 011 1v1H8V5a1 1 0 011-1z" />
                                            </svg>
                                        </button>

                                    </td>
                                </tr>
                                <tr>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex items-center gap-3">

                                            <div class="flex flex-col">
                                                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    Alexa Liras
                                                </p>

                                            </div>
                                        </div>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex flex-col">
                                            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                Programator
                                            </p>
                                        </div>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="w-max">
                                            <button
                                                class="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap bg-blue-red-500/20 text-blue-gray-900">
                                                <span class="">Pendiente</span>
                                            </button>
                                        </div>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            23/04/18
                                        </p>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                        </p>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <button
                                            class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button">
                                            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                                    class="w-4 h-4">
                                                    <path
                                                        d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
                                                    </path>
                                                </svg>
                                            </span>
                                        </button>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <button className="relative h-10 max-h-[40px] w-7 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="w-6 h-6 text-green-500 hover:text-pemex-green transition duration-200"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                                            </svg>
                                        </button>

                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50" >
                                        <button className="relative h-10 max-h-[40px] w-7 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="w-6 h-6 text-red-600 hover:text-red-800 transition duration-200"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7m4-3h2a1 1 0 011 1v1H8V5a1 1 0 011-1z" />
                                            </svg>
                                        </button>

                                    </td>
                                </tr>
                                <tr>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex items-center gap-3">

                                            <div class="flex flex-col">
                                                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    Laurent Perrier
                                                </p>

                                            </div>
                                        </div>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex flex-col">
                                            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                Executive
                                            </p>

                                        </div>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="w-max">
                                            <div
                                                class="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap bg-blue-gray-500/20 text-blue-gray-900">
                                                <span class="">Pendiente</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            19/09/17
                                        </p>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">

                                        </p>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <button
                                            class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button">
                                            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                                    class="w-4 h-4">
                                                    <path
                                                        d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
                                                    </path>
                                                </svg>
                                            </span>
                                        </button>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <button className="relative h-10 max-h-[40px] w-7 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="w-6 h-6 text-green-500 hover:text-pemex-green transition duration-200"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                                            </svg>
                                        </button>

                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50" >
                                        <button className="relative h-10 max-h-[40px] w-7 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="w-6 h-6 text-red-600 hover:text-red-800 transition duration-200"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7m4-3h2a1 1 0 011 1v1H8V5a1 1 0 011-1z" />
                                            </svg>
                                        </button>

                                    </td>
                                </tr>
                                <tr>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex items-center gap-3">

                                            <div class="flex flex-col">
                                                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    Michael Levi
                                                </p>

                                            </div>
                                        </div>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex flex-col">
                                            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                Programator
                                            </p>

                                        </div>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="w-max">
                                            <button
                                                class="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                                                <span class="">Entregado</span>
                                            </button>
                                        </div>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            24/12/08
                                        </p>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            26/12/08
                                        </p>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <button
                                            class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button">
                                            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                                    class="w-4 h-4">
                                                    <path
                                                        d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
                                                    </path>
                                                </svg>
                                            </span>
                                        </button>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <button className="relative h-10 max-h-[40px] w-7 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="w-6 h-6 text-green-500 hover:text-pemex-green transition duration-200"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                                            </svg>
                                        </button>

                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50" >
                                        <button className="relative h-10 max-h-[40px] w-7 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="w-6 h-6 text-red-600 hover:text-red-800 transition duration-200"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7m4-3h2a1 1 0 011 1v1H8V5a1 1 0 011-1z" />
                                            </svg>
                                        </button>

                                    </td>
                                </tr>
                                <tr>
                                    <td class="p-4">
                                        <div class="flex items-center gap-3">
                                            <div class="flex flex-col">
                                                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    Richard Gran
                                                </p>

                                            </div>
                                        </div>
                                    </td>
                                    <td class="p-4">
                                        <div class="flex flex-col">
                                            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                Manager
                                            </p>

                                        </div>
                                    </td>
                                    <td class="p-4">
                                        <div class="w-max">
                                            <div
                                                class="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap bg-blue-gray-500/20 text-blue-gray-900">
                                                <span class="">Pendiente</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="p-4">
                                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            04/10/21
                                        </p>
                                    </td>
                                    <td class="p-4">
                                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                        </p>
                                    </td>
                                    <td class="p-4">
                                        <button
                                            class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button">
                                            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                                    class="w-4 h-4">
                                                    <path
                                                        d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
                                                    </path>
                                                </svg>
                                            </span>
                                        </button>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <button className="relative h-10 max-h-[40px] w-7 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="w-6 h-6 text-green-500 hover:text-pemex-green transition duration-200"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                                            </svg>
                                        </button>

                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50" >
                                        <button className="relative h-10 max-h-[40px] w-7 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="w-6 h-6 text-red-600 hover:text-red-800 transition duration-200"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7m4-3h2a1 1 0 011 1v1H8V5a1 1 0 011-1z" />
                                            </svg>
                                        </button>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="flex items-center justify-between p-4 border-t border-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            Page 1 of 10
                        </p>
                        <div class="flex gap-2">
                            <button
                                class="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                Siguiente
                            </button>

                        </div>
                    </div>

                </div>
            </main>
            {modalReporte && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={toggleModalReporte}>
                    <div className="bg-white p-4 rounded shadow-lg w-1/2" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-black font-bold text-2xl text-center px-2 py-2">Agregar Nuevo Reporte</h2>
                        <form className=" px-9 flex-none py-5 flex flex-col ">
                            <label className="mb-2 font-semibold">Nombre:</label>
                            <input type="text" className=" p-1 border border-gray-300 rounded-lg mb-3" />
                            <label className="mb-2 font-semibold">Descripción:</label>
                            <input type="text" className=" p-1 border border-gray-300 rounded-lg mb-3 " />
                            <button type="submit" className=" font-bold rounded-md bg-green-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                Agregar
                            </button>
                        </form>

                    </div>

                </div>
            )}
        </div>




    )
}
export default Reportes;