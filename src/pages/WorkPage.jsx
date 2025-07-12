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
    title: "PUnC (Princeton University Computer)",
    timeframe: "November 2024 – December 2024",
    bullets: [
      "Designed a custom 16-instruction processor using FSM-based control and datapath logic.",
      "Wrote and simulated Verilog modules using AMD Vivado and deployed to an FPGA board for functional testing."
    ],
    tags: ["Verilog", "FPGA", "Vivado", "Digital Design"]
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
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <div className="flex items-center gap-3 mb-1">
            <div className="text-base font-semibold text-white">
              {experienceEmojis[index]} {item.title}
            </div>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                <FaExternalLinkAlt size={12} />
              </a>
            )}
          </div>
          <p className="text-xs text-gray-400 italic mb-1">{item.timeframe}</p>
          {personalityQuips[index] && (
            <p className="text-xs text-purple-300 mb-2 italic font-medium">
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
                className="text-xs bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded border border-purple-500"
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
                  className="text-purple-400 hover:text-purple-300 text-xs underline transition-colors"
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
          <div className="w-3 h-3 bg-purple-500 rounded-full border-2 border-gray-900 shadow-lg shadow-purple-500/30"></div>
          {index < experiences.length - 1 && <div className="w-0.5 h-full bg-purple-500 mt-1"></div>}
        </div>
      </div>
      <div className="w-5/12"></div>
    </div>
  );

  const projectEmojis = ["🖥️", "🧮", "🎯", "🌱"];
  const projectQuips = [
    "16 instructions, infinite possibilities - built my own CPU 🔧",
    "Because malloc() is for quitters - built my own memory manager 💪",
    "Fixed-point math so precise, it makes floating-point jealous 🎯",
    "Saving the planet one recycling center at a time 🌍"
  ];

  const renderProjectItem = (item, index) => (
    <div
      key={index}
      className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:transform hover:scale-105"
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
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            <FaExternalLinkAlt size={14} />
          </a>
        )}
      </div>
      <p className="text-sm text-gray-400 italic mb-2">{item.timeframe}</p>
      {projectQuips[index] && (
        <p className="text-sm text-purple-300 mb-2 italic font-medium">
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
            className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded border border-purple-500"
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
              className="text-purple-400 hover:text-purple-300 text-sm underline transition-colors"
            >
              {link.text}
            </a>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-amber-50 text-gray-800 px-6 py-10 font-body">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-heading font-bold mb-4 text-gray-800">Experience & Projects</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body">
          From silicon to software, here's where I've been building amazing things 
        </p>
      </div>
      
      {/* Experience Section - Compact Cards */}
      <section id="experience" className="mb-20">
        <h2 className="text-4xl font-heading font-bold text-purple-600 mb-10 text-center">
          💼 Experience
        </h2>
        
        {/* Experience Summary Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto mb-10">
          {experiences.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-purple-100 rounded-2xl p-8 hover:border-purple-300 transition-all duration-300 hover:shadow-xl hover:shadow-purple-100 hover:transform hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-2xl font-heading font-bold text-gray-800 flex items-center">
                  {experienceEmojis[index]} {item.title.split(' @ ')[0]}
                </div>
              </div>
              <div className="text-xl font-heading font-semibold text-purple-600 mb-3">
                @ {item.title.split(' @ ')[1]}
              </div>
              <p className="text-sm text-gray-500 italic mb-4 font-body">{item.timeframe}</p>
              {personalityQuips[index] && (
                <p className="text-sm text-purple-600 mb-4 italic font-medium font-body">
                  {personalityQuips[index]}
                </p>
              )}
              <div className="text-base text-gray-700 mb-6 font-body leading-relaxed">
                <ul className="list-disc list-inside space-y-2">
                  {item.bullets.map((point, i) => (
                    <li key={i} className="leading-relaxed">{point}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-200 font-medium"
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
                      className="text-purple-600 hover:text-purple-500 text-sm underline transition-colors font-body"
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section - Grid */}
      <section id="projects">
        <h2 className="text-4xl font-heading font-bold text-purple-600 mb-10 text-center">
          🚀 Side Quests
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-purple-100 rounded-2xl p-6 hover:border-purple-300 transition-all duration-300 hover:shadow-xl hover:shadow-purple-100 hover:transform hover:scale-105"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-xl font-heading font-bold text-gray-800">
                  {projectEmojis[index]} {item.title}
                </div>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-500 hover:text-purple-400 transition-colors"
                  >
                    <FaExternalLinkAlt size={16} />
                  </a>
                )}
              </div>
              <p className="text-sm text-gray-500 italic mb-3 font-body">{item.timeframe}</p>
              {projectQuips[index] && (
                <p className="text-sm text-purple-600 mb-3 italic font-medium font-body">
                  {projectQuips[index]}
                </p>
              )}
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4 font-body">
                {item.bullets.map((point, i) => (
                  <li key={i} className="leading-relaxed">{point}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mb-3">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-200 font-medium"
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
                      className="text-purple-600 hover:text-purple-500 underline transition-colors font-body"
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}