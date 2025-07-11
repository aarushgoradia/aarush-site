import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const workItems = [
  {
    type: "experience",
    title: "Technology Development Intern @ Advanced Micro Foundry",
    timeframe: "June 2025 - Present",
    bullets: [
      "Developed a Python & C++ based program to automate preliminary checks on GDS files for fabrication requirements, transforming a previously manual process and reducing review time from hours to minutes.",
      "Rewrote core GDS analysis routines in C++ to reduce execution time by 15-20x.",
      "Built interactive wafer optimization scripts in Python using Jupyter to maximize die count.",
      "Integrated automated DRC and validation routines into tape-out workflows."
    ],
    tags: ["Python", "C++", "GDS", "Jupyter"]
  },
  {
    type: "experience",
    title: "Head of Embedded Systems @ Princeton Rover Team",
    timeframe: "September 2024 - Present",
    bullets: [
      "Design, prototype, and build a Mars rover to compete in the University Rover Challenge 2025.",
      "Programmed the 915 MHz and 2.4 GHz communications systems between base station and rover.",
      "Designed power delivery and peripheral electronics PCB using KiCAD."
    ],
    tags: ["KiCAD", "Embedded", "Communications"]
  },
  {
    type: "experience",
    title: "Independent Researcher @ Sengupta Lab",
    timeframe: "August 2024 - May 2025",
    bullets: [
      "Simulated transformer layouts in Cadence Virtuoso to generate geometry-performance datasets.",
      "Trained a 3-layer 32-neuron MLP to predict transformer geometry from lumped parameters.",
      "Automated transformer-based LNA synthesis using trained models.",
      "Authored two research papers rated A by faculty reviewers."
    ],
    tags: ["Cadence", "Python", "ML", "RF"],
    links: [
      { text: "Fall 24 Research Paper", href: "/fall24-paper.pdf" },
      { text: "Spring 25 Research Paper", href: "/spring25-paper.pdf" }
    ]
  },
  {
    type: "experience",
    title: "AI Engineering Intern @ AI Seer",
    timeframe: "May 2024 - July 2024",
    bullets: [
      "Built a LangChain Agent pipeline with custom tools to fact-check content, improving accuracy from 85% to 92%.",
      "Developed real-time transcription system with speaker diarization using Whisper.",
      "Presented the platform to Singapore's Senior Minister of State for Communications.",
      "Filed U.S. Patent Application No.: 19/011,265."
    ],
    tags: ["Python", "LLMs", "Whisper", "LangChain"]
  },
  {
    type: "project",
    title: "Memory Pool Allocator",
    timeframe: "July 2025",
    bullets: [
      "Lightweight fixed-size memory pool allocator in C++ with support for placement new and RAII-safe deallocation.",
      "Implemented low-level memory management using preallocated buffer, free list tracking, and type-safe allocation.",
      "Optimized for scenarios requiring fast, repeated allocations of similarly sized objects."
    ],
    tags: ["C++", "Memory Management", "RAII", "Performance"],
    link: "https://github.com/aarushgoradia/memorypoolallocator"
  },
  {
    type: "project",
    title: "FixedPointDSP",
    timeframe: "July 2025",
    bullets: [
      "Header-only fixed-point C++ library with customizable overflow policies.",
      "Implemented FIR filters, DFT, FFT, and convolution with benchmarking and full test coverage."
    ],
    tags: ["C++", "DSP", "GoogleTest", "GoogleBenchmark"],
    link: "https://github.com/aarushgoradia/fixedpointdsp"
  },
  {
    type: "project",
    title: "GreenCycle",
    timeframe: "November 2024",
    bullets: [
      "Developed a web app to match users with local recycling centers based on net profit.",
      "Built the frontend with HTML/CSS/JS and backend logic using Python and LangChain."
    ],
    tags: ["HTML", "JS", "Python", "LangChain"],
    link: "https://github.com/venkatsubra01/GreenCycle"
  }
];

