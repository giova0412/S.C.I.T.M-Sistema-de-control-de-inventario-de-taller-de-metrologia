import './App.css';
import { useState } from 'react';

function App() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-custom-beige min-h-screen">
      {/* Navbar simplificada */}
      <nav className="bg-custom-olive p-4 fixed top-0 w-full shadow-md">
        <div className="container mx-auto">
          <div className="text-white font-bold text-xl text-center">Mi Inventario</div>
        </div>
      </nav>

      {/* Formulario de login */}
      <div className="flex justify-center items-center min-h-screen">
        <form className="bg-custom-pink shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 w-96 mt-24">
          <h1 className="text-2xl font-bold mb-6 text-center text-custom-brown">Inicia Sesión</h1>

          <div className="form-group mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Nombre:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-custom-brown"
            />
          </div>

          <div className="form-group mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-custom-brown"
                placeholder="********"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={togglePassword}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button
            className="bg-custom-brown text-white rounded-xl p-2 hover:bg-green-500 w-full transition-colors"
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
