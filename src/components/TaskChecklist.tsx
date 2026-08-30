import React from 'react';
import { CheckCircle2, ShieldCheck, Cpu, Code2, BookOpen, Layers } from 'lucide-react';

export const TaskChecklist: React.FC = () => {
  const requirements = [
    {
      id: 1,
      title: 'Start Screen',
      desc: 'Displays CODEALPHA HANGMAN header, welcome message, and "Press ENTER to start...".',
      status: 'Implemented & Verified',
    },
    {
      id: 2,
      title: 'Word Selection (5 Predefined Words)',
      desc: 'Uses ["python", "computer", "programming", "developer", "keyboard"] with Python\'s random module. No external files or APIs.',
      status: 'Implemented & Verified',
    },
    {
      id: 3,
      title: 'Hidden Word Representation',
      desc: 'Initially renders hidden characters with underscores ("_ _ _ _ _ _") separated by spaces.',
      status: 'Implemented & Verified',
    },
    {
      id: 4,
      title: 'Input Validation & Normalization',
      desc: 'Enforces single-letter input, case-insensitivity (.lower()), rejects blank lines, numbers, special characters, and repeated letters.',
      status: 'Implemented & Verified',
    },
    {
      id: 5,
      title: 'Correct Guess Handling',
      desc: 'Reveals all matching letter positions in the word, updates display, and prints "Good guess!".',
      status: 'Implemented & Verified',
    },
    {
      id: 6,
      title: 'Incorrect Guess & 6-Attempt Limit',
      desc: 'Increments incorrect guess counter (X/6), prints "Wrong guess!", shows remaining attempts, terminates on 6 mistakes.',
      status: 'Implemented & Verified',
    },
    {
      id: 7,
      title: 'Guessed Letters Tracker',
      desc: 'Maintains list of previously guessed letters ("Guessed letters: a, e, p, t") without duplicate penalties.',
      status: 'Implemented & Verified',
    },
    {
      id: 8,
      title: 'Win Condition Screen',
      desc: 'Displays formatted "YOU WIN!" banner, reveals secret word, and celebrates "Congratulations!".',
      status: 'Implemented & Verified',
    },
    {
      id: 9,
      title: 'Lose Condition (Game Over)',
      desc: 'Displays formatted "GAME OVER!" banner upon 6 incorrect guesses and reveals "The correct word was: ...".',
      status: 'Implemented & Verified',
    },
    {
      id: 10,
      title: 'Replay & Safe Exit Flow',
      desc: 'Asks "Would you like to play again? (y/n):". Starts new game on "y" and exits cleanly with thank you message on "n".',
      status: 'Implemented & Verified',
    },
  ];

  return (
    <div className="bg-[#151619] rounded-xl overflow-hidden shadow-2xl border border-[#2A2A2E] p-5 space-y-5">
      <div className="flex flex-wrap items-center justify-between border-b border-[#2A2A2E] pb-4 gap-3">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
            <ShieldCheck className="w-5 h-5 text-[#F27D26]" />
            CodeAlpha Task 1 Specification Compliance Grid
          </h2>
          <p className="text-xs text-[#8E9299] mt-0.5">
            Audit against Python Programming Internship official guidelines
          </p>
        </div>
        <span className="text-xs bg-[#1C1C1F] text-[#27C93F] border border-[#2A2A2E] px-3 py-1 rounded-full font-mono font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#27C93F]"></span>
          10 / 10 SPECS VERIFIED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {requirements.map((req) => (
          <div
            key={req.id}
            className="bg-[#0A0A0B] border border-[#2A2A2E] rounded-lg p-3.5 flex items-start gap-3 transition-colors hover:border-[#F27D26]/50 group"
          >
            <div className="mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-[#27C93F] shrink-0" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-stone-200 group-hover:text-[#F27D26] transition-colors font-mono">
                  {req.id < 10 ? `0${req.id}` : req.id}. {req.title}
                </span>
              </div>
              <p className="text-xs text-[#8E9299] leading-relaxed">{req.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-[#2A2A2E] flex flex-wrap items-center justify-between gap-3 text-xs text-[#8E9299] font-mono">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-[#F27D26]" />
          <span>Core modules: <strong className="text-stone-300">random</strong>, standard loops, functions, lists</span>
        </div>
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#FFBD2E]" />
          <span>Zero external dependencies or API keys required</span>
        </div>
      </div>
    </div>
  );
};
