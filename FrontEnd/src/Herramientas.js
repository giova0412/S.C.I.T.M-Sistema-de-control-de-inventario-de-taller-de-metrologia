import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Herramientas() {
  const [herramientas, setHerramientas] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenEditar, setModalOpenEditar] = useState(false);
  const [modalOpenAgrgar, setModalOpenAgregar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

  const toggleModalEditar = () => {
    setModalOpenEditar(!modalOpenEditar);
  }

  const toggleModalAgregar = () => {
    setModalOpenAgregar(!modalOpenAgrgar)
  }

  const filteredHerramientas = herramientas.filter((herramienta) => {
    return (herramienta.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || herramienta.aid.toString().includes(searchTerm));
  });

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-pemex-green h-screen transition-all duration-300 fixed left-0`}>
        <div className="p-4 flex justify-between items-center">
          {sidebarOpen && <span className="text-white font-bold">Menú</span>}
          <button onClick={toggleSidebar} className="andform hover:scale-110  transition-all duration-500 text-white p-2 rounded hover:bg-pemex-dark-green ">
            {sidebarOpen ? '◄' : '►'}
          </button>
        </div>

        <nav className="mt-8 space-y-2">
          <div onClick={() => navigate('/reportes')} className={` blick hover:bg-gray-100  transition-all duration-500 andform  flex items-center px-4 py-3 text-white hover:bg-pemex-dark-green cursor-pointer`}>
            <span className="text-xl">📊</span>
            {sidebarOpen && <span className="ml-3">Reportes</span>}
          </div>

          <div onClick={() => navigate('/herramientas')} className={`andform hover:bg-gray-100  transition-all duration-500 flex items-center px-4 py-3 text-white bg-pemex-dark-green cursor-pointer`}>
            <span className="text-xl">🔧</span>
            {sidebarOpen && <span className="ml-3">Herramientas</span>}
          </div>
        </nav>

        <div
          className={`andform hover:scale-110  transition-all duration-500 absolute bottom-0 w-full flex items-center px-4 py-3 text-white hover:bg-pemex-dark-green cursor-pointer`}
          onClick={() => navigate('/')}
        >
          <span className="text-xl">🚪</span>
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

        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Herramientas</h1>
          <div className="mb-4 px-10">
            <input type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar por id o nombre" className="w-full p-2 border border-gray-300 rounded-lg " />
          </div>
          {filteredHerramientas.map((herramienta) => (
            <div key={herramienta.aid} className="cursor-pointer group relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-50 hover:shadow-lg transition-shadow duration-300 "></div>
          ))}
          <div class="cursor-pointer group relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 hover:shadow-lg transition-shadow duration-300 ">


            <div class="relative h-56 m-2.5 overflow-hidden text-white rounded-md ">
              <img class="transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110"
                src="https://images.unsplash.com/photo-1496436818536-e239445d3327?q=80&w=1200" alt="investment-seed-round" />
            </div>

            <div class="p-4">
              <h6 class="mb-2 text-slate-800 text-xl font-semibold">
                Nombre
              </h6>
              <p class="text-slate-600 leading-normal font-light">
                Descripción
              </p>
              <div class="flex items-center py-3">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" class="sr-only peer" />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pemex-green rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  <span class="ml-3 text-sm font-medium text-gray-900">Calibrado</span>
                </label>
              </div>
            
            </div>
            <div className="flex justify-around mt-2">
              <div class="px-0 pb-4 pt-0 mt-2">
                <button onClick={toggleModalEditar} class="andform hover:scale-110 rounded-md bg-yellow-300 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                  Editar
                </button>
              </div>
              <div class="px-1 pb-4 pt-0 mt-2 px-right-3 ">
                <button class="andform hover:scale-110 rounded-md bg-red-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                  Eliminar
                </button>
              </div>
              <div class="px-1 pb-4 pt-0 mt-2">
                <button onClick={toggleModal} class="andform hover:scale-110 rounded-md bg-blue-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                  Reporte
                </button>
              </div>
            </div>

            {modalOpen && (
              <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
                onClick={toggleModal}>
                <div className="bg-white p-4 rounded shadow-lg w1/2" onClick={(e) => e.stopPropagation()}>
                  <h2 className="font-bold text-center">Generar Reporte</h2>
                  <form className=" px-5 flex-none py-5 flex flex-col ">
                    <label className="mb-2 font-semibold">Ficha de Trabajador:</label>
                    <input type="number" className=" p-1 border border-gray-300 rounded-lg mb-3" />
                    <label className="mb-2 font-semibold">Nombre:</label>
                    <input type="text" className=" p-1 border border-gray-300 rounded-lg mb-3 " />
                    <label className="mb-2 font-semibold">Herramienta:</label>
                    <input type="" className=" p-1 border border-gray-300 rounded-lg mb-3 " />
                    <label className="mb-2 font-semibold">Fecha Recibido:</label>
                    <input type="date" className=" p-1 border border-gray-300 rounded-lg mb-3 " />
                    <label className="mb-2 font-semibold">Fecha Entrega:</label>
                    <input type="date" className=" p-1 border border-gray-300 rounded-lg mb-3 " />
                    <button type="submit" className=" andform hover:scale-110 font-bold rounded-md bg-green-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                      Agregar
                    </button>
                  </form>
                </div>
              </div>
            )}

            {modalOpenEditar && (
              <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={toggleModalEditar}>
                <div className="bg-white p-4 rounded shadow-lg w1/2" onClick={(e) => e.stopPropagation()} >
                  <h2> Edita tu herramienta</h2>
                  <form className=" px-5 flex-none py-5 flex flex-col ">
                    <label className="mb-2 font-semibold">Nombre:</label>
                    <input type="text" className=" p-1 border border-gray-300 rounded-lg mb-3" />
                    <label className="mb-2 font-semibold">No. de identificación:</label>
                    <input type="number" className=" p-1 border border-gray-300 rounded-lg mb-3 " />
                    <label className="mb-2 font-semibold">Partida:</label>
                    <input type="number" className=" p-1 border border-gray-300 rounded-lg mb-3 " />
                    <label className="mb-2 font-semibold">Fecha:</label>
                    <input type="date" className=" p-1 border border-gray-300 rounded-lg mb-3 " />
                    <label className="mb-2 font-semibold">Depto.:</label>
                    <input type="text" className=" p-1 border border-gray-300 rounded-lg mb-3 " />
                    <button type="submit" className=" andform hover:scale-110 font-bold rounded-md bg-green-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                      Agregar
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end mb-4">
            <button className=" andform hover:scale-110 rounded-full font-bold bg-green-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none " type="button" onClick={toggleModalAgregar}> +
            </button>

            {modalOpenAgrgar && (
              <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center " onClick={toggleModalAgregar}>
                <div className="bg-white p-4 rounded shadow-lg w-1/2" onClick={(e) => e.stopPropagation()}>
                  <h2 className="text-black font-bold text-2xl text-center px-2 py-2">Agregar Nuevo Producto</h2>
                  <form className=" px-9 flex-none py-5 flex flex-col ">

                    <label className="mb-2 font-semibold">Nombre:</label>
                    <input type="text" className=" p-1 border border-gray-300 rounded-lg mb-3" />
                    <label className="mb-2 font-semibold">No. de identificación:</label>
                    <input type="number" className=" p-1 border border-gray-300 rounded-lg mb-3 " />
                    <label className="mb-2 font-semibold">Partida:</label>
                    <input type="number" className=" p-1 border border-gray-300 rounded-lg mb-3 " />
                    <label className="mb-2 font-semibold">Fecha:</label>
                    <input type="date" className=" p-1 border border-gray-300 rounded-lg mb-3 " />
                    <label className="mb-2 font-semibold">Depto.:</label>
                    <input type="text" className=" p-1 border border-gray-300 rounded-lg mb-3 " />
                    <button type="submit" className="andform hover:scale-110 font-bold rounded-md bg-green-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                      Agregar
                    </button>
                  </form>

                </div>

              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Herramientas;