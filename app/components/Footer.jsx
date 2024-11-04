import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">Subscribe to Newsletter</h2>
          <p className="text-gray-600 mb-6">
            Enter your email address to register to our newsletter subscription delivered on regular basis!
          </p>
          <form className="flex justify-center">
            <input
              type="email"
              placeholder="Email Address"
              className="px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-r-lg hover:bg-green-600 focus:outline-none"
            >
              Subscribe
            </button>
          </form>
        </div>
        <div className="flex justify-center space-x-4 mt-6">
          <a href="#" className="text-gray-500 hover:text-indigo-600">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-500 hover:text-indigo-600">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-500 hover:text-indigo-600">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="#" className="text-gray-500 hover:text-indigo-600">
            <i className="fab fa-google"></i>
          </a>
        </div>
        <div className="text-center text-gray-500 mt-6">
          <p>Copyright &copy; 2024 multilanguage news article website</p>
          <p>Powered by next js and Strapi</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
