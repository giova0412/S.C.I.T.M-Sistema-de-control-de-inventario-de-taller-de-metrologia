import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Recup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const togglePassword = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    const validatePassword = (pass) => {
        const minLength = 6; 
        const onlyNumbers = /^\d+$/.test(pass); 

        return pass.length >= minLength && onlyNumbers;
    };

    const handlePasswordChange = (e, isConfirm = false) => {
        const value = e.target.value;
        // Solo permite números
        if (value === '' || /^\d+$/.test(value)) {
            if (isConfirm) {
                setConfirmPassword(value);
            } else {
                setPassword(value);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!validatePassword(password)) {
            setError("La contraseña debe tener al menos 6 caracteres y contener solo números");
            return;
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        navigate('/login');
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
                        <p className="text-gray-600 mt-2">Ingresa tu nueva contraseña</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm animate-[shake_0.5s_ease-in-out]">
                            {error}
                        </div>
                    )}

                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Nueva Contraseña</label>
                            <div className="relative">
                                <input type={showPassword ? 'text' : 'password'}inputMode="numeric"pattern="[0-9]*"   value={password} onChange={(e) => handlePasswordChange(e, false)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pemex-green transition-all duration-300" placeholder="123456" required/>
                                <button type="button" onClick={() => togglePassword('password')} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors">
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Confirmar Contraseña</label>
                            <div className="relative">
                               <input type={showConfirmPassword ? 'text' : 'password'} inputMode="numeric"pattern="[0-9]*" value={confirmPassword}onChange={(e) => handlePasswordChange(e, true)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pemex-green transition-all duration-300" placeholder="123456" required/>
                                <button type="button" onClick={() => togglePassword('confirm')} className="absolute right-3 top-1/2 transform -translate-y-1/ text-gray-500 hover:text-gray-700 transition-colors">
                                    {showConfirmPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-pemex-green text-white font-bold py-3 rounded-lg transform transition-all duration-300 hover:bg-pemex-dark-green hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pemex-green active:scale-95">Actualizar Contraseña</button>
                        <button type="button"onClick={() => navigate('/login')}className="w-full mt-4 text-pemex-green font-semibold hover:text-pemex-dark-green transition-colors">Volver al inicio de sesión</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Recup;