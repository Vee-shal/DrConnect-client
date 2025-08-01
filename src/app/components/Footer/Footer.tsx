import Link from "next/link";

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaShieldAlt,
  FaLock,
  FaCertificate,
} from "react-icons/fa";
import {
  quickLinks,
  services,
  socialMedia,
  legalLinks,
  contactInfo,
} from "../../utils/data";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[var(--primary)] text-white"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: About & Logo */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <svg
                className="w-10 h-10 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                ></path>
              </svg>
              <span className="text-2xl font-bold">Dr.Connect</span>
            </div>
            <p className="text-[var(--color-bg-alt)] mb-4">
              Connecting patients with trusted healthcare professionals since
              2020. Our mission is to make quality healthcare accessible to
              everyone.
            </p>

            {/* Contact Information */}
            <div className="mt-6 space-y-2">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start">
                  {item.type === "phone" && (
                    <svg
                      className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  )}
                  {item.type === "email" && (
                    <svg
                      className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  )}
                  {item.type === "address" && (
                    <svg
                      className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  )}
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-[var(--color-bg-alt)] hover:text-white transition text-sm"
                    >
                      {item.value}
                    </Link>
                  ) : (
                    <span className="text-[var(--color-bg-alt)] text-sm">
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-3">FOLLOW US</h3>
              <div className="flex space-x-4">
                {socialMedia.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    aria-label={`${social.name} (opens in new tab)`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-bg-alt)] hover:text-white transition"
                  >
                    <span className="sr-only">{social.name}</span>
                    {social.icon === "facebook" && (
                      <FaFacebook className="w-5 h-5" />
                    )}
                    {social.icon === "twitter" && (
                      <FaTwitter className="w-5 h-5" />
                    )}
                    {social.icon === "instagram" && (
                      <FaInstagram className="w-5 h-5" />
                    )}
                    {social.icon === "linkedin" && (
                      <FaLinkedin className="w-5 h-5" />
                    )}
                    {social.icon === "youtube" && (
                      <FaYoutube className="w-5 h-5" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-bg-alt)] hover:text-white transition flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-[var(--color-bg-alt)] hover:text-white transition flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter  */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Health Newsletter</h3>
            <p className="text-[var(--color-bg-alt)] mb-4">
              Get the latest health tips, news, and updates directly to your
              inbox.
            </p>
            <form className="space-y-3">
              <div>
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded-md text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[var(--color-accent)] hover:bg-[var(--secondary)] text-white font-medium py-2 px-4 rounded-md transition flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[var(--color-border)] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-[var(--color-bg-alt)] text-sm mb-4 md:mb-0">
              &copy; {currentYear} Dr.Connect. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[var(--color-bg-alt)] hover:text-white text-sm transition"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Medical Disclaimers */}
          <div className="mt-6 text-[var(--color-bg-alt)] text-xs space-y-2">
            <p>
              <strong className="font-semibold">Emergency Notice:</strong>{" "}
              Dr.Connect is not intended for medical emergencies. In case of
              emergency, please call 911 or your local emergency number
              immediately.
            </p>
            <p>
              <strong className="font-semibold">Medical Disclaimer:</strong> The
              content on this website is for informational purposes only and is
              not a substitute for professional medical advice, diagnosis, or
              treatment. Always seek the advice of your physician or other
              qualified health provider with any questions you may have
              regarding a medical condition.
            </p>
            <p className="pt-2 border-t border-[var(--color-border)]">
              Dr.Connect is HIPAA compliant and adheres to the highest standards
              of patient privacy and data security.
            </p>
          </div>

          {/* Accreditation Badges */}

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-white/10 p-2 rounded">
              <FaShieldAlt className="w-6 h-6 mr-2" />
              <span className="text-xs">HIPAA Compliant</span>
            </div>
            <div className="flex items-center bg-white/10 p-2 rounded">
              <FaLock className="w-6 h-6 mr-2" />
              <span className="text-xs">Secure Platform</span>
            </div>
            <div className="flex items-center bg-white/10 p-2 rounded">
              <FaCertificate className="w-6 h-6 mr-2" />
              <span className="text-xs">Board Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
