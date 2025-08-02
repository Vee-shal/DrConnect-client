"use client";

import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUser } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="bg-[#0a0a0a] text-white py-14 px-4 sm:px-6 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Get in Touch</h2>
          <p className="text-gray-400">
            We’d love to hear from you. Whether you have a question, feedback,
            or need assistance — we’re here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-[#111]/60 border border-[#08392e] rounded-2xl p-8 backdrop-blur-md">
            <h3 className="text-2xl font-semibold mb-6 text-[#00c37a]">
              Send Us a Message
            </h3>
            <form className="space-y-6 text-sm">
              {/* Name */}
              <div>
                <label className="block mb-1 text-gray-300">Full Name</label>
                <div className="flex items-center bg-[#1a1a1a] border border-[#08392e] px-3 py-2 rounded-md">
                  <FaUser className="text-gray-500 mr-3" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="bg-transparent outline-none text-white w-full placeholder-gray-500"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 text-gray-300">Email</label>
                <div className="flex items-center bg-[#1a1a1a] border border-[#08392e] px-3 py-2 rounded-md">
                  <FaEnvelope className="text-gray-500 mr-3" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="bg-transparent outline-none text-white w-full placeholder-gray-500"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block mb-1 text-gray-300">Message</label>
                <textarea
                  placeholder="Write your message here..."
                  rows={5}
                  className="w-full bg-[#1a1a1a] border border-[#08392e] text-white placeholder-gray-500 px-4 py-3 rounded-md resize-none"
                  required
                ></textarea>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-[#00c37a] text-black font-semibold py-2.5 rounded-md hover:bg-[#00aa66] transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info + Map */}
          <div className="flex flex-col justify-between space-y-8">
            <div className="bg-[#111]/60 border border-[#08392e] rounded-2xl p-6 backdrop-blur-md">
              <h3 className="text-2xl font-semibold text-[#00c37a] mb-4">
                Contact Information
              </h3>
              <ul className="space-y-4 text-gray-300 text-sm">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 text-[#00c37a]" />
                  <span>
                    DrConnect HQ, Tech Tower, Udaipur, Rajasthan - 313001
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FaPhoneAlt className="mt-1 text-[#00c37a]" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaEnvelope className="mt-1 text-[#00c37a]" />
                  <span>support@drconnect.in</span>
                </li>
              </ul>
            </div>

            {/* Placeholder Map */}
            <div className="relative rounded-2xl overflow-hidden border border-[#08392e]">
              <iframe
                src="https://maps.google.com/maps?q=udaipur%20city&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="240"
                className="border-none"
                loading="lazy"
              ></iframe>
              <div className="absolute inset-0 bg-black/40 pointer-events-none rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
