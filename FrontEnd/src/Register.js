import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() { 
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/login');
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Registro exitoso');

    navigate('/login');
  };

  return (
    <div className="bg-pemex-gray min-h-screen">
      {/* Navbar */}
      <nav className="bg-pemex-green p-4 fixed top-0 w-full shadow-md z-10">
        <div className="container mx-auto">
          <div className="text-pemex-white font-bold text-xl text-center">
            Mi Inventario
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex justify-center items-center min-h-screen pt-20">
        <form onSubmit={handleSubmit} className="bg-pemex-white shadow-lg rounded-xl px-10 pt-8 pb-10 w-96">
          <img src="/logo.png" alt="logo" className="w-24 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-6 text-center text-pemex-green">
            Regístrate
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

          {/* Correo electrónico */}
          <div className="mb-5">
            <label htmlFor="email" className="block text-pemex-dark-gray text-sm font-semibold mb-2">
              Correo electrónico:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-pemex-dark-gray rounded-lg focus:outline-none focus:border-pemex-green"
            />
          </div>

          {/* Contraseña */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-pemex-dark-gray text-sm font-semibold mb-2">
              Contraseña:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'number' : 'password'}
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
          </div>

          {/* Botón de login */}
          <button
            type="submit"
            className="w-full bg-pemex-red text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Registrarse
          </button>

          {/* Enlace de registro */}
          <p className="text-center text-pemex-dark-gray text-sm mt-5">
            ¿Ya tienes una cuenta?{' '}
            <button onClick={handleLoginClick} className="text-pemex-red hover:underline font-medium">
              Inicia sesión
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;