import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex bg-[#003a1d] text-[#e1f1e7] h-80 items-end justify-center">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#e1f1e7]">MedVault</h3>
            <p className="text-[#b4dcc3] mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              <a href="#" className="text-[#b4dcc3] hover:text-[#e1f1e7] transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="#" className="text-[#b4dcc3] hover:text-[#e1f1e7] transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.642-11.733 4.5 4.5 0 00-.047-1.012c.996-.72 1.86-1.618 2.544-2.644z"/>
                </svg>
              </a>
              <a href="#" className="text-[#b4dcc3] hover:text-[#e1f1e7] transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.22 0 22.225 0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#e1f1e7]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#b4dcc3] hover:text-[#e1f1e7] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-[#b4dcc3] hover:text-[#e1f1e7] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-[#b4dcc3] hover:text-[#e1f1e7] transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#" className="text-[#b4dcc3] hover:text-[#e1f1e7] transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#e1f1e7]">Contact Us</h3>
            <ul className="space-y-2 text-[#b4dcc3]">
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>123 Medvault Street, City, State 12345</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>info@medvault.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#e1f1e7]">Newsletter</h3>
            <p className="text-[#b4dcc3] mb-4">
              Subscribe to get updates on our latest offers!
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 bg-[#095c34] text-[#e1f1e7] placeholder-[#7eaa8e] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b4dcc3] transition-all"
              />
              <br /><br />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#e1f1e7] text-[#063d23] font-semibold rounded-lg hover:bg-[#b4dcc3] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
<br />
        {/* Bottom Bar */}
        <div className="border-t border-[#095c34] mt-8 pt-8 text-center text-[#b4dcc3]">
          <p>&copy; {currentYear} MedVault All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="text-[#7eaa8e] hover:text-[#e1f1e7] transition-colors text-sm">
              Privacy Policy
            </a>
            <span className="text-[#7eaa8e]">|</span>
            <a href="#" className="text-[#7eaa8e] hover:text-[#e1f1e7] transition-colors text-sm">
              Terms of Service
            </a>
            <span className="text-[#7eaa8e]">|</span>
            <a href="#" className="text-[#7eaa8e] hover:text-[#e1f1e7] transition-colors text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;