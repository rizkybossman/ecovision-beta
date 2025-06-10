import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Dicksa Ananda Christian Tue",
    role: "Machine Learning",
    description: "Proud but never satisfied.",
    image: "/images/Dicksa.jpeg",
    color: "bg-blue-500",
    linkedin: "https://linkedin.com/in/dicksa ",
    animation: {
      rotate: 5,
      transition: { type: "spring", stiffness: 300 },
    },
  },
  {
    name: "Moh Rifqi Abdan",
    role: "Machine Learning",
    description:
      "I love learning new things, especially those that can help solve problems around us.",
    image: "/images/Rifqi.jpg",
    color: "bg-green-500",
    linkedin: "https://www.linkedin.com/in/moh-rifqi-abdan-04b52a30a/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    animation: {
      y: -10,
      transition: { type: "spring", bounce: 0.4 },
    },
  },
  {
    name: "Nur Fadilah Zulfi",
    role: "Machine Learning",
    description:
      "Of all the limitations you have, hopefully you are not included in the group of people who are limited in dreaming and making it happen.",
    image: "/images/Zulfi.jpeg",
    color: "bg-yellow-500",
    linkedin: "https://www.linkedin.com/in/nur-fadilah-zulfi-43a966257",
    animation: {
      x: 10,
      transition: { type: "spring", damping: 10 },
    },
  },
  {
    name: "Gilber Juan Doli Manulang		",
    role: "Frontend & Backend Developer",
    description:
      "Gone. Reduce to Atom.",
    image: "/images/confused.png",
    color: "bg-purple-500",
    linkedin: "https://linkedin.com/in/sarahlee",
    animation: {
      rotate: 10,
      scale: 1.05,
      transition: { type: "spring", stiffness: 200 },
    },
  },
  {
    name: "Rizky Fauzi",
    role: "Frontend & Backend Developer",
    description: "I`m just a Regular Everyday Normal Dude.",
    image: "/images/Rizky.JPG",
    color: "bg-red-500",
    linkedin: "https://www.linkedin.com/in/rizkyfauzi-r8055f",
    animation: {
      scale: 1.1,
      transition: { type: "spring" },
    },
  },
];

const Team = () => {
  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-primary-800 mb-12">
          The Developers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="text-center cursor-pointer"
              whileHover={member.animation}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 1 }}
            >
              <div className="relative w-40 h-40 mx-auto mb-4">
                <motion.div
                  className={`absolute inset-0 rounded-full border-4 ${member.color} opacity-0`}
                  whileHover={{
                    opacity: 0.3,
                    scale: 1.1,
                    transition: { duration: 0.3 },
                  }}
                />
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover border-4 border-white relative z-10 shadow-lg"
                />
              </div>

              <div className="px-2">
                <h3 className="text-xl font-semibold text-primary-700 mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600 font-medium mb-2">{member.role}</p>

                <div className="relative mb-3 h-1">
                  <div className="absolute inset-0 flex items-center">
                    <div
                      className={`w-full h-0.5 ${member.color} bg-opacity-30`}
                    ></div>
                  </div>
                  <motion.div
                    className={`absolute top-0 left-0 h-full ${member.color} w-0`}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                <p className="text-gray-600 text-sm min-h-[60px]">
                  {member.description}
                </p>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <motion.button
                    className={`mt-3 px-4 py-1 rounded-full text-sm font-medium ${
                      member.color
                    } bg-opacity-10 ${member.color.replace(
                      "bg",
                      "text"
                    )}-700 flex items-center gap-1`}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: `${member.color.replace("bg-", "")}33`,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    View Profile
                  </motion.button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
