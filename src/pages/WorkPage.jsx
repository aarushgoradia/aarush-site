import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const workItems = [
  {
    type: "experience",
    title: "🚀 Technology Development Intern @ Advanced Micro Foundry",
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
    title: "🛰️ Head of Embedded Systems @ Princeton Rover Team",
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
    title: "🧪 Independent Researcher @ Sengupta Lab",
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
    title: "🤖 AI Engineering Intern @ AI Seer",
    timeframe: "May 2024 - July 2024",
    bullets: [
      "Built a LangChain Agent pipeline with custom tools to fact-check content, improving accuracy from 85% to 92%.",
      "Developed real-time transcription system with speaker diarization using Whisper.",
      "Presented the platform to Singapore's Senior Minister of State for Communications.",
      "Filed U.S. Patent Application No.: 19/011,265."
    ],
    tags: ["Python", "LLMs", "Whisper", "LangChain"]
  },
  // Projects ordered by date (newest first)
  {
    type: "project",
    title: "💻 RISC-V Pipelined CPU",
    timeframe: "July 2025",
    bullets: [
      "Designed and implemented a 5-stage pipelined RISC-V RV32I CPU in SystemVerilog with hazard detection and forwarding.",
      "Automated simulation and waveform analysis using Verilator, C++ testbench, and GTKWave on macOS."
    ],
    tags: ["SystemVerilog", "RISC-V", "Verilator", "GTKWave", "C++"],
    link: "https://github.com/aarushgoradia/riscv-pipelined-core"
  },
  {
    type: "project",
    title: "🧮 Memory Pool Allocator",
    timeframe: "July 2025",
    bullets: [
      "Lightweight fixed-size memory pool allocator in C++ with support for placement new and RAII-safe deallocation.",
      "Implemented low-level memory management using preallocated buffer, free list tracking, and type-safe allocation."
    ],
    tags: ["C++", "Memory Management", "RAII", "Performance"],
    link: "https://github.com/aarushgoradia/memorypoolallocator"
  },
  {
    type: "project",
    title: "🎯 FixedPointDSP",
    timeframe: "June 2025",
    bullets: [
      "Header-only fixed-point C++ library with customizable overflow policies.",
      "Implemented FIR filters, DFT, FFT, and convolution with benchmarking and full test coverage."
    ],
    tags: ["C++", "DSP", "GoogleTest", "GoogleBenchmark"],
    link: "https://github.com/aarushgoradia/fixedpointdsp"
  },
  {
    type: "project",
    title: "🖥️ PUnC (Princeton University Computer)",
    timeframe: "November 2024 - December 2024",
    bullets: [
      "Designed a custom 16-instruction processor using FSM-based control and datapath logic.",
      "Wrote and simulated Verilog modules using AMD Vivado and deployed to an FPGA board for functional testing."
    ],
    tags: ["Verilog", "FPGA", "Vivado", "Digital Design"]
  },
  {
    type: "project",
    title: "🌱 GreenCycle",
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

  return (
    <div className="min-h-screen bg-amber-50 text-gray-800 px-6 py-10 font-body">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-heading font-bold mb-4 text-gray-800">Experience & Projects</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body">
        Here are some of my key experiences and projects that showcase my skills!
          
        </p>
      </div>
      
      {/* Experience Section */}
      <section id="experience" className="mb-20">
        <h2 className="text-4xl font-heading font-bold text-purple-600 mb-10 text-center">
          Experience
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto mb-10">
          {experiences.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-purple-100 rounded-2xl p-8 hover:border-purple-300 transition-all duration-300 hover:shadow-xl hover:shadow-purple-100 hover:transform hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-2xl font-heading font-bold text-gray-800 flex items-center">
                  {item.title.split(' @ ')[0]}
                </div>
              </div>
              <div className="text-xl font-heading font-semibold text-purple-600 mb-3">
                @ {item.title.split(' @ ')[1]}
              </div>
              <p className="text-sm text-gray-500 italic mb-4 font-body">{item.timeframe}</p>
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

      {/* Projects Section */}
      <section id="projects">
        <h2 className="text-4xl font-heading font-bold text-purple-600 mb-10 text-center">
          Technical Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-purple-100 rounded-2xl p-6 hover:border-purple-300 transition-all duration-300 hover:shadow-xl hover:shadow-purple-100 hover:transform hover:scale-105"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-xl font-heading font-bold text-gray-800">
                  {item.title}
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