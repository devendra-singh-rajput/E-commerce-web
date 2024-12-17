import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-slate-800 text-slate-200 py-10'>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Us Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">About Us</h2>
            <p className="text-sm text-slate-400">
              Welcome to our e-commerce store! We offer a wide variety of high-quality products to meet all your needs.
            </p>
            <p className="text-sm text-slate-400 mt-2">
              Our mission is to provide exceptional customer service and ensure your satisfaction with every purchase.
            </p>
          </div>

          {/* Customer Service Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Customer Service</h2>
            <ul className="text-sm text-slate-400 space-y-2">
              <li><a href="/help" className="hover:text-slate-200">Help & FAQs</a></li>
              <li><a href="/returns" className="hover:text-slate-200">Returns & Refunds</a></li>
              <li><a href="/shipping" className="hover:text-slate-200">Shipping Information</a></li>
              <li><a href="/contact" className="hover:text-slate-200">Contact Us</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100027148873883" aria-label="Facebook" target="_blank" rel="noreferrer" className="hover:text-slate-400">
                <FaFacebookF size={24} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noreferrer" className="hover:text-slate-400">
                <FaTwitter size={24} />
              </a>
              <a href="https://www.instagram.com/21___d.d.banna___/" aria-label="Instagram" target="_blank" rel="noreferrer" className="hover:text-slate-400">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.linkedin.com/in/devendra-singh-rajput/" aria-label="LinkedIn" target="_blank" rel="noreferrer" className="hover:text-slate-400">
                <FaLinkedinIn size={24} />
              </a>
            </div>
            <p className="text-sm text-slate-400 mt-4">Connect with us on social media for the latest updates and promotions.</p>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h2 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-sm text-slate-400 mb-4">Get the latest updates on new products and upcoming sales.</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="p-2 rounded bg-slate-700 text-slate-200 border border-slate-600 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-8 pt-4 text-center text-sm text-slate-400">
          <p>&copy; 2024 Devendra Singh Rajput. All rights reserved.</p>
          <p>Designed by <span className="font-bold" title="D.D. Banna">Devendra Singh Rajput</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
