import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/herramientas');
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate('/register');
  };
  const handleRecoveryClick = (e) => {
    e.preventDefault();
    navigate('/recovery');
  };

  return (
    <div className="bg-pemex-gray min-h-screen">
      <nav className="bg-pemex-green p-4 fixed top-0 w-full shadow-md z-10">
        <div className="container mx-auto">
          <div className="text-pemex-white font-bold text-xl text-center">
            Mi Inventario
          </div>
        </div>
      </nav>

      <div className="flex justify-center items-center min-h-screen pt-20">
        <form
          onSubmit={handleSubmit}
          className="bg-pemex-white shadow-lg rounded-xl px-10 pt-8 pb-10 w-96"
        >
          <img src="/logo.png" alt="logo" className="w-24 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-6 text-center text-pemex-green">
            Inicia Sesión
          </h1>

          <div className="mb-5">
            <label htmlFor="username" className="block text-pemex-dark-gray text-sm font-semibold mb-2">
              Nombre de usuario:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full px-4 py-2 border border-pemex-dark-gray rounded-lg focus:outline-none focus:border-pemex-green"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-pemex-dark-gray text-sm font-semibold mb-2">
              Contraseña:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                placeholder="********"
                className="w-full px-4 py-2 border border-pemex-dark-gray rounded-lg focus:outline-none focus:border-pemex-green"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pemex-dark-gray hover:text-pemex-black"
                onClick={togglePassword}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            <button
              onClick={handleRecoveryClick}
              className="text-pemex-red text-sm mt-2 hover:text-red-700 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-pemex-red text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Entrar
          </button>

          <p className="text-center text-pemex-dark-gray text-sm mt-5">
            ¿No tienes una cuenta?{' '}
            <button
              onClick={handleRegisterClick}
              className="text-pemex-red hover:underline font-medium"
            >
              Regístrate
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default App;
