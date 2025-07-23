export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col justify-center lg:flex-row bg-gradient-to-br from-secondary-3 to-primary-3 select-none">
            {/* Left side - Not Found Message */}
            <div className="w-full lg:w-2/5 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
                <div className="w-full max-w-sm">
                    {/* Logo */}
                    <div className="mb-6 lg:mb-8">
                        <img src="/baac-logo.png" alt="BAAC Logo" className="h-10 sm:h-12" />
                    </div>
                    <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl p-6 sm:p-8 text-center">
                        <img src="/not-found.svg" alt="" />
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h2>
                        <p className="text-gray-500 mb-6">Sorry, the page you are looking for does not exist.</p>
                        <a
                            href="/auth/login"
                            className="inline-block bg-primary-1 hover:bg-primary-2 text-white font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                        >
                            Back to Login
                        </a>
                    </div>
                    <div className="flex justify-end mt-6 lg:mt-8">
                        <img src="/by-rsm-logo.svg" alt="by RSM" className="h-3 sm:h-4" />
                    </div>
                </div>
            </div>

            {/* Right side - Illustration (tidak diubah) */}
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