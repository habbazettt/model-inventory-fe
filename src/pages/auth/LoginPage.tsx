import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const handleLogin = () => {
        console.log('Login attempt:', { username, password });
        navigate('/developer/home');
    };

    const handleForgotPassword = () => {
        console.log('Change login form into forgot password form (input email, if username & email founded, send an email with link to redirect the to reset password form)', { email });
    };

    return (
        <div className="min-h-screen flex flex-col justify-center lg:flex-row bg-gradient-to-br from-[#F0F0F0] to-[#AEC8A4] select-none">
            {/* Left side - Login Form / Forgot Password Form */}
            <div className="w-full lg:w-2/5 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
                <div className="w-full max-w-sm">
                    {/* Logo */}
                    <div className="mb-6 lg:mb-8">
                        <img src="/baac-logo.png" alt="BAAC Logo" className="h-10 sm:h-12" />
                    </div>

                    {!showForgotPassword ? (
                        <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl p-6 sm:p-8">
                            {/* Login Form*/}
                            <div className="text-center mb-6 lg:mb-8">
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 lg:mb-3">Model Inventory</h1>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 lg:mb-4">Tool</h1>
                                <p className="text-gray-500 text-sm">Please enter your username and password</p>
                            </div>

                            <div className="space-y-4 lg:space-y-5">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full px-4 lg:px-5 py-3 lg:py-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-1 focus:border-transparent text-gray-900 placeholder-gray-400 bg-gray-50"
                                    />
                                </div>

                                <div>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 lg:px-5 py-3 lg:py-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-1 focus:border-transparent text-gray-900 placeholder-gray-400 bg-gray-50"
                                    />
                                </div>

                                <div className="text-right py-1">
                                    <span
                                        className="text-gray-400 hover:text-gray-600 text-sm cursor-pointer"
                                        onClick={() => setShowForgotPassword(true)}
                                    >
                                        Forget Password
                                    </span>
                                </div>

                                <button
                                    onClick={handleLogin}
                                    className="w-full bg-primary-1 hover:bg-primary-2 text-white font-semibold py-3 lg:py-4 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                                >
                                    Login
                                </button>
                            </div>
                            <div className="flex justify-end mt-6 lg:mt-8">
                                <img src="/by-rsm-logo.svg" alt="by RSM" className="h-3 sm:h-4" />
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl p-6 sm:p-8">
                            <div className="text-center mb-6 lg:mb-8">
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 lg:mb-3">Model Inventory</h1>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 lg:mb-4">Tool</h1>
                                <p className="text-gray-500 text-sm">Please enter your email to reset your password</p>
                            </div>

                            {/* Form Fields and Primary Button */}
                            <div className="space-y-4 lg:space-y-5">
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 lg:px-5 py-3 lg:py-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-1 focus:border-transparent text-gray-900 placeholder-gray-400 bg-gray-50"
                                    />
                                </div>

                                <button
                                    onClick={handleForgotPassword}
                                    className="w-full bg-primary-1 hover:bg-primary-2 text-white font-semibold py-3 lg:py-4 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                                >
                                    Reset Password
                                </button>
                            </div>

                            {/* Secondary "Back" Action */}
                            <div className="text-center mt-6">
                                <button
                                    onClick={() => setShowForgotPassword(false)}
                                    className="text-sm font-medium text-gray-600 hover:text-primary-1 focus:outline-none transition-colors duration-300"
                                >
                                    Back to Login
                                </button>
                            </div>

                            <div className="flex justify-end mt-8 lg:mt-10">
                                <img src="/by-rsm-logo.svg" alt="by RSM" className="h-3 sm:h-4" />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right side - Illustration */}
            <div className="hidden lg:block w-full lg:w-3/5 relative min-h-64 lg:h-screen overflow-hidden">
                <div className="absolute inset-0"></div>
                <div className="relative h-full flex items-center justify-center p-4 lg:p-8">
                    <div className="w-full h-full flex items-center justify-center">
                        <img
                            src="/login-illustration.svg"
                            alt="Agricultural illustration showing farmers working in fields"
                            className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;