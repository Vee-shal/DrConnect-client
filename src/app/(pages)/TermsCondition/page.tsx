"use client";
import React from "react";

export default function TermsAndConditions() {
  return (
    <section className="bg-[#0a0f0d] text-gray-300 min-h-screen py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">
        {/* Page Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-emerald-400">
          Terms & Conditions
        </h1>

        {/* Intro Paragraph */}
        <p className="mb-10 text-base md:text-lg leading-relaxed text-gray-400 text-center">
          Welcome to <span className="text-emerald-400 font-semibold">DrConnect</span>. By accessing or using our platform,
          you agree to be bound by the following terms and conditions. Please read them carefully to ensure a safe and informed experience.
        </p>

        {/* Sections */}
        {[
          {
            title: "1. Use of Our Services",
            points: [
              "Our platform provides access to medical consultations, health content, and appointment scheduling services.",
              "Users must be at least 18 years old or have consent from a legal guardian.",
              "Do not use DrConnect for medical emergencies. In such cases, please contact local emergency services.",
            ],
          },
          {
            title: "2. User Responsibilities",
            points: [
              "Provide accurate and complete information during registration and while using the platform.",
              "Respect all healthcare professionals and refrain from abusive behavior or language.",
              "Keep login credentials confidential and secure. You are responsible for all activities under your account.",
            ],
          },
          {
            title: "3. Privacy & Data Protection",
            points: [
              "We are committed to protecting your personal health data in compliance with applicable laws.",
              "All consultations are encrypted and private between you and the doctor.",
              'For more information, please refer to our separate <a href="#" class="text-emerald-400 underline hover:text-emerald-300">Privacy Policy</a>.',
            ],
          },
          {
            title: "4. Medical Disclaimer",
            points: [
              "DrConnect is not a replacement for a physical medical diagnosis, treatment, or emergency care.",
              "All content provided is for informational purposes only and should not be considered medical advice.",
            ],
          },
          {
            title: "5. Payment & Refunds",
            points: [
              "Fees for consultations or premium services will be clearly displayed before confirmation.",
              "All payments are processed securely via third-party payment gateways.",
              "Refunds may be issued only in specific cases such as technical failure or non-delivery of service.",
            ],
          },
          {
            title: "6. Modification of Terms",
            points: [
              "We reserve the right to update these Terms and Conditions at any time without prior notice.",
              "Continued use of the platform after changes implies acceptance of the new terms.",
            ],
          },
          {
            title: "7. Termination",
            points: [
              "We may suspend or terminate your access to DrConnect in case of policy violations or misuse.",
              "Termination may result in deletion of your data and access to past records.",
            ],
          },
        ].map((section, idx) => (
          <div key={idx} className="mb-10">
            <h2 className="text-2xl font-semibold text-emerald-300 mb-4">{section.title}</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              {section.points.map((point, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: point }}></li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">8. Contact Us</h2>
          <p className="text-gray-400 leading-relaxed">
            If you have any questions about these Terms & Conditions, feel free to reach out at{" "}
            <span className="text-white font-medium">support@drconnect.com</span>.
          </p>
        </div>

        {/* Footer Note */}
        <p className="text-sm text-center text-gray-500">
          Last updated: August 1, 2025
        </p>
      </div>
    </section>
  );
}
