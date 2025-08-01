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
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
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
    <footer className="container bg-gradient-to-b from-[#08231B] to-[#081511] text-white">
      <div className=" mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <svg
                className="w-10 h-10 mr-2 text-[#00C896]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              <span className="text-2xl font-bold">Dr.Connect</span>
            </div>
            <p className="text-gray-400">
              Connecting patients with trusted healthcare professionals since 2020. Our mission is to make quality healthcare accessible to everyone.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="w-5 h-5 mr-2 mt-1 text-[#00C896]">
                    {item.type === "phone" && <FaPhone />}
                    {item.type === "email" && <FaEnvelope />}
                    {item.type === "address" && <FaMapMarkerAlt />}
                  </span>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white text-sm transition"
                    >
                      {item.value}
                    </Link>
                  ) : (
                    <span className="text-gray-400 text-sm">
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-3">FOLLOW US</h3>
              <div className="flex space-x-4">
                {socialMedia.map((social) => {
                  const Icon =
                    social.icon === "facebook"
                      ? FaFacebook
                      : social.icon === "twitter"
                      ? FaTwitter
                      : social.icon === "instagram"
                      ? FaInstagram
                      : social.icon === "linkedin"
                      ? FaLinkedin
                      : FaYoutube;

                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="text-gray-400 hover:text-[#00C896] transition"
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center text-gray-400 hover:text-white transition"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="flex items-center text-gray-400 hover:text-white transition"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Health Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Get the latest health tips and updates to your inbox.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-md text-black focus:outline-none"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#00C896] hover:bg-[#00b18a] text-white font-medium py-2 px-4 rounded-md transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#00C896] mt-12 pt-8 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>&copy; {currentYear} Dr.Connect. All rights reserved.</div>
            <div className="flex flex-wrap gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-white transition"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Disclaimers */}
          <div className="mt-6 space-y-2 text-xs">
            <p>
              <strong className="text-white">Emergency Notice:</strong> Dr.Connect is not for medical emergencies. Call 911 or local emergency services.
            </p>
            <p>
              <strong className="text-white">Medical Disclaimer:</strong> This site is for informational purposes only and not a substitute for professional medical advice.
            </p>
            <p className="pt-2 border-t border-[#00C896]">
              Dr.Connect is HIPAA compliant and prioritizes patient data privacy.
            </p>
          </div>

          {/* Badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-white/10 p-2 rounded">
              <FaShieldAlt className="w-5 h-5 mr-2 text-[#00C896]" />
              <span className="text-xs">HIPAA Compliant</span>
            </div>
            <div className="flex items-center bg-white/10 p-2 rounded">
              <FaLock className="w-5 h-5 mr-2 text-[#00C896]" />
              <span className="text-xs">Secure Platform</span>
            </div>
            <div className="flex items-center bg-white/10 p-2 rounded">
              <FaCertificate className="w-5 h-5 mr-2 text-[#00C896]" />
              <span className="text-xs">Board Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
