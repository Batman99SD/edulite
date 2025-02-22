import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faShieldAlt,
  faFileContract,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Brand Section */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">CookMeThis</h3>
          <p className="text-sm">
            Discover, create, and enjoy your favorite recipes with CookMeThis.
          </p>
          <p className="text-sm mt-4">
            © 2025 CookMeThis. All rights reserved.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#about"
                className="flex items-center space-x-2 hover:text-white transition"
              >
                {/* <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7v7c0 5.523 4.477 10 10 10s10-4.477 10-10V7L12 2zm0 2.18l7 3.236v6.79c0 3.859-3.141 7-7 7s-7-3.141-7-7v-6.79l7-3.236z" />
                </svg> */}
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="h-5 w-5 text-gray-400"
                />
                <span>About Us</span>
              </a>
            </li>
            <li>
              <a
                href="#privacy"
                className="flex items-center space-x-2 hover:text-white transition"
              >
                {/* <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1 17.938V19h-1v-.902c0-.535.37-.926.826-1.072a1.14 1.14 0 011.148.325l.742.743a1 1 0 001.414 0l.742-.742a1.147 1.147 0 011.148-.325c.457.146.827.537.827 1.073V19h-1v.938c-4.978-.222-7-3.045-7-5.938h2c0 2.084 2.239 3.938 5 3.938s5-1.854 5-3.938h2c0 2.893-2.022 5.716-7 5.938z" />
                </svg> */}
                <FontAwesomeIcon
                  icon={faShieldAlt}
                  className="h-5 w-5 text-gray-400"
                />
                <span>Privacy Policy</span>
              </a>
            </li>
            <li>
              <a
                href="#terms"
                className="flex items-center space-x-2 hover:text-white transition"
              >
                {/* <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.485 2 2 6.486 2 12s4.485 10 10 10 10-4.486 10-10S17.515 2 12 2zm-1 15h-1v-6h2v5h1v-6h2v6h1v-8h-2V7H7v8h2v2zm4-10H9V5h6v2z" />
                </svg> */}
                <FontAwesomeIcon
                  icon={faFileContract}
                  className="h-5 w-5 text-gray-400"
                />
                <span>Terms of Service</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Social & Newsletter Section */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Stay Connected
          </h4>
          <p className="text-sm mb-4">
            Follow us on social media and subscribe to our newsletter.
          </p>
          <div className="flex space-x-4 mb-4">
            <a
              href="#facebook"
              className="text-gray-400 hover:text-white transition"
            >
              {/* <svg
                className="h-6 w-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0H1.325C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.1 2.794.143v3.24h-1.918c-1.505 0-1.796.715-1.796 1.763v2.311h3.587l-.467 3.622h-3.12V24h6.117c.732 0 1.325-.592 1.325-1.324V1.324C24 .592 23.408 0 22.675 0z" />
              </svg> */}
              <FontAwesomeIcon icon={faFacebook} className="h-6 w-6" />
            </a>
            <a
              href="#twitter"
              className="text-gray-400 hover:text-white transition"
            >
              {/* <svg
                className="h-6 w-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.723c-.957.568-2.015.982-3.127 1.2a4.92 4.92 0 00-8.384 4.482A13.978 13.978 0 011.671 3.15a4.922 4.922 0 001.523 6.573A4.903 4.903 0 01.96 9.713v.062a4.922 4.922 0 003.95 4.827 4.902 4.902 0 01-2.212.085 4.923 4.923 0 004.6 3.417A9.866 9.866 0 010 21.542 13.94 13.94 0 007.548 24c9.142 0 14.307-7.721 14.307-14.42 0-.22-.004-.437-.015-.653A10.273 10.273 0 0024 4.557z" />
              </svg> */}
              <FontAwesomeIcon icon={faTwitter} className="h-6 w-6" />
            </a>
            <a
              href="#instagram"
              className="text-gray-400 hover:text-white transition"
            >
              {/* <svg
                className="h-6 w-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.335 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.335 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.335-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.335-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163m0-2.163..." />
              </svg> */}
              <FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
            </a>
          </div>

          <form>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 bg-gray-700 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="mt-2 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
