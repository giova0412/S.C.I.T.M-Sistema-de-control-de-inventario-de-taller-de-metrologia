import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { recuperarPassword } from './api/authService';

function Recup() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (!email) {
            setError("El correo electrónico es obligatorio");
            return;
        }
        try {
            await recuperarPassword(email);
            setSuccess("Correo de recuperación enviado. Revisa tu bandeja de entrada y sigue el enlace para cambiar tu contraseña.");
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Error al enviar el correo de recuperación. Intenta de nuevo.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-pemex-green p-4 fixed top-0 w-full shadow-md z-10">
                <div className="container mx-auto">
                    <div className="text-pemex-white font-bold text-xl text-center">
                       SISTEMA DE CONTROL METROLOGIA
                    </div>
                </div>
            </nav>

            <div className="flex justify-center items-center min-h-screen pt-20 px-4">
                <form onSubmit={handleSubmit} 
                      className="bg-white shadow-2xl rounded-xl px-8 pt-8 pb-10 w-full max-w-md transform transition-all duration-300 hover:scale-[1.01] animate-[fadeIn_0.5s_ease-out]">
                    <div className="text-center mb-8">
                        <img src="/logo.png" alt="logo" className="w-24 mx-auto mb-4 animate-[bounceIn_1s_ease-out]" />
                        <h1 className="text-2xl font-bold text-pemex-green">Recupera tu contraseña</h1>
                        <p className="text-gray-600 mt-2">Ingresa tu correo electrónico para recuperar tu contraseña</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm animate-[shake_0.5s_ease-in-out]">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm animate-[fadeIn_0.5s_ease-in-out]">
                            {success}
                        </div>
                    )}

                    <div className="space-y-6">
                        {!success && (
                          <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Correo electrónico</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pemex-green transition-all duration-300" placeholder="tucorreo@ejemplo.com" required/>
                          </div>
                        )}
                        {!success && (
                          <button type="submit" className="w-full bg-pemex-green text-white font-bold py-3 rounded-lg transform transition-all duration-300 hover:bg-pemex-dark-green hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pemex-green active:scale-95">Enviar correo de recuperación</button>
                        )}
                        <button type="button" onClick={() => navigate('/login')} className="w-full mt-4 text-pemex-green font-semibold hover:text-pemex-dark-green transition-colors">Ir al inicio de sesión</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Recup;