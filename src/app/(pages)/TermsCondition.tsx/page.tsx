"use client";
import React from "react";

export default function TermsAndConditions() {
  return (
    <section className="bg-gray-900 text-gray-300 min-h-screen py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center text-emerald-400">
          Terms & Conditions
        </h1>

        <p className="mb-6 text-lg text-gray-400">
          Welcome to <span className="text-emerald-400 font-medium">DrConnect</span>. By accessing or using our platform, you agree to be bound by the following terms and conditions. Please read them carefully.
        </p>

        {/* Section 1 */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">1. Use of Our Services</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>Our platform provides access to medical consultations, health content, and appointment scheduling services.</li>
            <li>Users must be at least 18 years old or have consent from a legal guardian.</li>
            <li>Do not use DrConnect for medical emergencies. In such cases, please contact local emergency services.</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">2. User Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>Provide accurate and complete information during registration and while using the platform.</li>
            <li>Respect all healthcare professionals and refrain from abusive behavior or language.</li>
            <li>Keep login credentials confidential and secure. You are responsible for all activities under your account.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">3. Privacy & Data Protection</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>We are committed to protecting your personal health data in compliance with applicable laws.</li>
            <li>All consultations are encrypted and private between you and the doctor.</li>
            <li>For more information, please refer to our separate <span className="text-emerald-400 underline">Privacy Policy</span>.</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">4. Medical Disclaimer</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>DrConnect is not a replacement for a physical medical diagnosis, treatment, or emergency care.</li>
            <li>All content provided is for informational purposes only and should not be considered medical advice.</li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">5. Payment & Refunds</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>Fees for consultations or premium services will be clearly displayed before confirmation.</li>
            <li>All payments are processed securely via third-party payment gateways.</li>
            <li>Refunds may be issued only in specific cases such as technical failure or non-delivery of service.</li>
          </ul>
        </div>

        {/* Section 6 */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">6. Modification of Terms</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>We reserve the right to update these Terms and Conditions at any time without prior notice.</li>
            <li>Continued use of the platform after changes implies acceptance of the new terms.</li>
          </ul>
        </div>

        {/* Section 7 */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">7. Termination</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>We may suspend or terminate your access to DrConnect in case of policy violations or misuse.</li>
            <li>Termination may result in deletion of your data and access to past records.</li>
          </ul>
        </div>

        {/* Section 8 */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">8. Contact Us</h2>
          <p className="text-gray-400">
            If you have any questions about these Terms & Conditions, feel free to contact us at:  
            <span className="text-white font-medium"> support@drconnect.com</span>
          </p>
        </div>

        <p className="text-sm text-center text-gray-500 mt-12">
          Last updated: August 1, 2025
        </p>
      </div>
    </section>
  );
}
