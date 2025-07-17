const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-gray-100 border-t border-gray-200 py-4 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    &copy; {currentYear} Bank for Agriculture and Agricultural Cooperatives. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;

