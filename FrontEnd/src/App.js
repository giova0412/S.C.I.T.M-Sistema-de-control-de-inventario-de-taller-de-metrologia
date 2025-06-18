import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './api/authService';

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const validatePassword = (pass) => {
    const minLength = 6; // Longitud mínima más corta para números
    const onlyNumbers = /^\d+$/.test(pass); // Verifica que solo contenga números
    return pass.length >= minLength && onlyNumbers;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validatePassword(password)) {
      setError('La contraseña debe tener al menos 6 números');
      return;
    }
    if (!username) {
      setError('El nombre de usuario es obligatorio');
      return;
    }
    try {
      const res = await login(username, password);
      // Aquí podrías guardar el usuario en localStorage/sessionStorage si lo deseas
      navigate('/herramientas');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Error al iniciar sesión. Intenta de nuevo.');
      }
    }
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
              SISTEMA DE CONTROL METROLOGIA
          </div>
        </div>
      </nav>

      <div className="flex justify-center items-center min-h-screen pt-20">
        <form onSubmit={handleSubmit} className="bg-pemex-white shadow-lg rounded-xl px-10 pt-8 pb-10 w-96">
          <img src="/logo.png" alt="logo" className="w-24 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-6 text-center text-pemex-green">Inicia Sesión</h1>
          <div className="mb-5">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Nombre de usuario:
            </label>
            <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} required className="w-full px-6 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pemex-green transition-all duration-300"/>
          </div>

          <div className="mb-6"> 
            <label className="block text-gray-700 text-sm font-bold mb-2"> Contraseña</label>
            <div className="relative">
            <input type={showPassword? "text": "password"} inputMode="numeric" pattern="[0-9]*" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pemex-green transition-all duration-300" placeholder="123456" required/>
            <button onClick={()=>setShowPassword(!showPassword)} type="button" className="absolute right-3 top-4 transform -translate-y-1/ text-gray-500 hover:text-gray-700 transition-colors">
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543-7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              )}
            </button>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <button className="w-full bg-pemex-red text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition-colors mt-3" type="submit">Entrar</button>
          </div>
          <button onClick={handleRecoveryClick} className="text-pemex-red text-sm mt-2 hover:text-red-700 transition-colors">¿Olvidaste tu contraseña?</button>
        </div>


          <p className="text-center text-pemex-dark-gray text-sm mt-5">¿No tienes una cuenta?{' '}
            <button onClick={handleRegisterClick} className="text-pemex-red hover:underline font-medium">Regístrate</button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default App;
