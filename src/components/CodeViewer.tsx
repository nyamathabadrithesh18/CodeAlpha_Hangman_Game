import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, FileText, FolderTree } from 'lucide-react';
import { HANGMAN_PYTHON_CODE, README_MARKDOWN } from '../data/codeData';

export const CodeViewer: React.FC = () => {
  const [activeFile, setActiveFile] = useState<'hangman' | 'readme' | 'structure'>('hangman');
  const [copied, setCopied] = useState<boolean>(false);

  const currentContent =
    activeFile === 'hangman'
      ? HANGMAN_PYTHON_CODE
      : activeFile === 'readme'
      ? README_MARKDOWN
      : '';

  const handleCopy = () => {
    let textToCopy = currentContent;
    if (activeFile === 'structure') {
      textToCopy = `CodeAlpha_Hangman/\n│\n├── hangman.py\n└── README.md`;
    }
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    let filename = 'hangman.py';
    let content = HANGMAN_PYTHON_CODE;
    let mimeType = 'text/x-python';

    if (activeFile === 'readme') {
      filename = 'README.md';
      content = README_MARKDOWN;
      mimeType = 'text/markdown';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#151619] rounded-xl overflow-hidden shadow-2xl border border-[#2A2A2E] flex flex-col h-full">
      {/* File Tab Navigation Bar */}
      <div className="bg-[#1C1C1F] px-4 py-2.5 border-b border-[#2A2A2E] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <button
            id="tab-hangman-py"
            onClick={() => setActiveFile('hangman')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              activeFile === 'hangman'
                ? 'bg-[#0A0A0B] text-[#F27D26] border border-[#2A2A2E]'
                : 'text-[#8E9299] hover:text-white hover:bg-[#2A2A2E]/50'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-[#F27D26]" />
            hangman.py
          </button>

          <button
            id="tab-readme-md"
            onClick={() => setActiveFile('readme')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              activeFile === 'readme'
                ? 'bg-[#0A0A0B] text-[#F27D26] border border-[#2A2A2E]'
                : 'text-[#8E9299] hover:text-white hover:bg-[#2A2A2E]/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            README.md
          </button>

          <button
            id="tab-structure"
            onClick={() => setActiveFile('structure')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              activeFile === 'structure'
                ? 'bg-[#0A0A0B] text-[#F27D26] border border-[#2A2A2E]'
                : 'text-[#8E9299] hover:text-white hover:bg-[#2A2A2E]/50'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5 text-[#FFBD2E]" />
            Project Structure
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            id="copy-code-btn"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0A0A0B] hover:bg-[#2A2A2E] text-stone-200 border border-[#2A2A2E] text-xs font-mono font-medium transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#27C93F]" />
                <span className="text-[#27C93F]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#8E9299]" />
                <span>Copy Code</span>
              </>
            )}
          </button>

          {activeFile !== 'structure' && (
            <button
              id="download-file-btn"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#F27D26] hover:bg-[#ff8f3d] text-[#0A0A0B] text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Download {activeFile === 'hangman' ? 'hangman.py' : 'README.md'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Code / Content Display Area */}
      <div className="flex-1 p-5 overflow-y-auto font-mono text-xs leading-relaxed select-text bg-[#0A0A0B] text-[#E0E0E0] scrollbar-thin scrollbar-thumb-[#2A2A2E]">
        {activeFile === 'structure' ? (
          <div className="p-2 space-y-6 text-[#E0E0E0]">
            <div>
              <h3 className="text-xs font-bold text-[#F27D26] uppercase tracking-widest mb-3 font-mono">
                Recommended Repository Structure
              </h3>
              <pre className="bg-[#151619] p-4 rounded-lg border border-[#2A2A2E] text-emerald-400 font-mono text-sm leading-6">
{`CodeAlpha_Hangman/
│
├── hangman.py       # Main executable Python game script
└── README.md        # Comprehensive internship task documentation`}
              </pre>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#8E9299] uppercase tracking-widest">
                File Specifications
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-[#151619] p-4 rounded-lg border border-[#2A2A2E]">
                  <div className="flex items-center gap-2 font-semibold text-[#F27D26] mb-1.5 font-mono text-xs">
                    <FileCode className="w-4 h-4" />
                    hangman.py
                  </div>
                  <p className="text-xs text-[#8E9299] leading-relaxed">
                    Standalone Python 3 script containing full game logic, exactly 5 predefined words, robust input validation, attempt tracking, and replay loops.
                  </p>
                </div>

                <div className="bg-[#151619] p-4 rounded-lg border border-[#2A2A2E]">
                  <div className="flex items-center gap-2 font-semibold text-sky-400 mb-1.5 font-mono text-xs">
                    <FileText className="w-4 h-4" />
                    README.md
                  </div>
                  <p className="text-xs text-[#8E9299] leading-relaxed">
                    Professional project documentation covering project objective, features, technology stack, execution instructions, gameplay logs, and CodeAlpha task attribution.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#1C1C1F] p-4 rounded-lg border border-[#2A2A2E] flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white mb-0.5">Execution Command</p>
                <p className="text-xs font-mono text-[#8E9299]">python hangman.py</p>
              </div>
              <span className="text-[11px] font-mono text-[#27C93F] bg-[#0A0A0B] px-2.5 py-1 rounded border border-[#2A2A2E]">
                ZERO DEPENDENCIES
              </span>
            </div>
          </div>
        ) : (
          <div className="flex">
            {/* Line numbers column */}
            <div className="select-none text-[#8E9299] opacity-40 text-right pr-4 border-r border-[#2A2A2E] mr-4 hidden sm:block">
              {currentContent.split('\n').map((_, idx) => (
                <div key={idx}>{idx + 1}</div>
              ))}
            </div>

            {/* Code content */}
            <pre className="flex-1 overflow-x-auto whitespace-pre leading-5 text-stone-200">
              {currentContent}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
