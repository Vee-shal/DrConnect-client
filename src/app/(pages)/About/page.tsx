"use client";
import React from "react";
import Image from "next/image";
import {
  FaClinicMedical,
  FaUserMd,
  FaHeartbeat,
  FaAward,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { GiHealthNormal } from "react-icons/gi";
import { MdHealthAndSafety } from "react-icons/md";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Dr. Michael Johnson",
      role: "Chief Medical Officer",
      specialty: "Internal Medicine",
      experience: "15 years",
      image: "/images/doctor1.jpg",
    },
    {
      name: "Dr. Sarah Chen",
      role: "Pediatric Specialist",
      specialty: "Pediatrics",
      experience: "12 years",
      image: "/images/doctor2.jpg",
    },
    {
      name: "Dr. Robert Williams",
      role: "Cardiology Director",
      specialty: "Cardiology",
      experience: "14 years",
      image: "/images/doctor3.jpg",
    },
    {
      name: "Dr. Amanda Rodriguez",
      role: "Neurology Specialist",
      specialty: "Neurology",
      experience: "10 years",
      image: "/images/doctor4.jpg",
    },
  ];

  const awards = [
    {
      year: "2024",
      title: "Emerging Practice Excellence",
      organization: "National Healthcare Association",
      description:
        "Recognized for innovative patient care models in our first year",
    },
    {
      year: "2023",
      title: "New Practice Quality Award",
      organization: "State Medical Board",
      description: "Achieved exceptional standards in our launch year",
    },
  ];

  const values = [
    {
      icon: <FaHeartbeat className="text-4xl text-emerald-500" />,
      title: "Patient-Centered Care",
      description:
        "Every decision prioritizes our patients' well-being with personalized treatment plans",
    },
    {
      icon: <GiHealthNormal className="text-4xl text-emerald-500" />,
      title: "Clinical Excellence",
      description:
        "Cutting-edge medicine combined with rigorous quality standards",
    },
    {
      icon: <MdHealthAndSafety className="text-4xl text-emerald-500" />,
      title: "Compassionate Service",
      description:
        "Healing with empathy, respect, and kindness for complete patient care",
    },
  ];

  const facilities = [
    "Modern smart examination rooms with AI-assisted diagnostics",
    "Rapid on-site laboratory with 1-hour result guarantee",
    "Advanced imaging center featuring the latest 3T MRI technology",
    "Comfort-focused recovery suites with ambient healing environments",
  ];

  return (
    <div className="bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About DrConnect
          </h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <Image
              src="/images/medical-team.jpg"
              alt="Our modern medical team"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
            <p className="text-gray-400 mb-4">
              <span className="text-emerald-400 font-semibold">DrConnect</span>{" "}
              was born out of a simple idea — to make quality healthcare
              accessible, reliable, and human for every individual, regardless
              of location or background. We believe no one should wait in
              endless queues, struggle with incomplete information, or feel
              confused about where to find help. That's why we built a platform
              that connects patients directly to experienced, verified doctors
              in just a few clicks.
            </p>
            <p className="text-gray-400 mb-4">
              Since our launch in 2023, DrConnect has focused on creating a
              digital health ecosystem that blends modern technology with deep
              empathy. Our goal is not just to treat symptoms — but to empower
              people to take control of their health with confidence, clarity,
              and care. Whether it's an online consultation, managing your
              reports, or getting AI-based answers to general queries, DrConnect
              is designed to support you at every step.
            </p>
            <p className="text-gray-400 mb-4">
              In just our first year, we’ve helped thousands receive timely,
              expert care — with a 98% patient satisfaction rate and growing
              trust from across India. But this is just the beginning. Our
              vision is to redefine what healthcare means in a connected,
              digital-first India.
            </p>

            <div className="flex items-center gap-2 text-emerald-500 mt-6">
              <FaRegCalendarAlt className="text-xl" />
              <span className="font-medium">
                Redefining healthcare since 2023
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Values */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Our Mission & Values
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              The foundation of our innovative approach to modern healthcare
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-700 p-8 rounded-lg text-center hover:bg-gray-600 transition-colors"
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {value.title}
                </h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Meet Our Expert Team
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Board-certified specialists selected for both clinical excellence
            and patient-centered values
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((doctor, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow hover:bg-gray-700"
            >
              <div className="h-48 relative bg-gray-700">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white">{doctor.name}</h3>
                <p className="text-emerald-500 font-medium mb-2">
                  {doctor.role}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  <FaUserMd className="text-emerald-500" />
                  <span>{doctor.specialty}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FaRegCalendarAlt className="text-emerald-500" />
                  <span>{doctor.experience} experience</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-6">
                Next-Generation Facilities
              </h2>
              <p className="text-gray-400 mb-4">
                Designed in 2023 with patient comfort and clinical excellence in
                mind, our 20,000 sq ft facility features:
              </p>
              <ul className="space-y-3 mb-6">
                {facilities.map((facility, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FaClinicMedical className="text-emerald-500 mt-1" />
                    <span className="text-gray-300">{facility}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-400">
                Our technology-forward facility meets all 2023 accreditation
                standards with regular upgrades to maintain our leading
                position.
              </p>
            </div>
            <div className="lg:w-1/2">
              <Image
                src="/images/medical-facility.jpg"
                alt="Our state-of-the-art medical facility"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Awards and Recognition */}
      <section className="py-16 container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Recent Achievements
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Remarkable recognition for a practice of our age
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-emerald-900 text-emerald-400 rounded-full w-12 h-12 flex items-center justify-center">
                  <FaAward className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{award.title}</h3>
                  <p className="text-sm text-gray-400">{award.organization}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-3">{award.description}</p>
              <p className="text-sm text-emerald-400 font-medium">
                {award.year}
              </p>
            </div>
          ))}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 hover:bg-gray-700 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-emerald-900 text-emerald-400 rounded-full w-12 h-12 flex items-center justify-center">
                <FaHeartbeat className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-white">Patient Satisfaction</h3>
                <p className="text-sm text-gray-400">2023 Patient Surveys</p>
              </div>
            </div>
            <p className="text-gray-300 mb-3">
              Achieved 98% patient satisfaction in our first year of operation
            </p>
            <p className="text-sm text-emerald-400 font-medium">2023</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-800 py-16 border-t border-gray-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Experience Next-Gen Healthcare
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-300">
            Join thousands of patients who've discovered our innovative approach
            to medicine.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
              Book an Appointment
            </button>
            <button className="border-2 border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white font-medium py-3 px-8 rounded-lg transition-colors">
              Virtual Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
