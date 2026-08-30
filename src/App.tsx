import React, { useState } from 'react';
import {
  Terminal as TerminalIcon,
  FileCode,
  CheckCircle2,
  Download,
  ShieldCheck,
  Cpu,
  Layers,
  Code2,
  Sparkles,
} from 'lucide-react';
import { TerminalGame } from './components/TerminalGame';
import { CodeViewer } from './components/CodeViewer';
import { TaskChecklist } from './components/TaskChecklist';
import { ActiveTab } from './types';
import { HANGMAN_PYTHON_CODE } from './data/codeData';

const WORDS_LIST = [
  { id: '01', word: 'PYTHON', desc: 'Core programming language' },
  { id: '02', word: 'COMPUTER', desc: 'Hardware architecture' },
  { id: '03', word: 'PROGRAMMING', desc: 'Software logic development' },
  { id: '04', word: 'DEVELOPER', desc: 'Software engineer role' },
  { id: '05', word: 'KEYBOARD', desc: 'Standard input peripheral' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('simulator');

  const downloadAllZipOrScript = () => {
    const blob = new Blob([HANGMAN_PYTHON_CODE], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hangman.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E0E0E0] flex flex-col font-sans antialiased selection:bg-[#F27D26]/30 selection:text-[#F27D26]">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between px-6 lg:px-8 py-4 border-b border-[#2A2A2E] bg-[#121214] sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#F27D26] flex items-center justify-center rounded-lg shadow-lg">
            <span className="font-bold text-[#0A0A0B] text-xl font-mono">CA</span>
          </div>
          <div>
            <h1 className="text-xs font-semibold tracking-widest text-[#8E9299] uppercase">
              CodeAlpha Python Programming
            </h1>
            <p className="text-base sm:text-lg font-bold text-white tracking-tight">
              Internship – Task 1: Hangman Game
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-3 sm:mt-0">
          {/* Status Badge */}
          <div className="flex gap-2 items-center text-xs font-mono bg-[#1C1C1F] px-3.5 py-1.5 rounded-full border border-[#2A2A2E] text-stone-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="tracking-wide">STATUS: TASK 1 ACTIVE</span>
          </div>

          {/* Download Script */}
          <button
            id="download-hangman-py-btn"
            onClick={downloadAllZipOrScript}
            className="flex items-center gap-2 bg-[#F27D26] hover:bg-[#ff8f3d] text-[#0A0A0B] font-bold text-xs px-4 py-2 rounded-lg transition-all shadow-md active:scale-95"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Download hangman.py</span>
          </button>
        </div>
      </header>

      {/* Main Grid Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column / Primary Workspace (8 cols on desktop) */}
        <section className="lg:col-span-8 flex flex-col gap-4">
          {/* Navigation Controls Bar */}
          <div className="bg-[#151619] border border-[#2A2A2E] rounded-xl p-2 flex flex-wrap items-center justify-between gap-2 shadow-xl">
            <div className="flex items-center gap-1.5">
              <button
                id="nav-tab-simulator"
                onClick={() => setActiveTab('simulator')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === 'simulator'
                    ? 'bg-[#1C1C1F] text-[#F27D26] border border-[#2A2A2E] shadow-sm font-semibold'
                    : 'text-[#8E9299] hover:text-white hover:bg-[#1C1C1F]/60'
                }`}
              >
                <TerminalIcon className="w-3.5 h-3.5" />
                <span>Console Terminal</span>
              </button>

              <button
                id="nav-tab-code"
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === 'code'
                    ? 'bg-[#1C1C1F] text-[#F27D26] border border-[#2A2A2E] shadow-sm font-semibold'
                    : 'text-[#8E9299] hover:text-white hover:bg-[#1C1C1F]/60'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Source & README</span>
              </button>

              <button
                id="nav-tab-specs"
                onClick={() => setActiveTab('specs')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === 'specs'
                    ? 'bg-[#1C1C1F] text-[#F27D26] border border-[#2A2A2E] shadow-sm font-semibold'
                    : 'text-[#8E9299] hover:text-white hover:bg-[#1C1C1F]/60'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Task Compliance</span>
              </button>
            </div>

            <div className="text-[11px] font-mono text-[#8E9299] px-2 hidden sm:block">
              Runtime: Python 3.10+
            </div>
          </div>

          {/* Workspace Tab Content */}
          <div className="flex-1 flex flex-col min-h-[480px]">
            {activeTab === 'simulator' && <TerminalGame />}
            {activeTab === 'code' && <CodeViewer />}
            {activeTab === 'specs' && <TaskChecklist />}
          </div>

          {/* Game Logic Hint Bar */}
          <div className="bg-[#1C1C1F] border border-[#2A2A2E] rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-[#2A2A2E] rounded-lg flex items-center justify-center text-lg text-[#F27D26]">
                ⚡
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white">Task 1 Architecture</p>
                <p className="text-xs text-[#8E9299]">
                  Zero external dependencies. Predefined list & input sanitization via <code className="text-[#F27D26] font-mono">.lower()</code>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-[#2A2A2E]/80 text-[#8E9299] rounded text-xs font-mono border border-[#2A2A2E]">
                random.choice()
              </span>
              <span className="px-3 py-1.5 bg-[#2A2A2E]/80 text-[#8E9299] rounded text-xs font-mono border border-[#2A2A2E]">
                while incorrect &lt; 6
              </span>
            </div>
          </div>
        </section>

        {/* Right Column / Technical Data Grid Sidebar (4 cols on desktop) */}
        <aside className="lg:col-span-4 flex flex-col gap-4">
          {/* Requirements Overview Card */}
          <div className="bg-[#151619] border border-[#2A2A2E] rounded-xl p-5 shadow-xl">
            <h2 className="text-xs font-bold text-[#8E9299] uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-[#F27D26] rounded-sm"></span>
              Project Requirements
            </h2>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 text-emerald-400 font-bold text-xs">✔</div>
                <div>
                  <p className="text-xs font-medium text-white">Word Collection</p>
                  <p className="text-[11px] text-[#8E9299]">Exactly 5 predefined words in a static list.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 text-emerald-400 font-bold text-xs">✔</div>
                <div>
                  <p className="text-xs font-medium text-white">Maximum Attempts</p>
                  <p className="text-[11px] text-[#8E9299]">Strict 6 incorrect guesses limit.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 text-emerald-400 font-bold text-xs">✔</div>
                <div>
                  <p className="text-xs font-medium text-white">Input Validation</p>
                  <p className="text-[11px] text-[#8E9299]">Catches symbols, numbers, blanks & repeats.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 text-emerald-400 font-bold text-xs">✔</div>
                <div>
                  <p className="text-xs font-medium text-white">Replay & Exit</p>
                  <p className="text-[11px] text-[#8E9299]">Supports continuous games without crashing.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Predefined Wordlist Data Grid */}
          <div className="bg-[#151619] border border-[#2A2A2E] rounded-xl p-5 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold text-[#8E9299] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-[#F27D26] rounded-sm"></span>
                  Predefined Wordlist
                </h2>
                <span className="text-[10px] font-mono text-[#8E9299] bg-[#1C1C1F] px-2 py-0.5 rounded border border-[#2A2A2E]">
                  COUNT: 5
                </span>
              </div>

              <div className="space-y-2">
                {WORDS_LIST.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-2.5 bg-[#0A0A0B] rounded-lg border border-[#2A2A2E] font-mono text-xs hover:border-[#F27D26]/50 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#8E9299] text-[10px]">{item.id}</span>
                      <span className="text-stone-200 font-semibold group-hover:text-[#F27D26] transition-colors">
                        {item.word}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#8E9299] font-sans">
                      {item.word.length} chars
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Submission Info Box */}
            <div className="mt-5 p-4 bg-[#F27D26]/10 border border-[#F27D26]/30 rounded-lg">
              <p className="text-[10px] uppercase font-bold text-[#F27D26] mb-1 tracking-wider">
                Submission Info
              </p>
              <p className="text-xs leading-relaxed text-stone-300">
                Ensure <code className="text-white font-mono bg-[#0A0A0B] px-1 py-0.5 rounded">hangman.py</code> and <code className="text-white font-mono bg-[#0A0A0B] px-1 py-0.5 rounded">README.md</code> are in <code className="text-[#F27D26] font-mono">CodeAlpha_Hangman/</code> before submitting.
              </p>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="h-12 bg-[#121214] border-t border-[#2A2A2E] flex flex-wrap items-center justify-between px-6 lg:px-8 text-[10px] text-[#8E9299] font-mono uppercase tracking-[0.2em]">
        <div>Module: Python Standard Library (random)</div>
        <div className="hidden sm:block">&copy; 2026 CODEALPHA TASK PORTFOLIO</div>
        <div>Build: v1.0.0-STABLE</div>
      </footer>
    </div>
  );
}

