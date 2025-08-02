import React from 'react';
import {
  FaHeartbeat,
  FaUserMd,
  FaStethoscope,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#000000e8] to-black container  text-gray-300 px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Services */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li><FaHeartbeat className="inline mr-2 text-pink-400" /> Video Consultation</li>
            <li><FaUserMd className="inline mr-2 text-green-400" /> Book Appointments</li>
            <li><FaStethoscope className="inline mr-2 text-blue-400" /> Health Checkups</li>
            <li><FaHeartbeat className="inline mr-2 text-red-400" /> Emergency Support</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            <li><a href="/faq" className="hover:text-white transition">FAQs</a></li>
            <li><a href="/privacy-policy" className="hover:text-white transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li><FaPhone className="inline mr-2 text-green-400" /> +91 12345 67890</li>
            <li><FaEnvelope className="inline mr-2 text-yellow-400" /> support@healthcare.com</li>
            <li><FaMapMarkerAlt className="inline mr-2 text-red-400" /> Udaipur, Rajasthan ,india</li>
          </ul>
        </div>

        {/* CTA */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Stay Healthy</h3>
          <p className="text-sm text-gray-400">
            Your health is our priority. Book consultations, talk to doctors, and get care from anywhere.
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-6">
        Made with <span className="text-red-500">❤️</span> by Shoaib and Vishal
      </div>
    </footer>
  );
};

export default Footer;
