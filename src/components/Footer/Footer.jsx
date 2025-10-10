import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        {/* ✅ Top Section */}
        <div className="md:flex md:justify-between md:items-start text-center md:text-left">
          
          {/* Logo Section */}
          <div className="mb-6 md:mb-0 flex justify-center md:justify-start">
            <Link to="/" className="flex items-center justify-center">
              <img
                src="logo.png"
                className="h-36 w-36"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 sm:gap-6 gap-8 sm:grid-cols-3 justify-items-center md:justify-items-start w-full md:w-auto">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Resources</h2>
              <ul className="text-gray-500 font-medium space-y-2">
                <li>
                  <Link to="/" className="hover:text-red-700">Home</Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-red-700">About</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-red-700">Contact</Link>
                </li>
                <li>
                  <Link to="/finddonor" className="hover:text-red-700">Donors</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Follow us</h2>
              <ul className="text-gray-500 font-medium space-y-2">
                <li>
                  <a href="https://github.com/ayush-gaur29" target="_blank" rel="noreferrer" className="hover:text-red-700">Github</a>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-700">Discord</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
              <ul className="text-gray-500 font-medium space-y-2">
                <li>
                  <Link to="#" className="hover:text-red-700">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-red-700">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ✅ Divider */}
        <hr className="my-6 border-gray-200" />

        {/* ✅ Bottom Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
          <span className="text-sm text-gray-500">
            © {new Date().getFullYear()} <span className="font-semibold text-red-700">Ayush Gaur</span>. All Rights Reserved.
          </span>

          {/* Social Icons */}
          <div className="flex justify-center sm:justify-end mt-4 sm:mt-0 space-x-5 text-gray-500">
            
            <a href="https://github.com/ayush-gaur29" className="hover:text-red-700"></a>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