export default function WorkPage() {
  const experiences = workItems.filter(item => item.type === "experience");
  const projects = workItems.filter(item => item.type === "project");

  const experienceEmojis = ["🚀", "🔧", "🧠", "🤖"];
  const personalityQuips = [
    "Currently turning coffee into code and GDS files into automated workflows ☕",
    "Building a Mars rover because Earth projects are too mainstream 🛸",
    "Teaching machines to design circuits (they're surprisingly good students) 🤓",
    "Pitched to Singapore's government and lived to tell the tale 📊"
  ];

  const renderExperienceItem = (item, index) => (
    <div
      key={index}
      className={`flex w-full mb-2 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
    >
      <div className="w-5/12">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
          <div className="flex items-center gap-3 mb-1">
            <div className="text-base font-semibold text-white">
              {experienceEmojis[index]} {item.title}
            </div>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <FaExternalLinkAlt size={12} />
              </a>
            )}
          </div>
          <p className="text-xs text-gray-400 italic mb-1">{item.timeframe}</p>
          {personalityQuips[index] && (
            <p className="text-xs text-cyan-300 mb-2 italic font-medium">
              {personalityQuips[index]}
            </p>
          )}
          <ul className="list-disc list-inside text-gray-300 space-y-0.5 mb-2">
            {item.bullets.map((point, i) => (
              <li key={i} className="text-xs leading-relaxed">{point}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1 mb-1">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded border border-gray-600 hover:border-cyan-500 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
          {item.links && (
            <div className="flex flex-wrap gap-3">
              {item.links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 text-xs underline transition-colors"
                >
                  {link.text}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-2/12 flex justify-center">
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 bg-cyan-500 rounded-full border-2 border-gray-900 shadow-lg shadow-cyan-500/30"></div>
          {index < experiences.length - 1 && <div className="w-0.5 h-full bg-cyan-500 mt-1"></div>}
        </div>
      </div>
      <div className="w-5/12"></div>
    </div>
  );

  const projectEmojis = ["🧮", "🎯", "🌱"];
  const projectQuips = [
    "Because malloc() is for quitters - built my own memory manager 💪",
    "Fixed-point math so precise, it makes floating-point jealous 🎯",
    "Saving the planet one recycling center at a time 🌍"
  ];

  const renderProjectItem = (item, index) => (
    <div
      key={index}
      className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:transform hover:scale-105"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="text-lg font-semibold text-white">
          {projectEmojis[index]} {item.title}
        </div>
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <FaExternalLinkAlt size={14} />
          </a>
        )}
      </div>
      <p className="text-sm text-gray-400 italic mb-2">{item.timeframe}</p>
      {projectQuips[index] && (
        <p className="text-sm text-cyan-300 mb-2 italic font-medium">
          {projectQuips[index]}
        </p>
      )}
      <ul className="list-disc list-inside text-gray-300 space-y-1 mb-3">
        {item.bullets.map((point, i) => (
          <li key={i} className="text-sm leading-relaxed">{point}</li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2 mb-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded border border-gray-600 hover:border-cyan-500 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
      {item.links && (
        <div className="flex flex-wrap gap-4">
          {item.links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 text-sm underline transition-colors"
            >
              {link.text}
            </a>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10 font-mono">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Work & Projects</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          From silicon to software, here's where I've been breaking things and (hopefully) fixing them 
        </p>
      </div>
      
      {/* Experience Section - Timeline */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-5 border-b border-cyan-500 pb-2">
          Experience
        </h2>
        <div className="max-w-6xl mx-auto">
          {experiences.map((item, index) => renderExperienceItem(item, index))}
        </div>
      </section>

      {/* Projects Section - Grid */}
      <section>
        <h2 className="text-2xl font-semibold text-cyan-300 mb-5 border-b border-cyan-500 pb-2">
          Side Quests
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {projects.map((item, index) => renderProjectItem(item, index))}
        </div>
      </section>
    </div>
  );
}