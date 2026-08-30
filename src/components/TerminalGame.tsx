import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Terminal } from 'lucide-react';
import { GamePhase, TerminalEntry } from '../types';

const WORDS = ["python", "computer", "programming", "developer", "keyboard"];
const MAX_INCORRECT_GUESSES = 6;

const ASCII_STAGES = [
  `  +---+
  |   |
      |
      |
      |
      |
========`,
  `  +---+
  |   |
  O   |
      |
      |
      |
========`,
  `  +---+
  |   |
  O   |
  |   |
      |
      |
========`,
  `  +---+
  |   |
  O   |
 /|   |
      |
      |
========`,
  `  +---+
  |   |
  O   |
 /|\\  |
      |
      |
========`,
  `  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
========`,
  `  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
========`,
];

export const TerminalGame: React.FC = () => {
  const [phase, setPhase] = useState<GamePhase>('start');
  const [secretWord, setSecretWord] = useState<string>('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize terminal with start screen
  useEffect(() => {
    resetToStartScreen();
  }, []);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keep input focused
  useEffect(() => {
    inputRef.current?.focus();
  }, [phase, history]);

  const addLog = (text: string, type: TerminalEntry['type'] = 'game') => {
    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        text,
        type,
      },
    ]);
  };

  const resetToStartScreen = () => {
    setPhase('start');
    setSecretWord('');
    setGuessedLetters([]);
    setIncorrectGuesses(0);
    setInputValue('');
    setHistory([
      { id: '1', type: 'header', text: '================================' },
      { id: '2', type: 'header', text: 'CODEALPHA HANGMAN' },
      { id: '3', type: 'header', text: '=================' },
      { id: '4', type: 'system', text: '\nWelcome to the Hangman Game!\n' },
      { id: '5', type: 'info', text: 'Press ENTER to start...' },
    ]);
  };

  const startNewGame = (customWord?: string) => {
    const chosen = customWord || WORDS[Math.floor(Math.random() * WORDS.length)];
    setSecretWord(chosen);
    setGuessedLetters([]);
    setIncorrectGuesses(0);
    setPhase('playing');
    setInputValue('');

    const initialDisplay = chosen.split('').map(() => '_').join(' ');

    setHistory((prev) => [
      ...prev,
      { id: Math.random().toString(), type: 'system', text: '\n========================================' },
      { id: Math.random().toString(), type: 'system', text: 'NEW GAME STARTED' },
      { id: Math.random().toString(), type: 'system', text: '========================================\n' },
      { id: Math.random().toString(), type: 'system', text: '----------------------------------------' },
      { id: Math.random().toString(), type: 'game', text: `Word: ${initialDisplay}` },
      { id: Math.random().toString(), type: 'game', text: `Incorrect guesses: 0/${MAX_INCORRECT_GUESSES}` },
      { id: Math.random().toString(), type: 'game', text: `Remaining attempts: ${MAX_INCORRECT_GUESSES}` },
      { id: Math.random().toString(), type: 'game', text: 'Guessed letters: None' },
      { id: Math.random().toString(), type: 'system', text: '----------------------------------------' },
    ]);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawVal = inputValue;
    setInputValue('');

    if (phase === 'start') {
      startNewGame();
      return;
    }

    if (phase === 'replay_prompt' || phase === 'won' || phase === 'lost') {
      const choice = rawVal.trim().toLowerCase();
      addLog(`Would you like to play again? (y/n): ${rawVal}`, 'input');

      if (choice === 'y') {
        startNewGame();
      } else if (choice === 'n') {
        setPhase('exited');
        addLog('\nThanks for playing CodeAlpha Hangman!', 'system');
      } else {
        addLog("Invalid input! Please enter 'y' to play again or 'n' to exit.", 'warning');
      }
      return;
    }

    if (phase === 'exited') {
      resetToStartScreen();
      return;
    }

    if (phase === 'playing') {
      // User is guessing a letter
      addLog(`Enter a letter: ${rawVal}`, 'input');

      const trimmed = rawVal.trim();

      // 1. Empty input
      if (!trimmed) {
        addLog('Invalid input! Input cannot be empty. Please enter a letter.', 'warning');
        return;
      }

      // 2. Multiple characters
      if (trimmed.length > 1) {
        addLog('Invalid input! Please enter only one letter at a time.', 'warning');
        return;
      }

      // 3. Numbers and special characters
      if (!/^[a-zA-Z]$/.test(trimmed)) {
        addLog('Invalid input! Numbers and special characters are not allowed.', 'warning');
        return;
      }

      const letter = trimmed.toLowerCase();

      // 4. Repeated guess
      if (guessedLetters.includes(letter)) {
        addLog(`You already guessed '${letter}'! Try a different letter.`, 'warning');
        return;
      }

      // Record valid guess
      const updatedGuessed = [...guessedLetters, letter];
      setGuessedLetters(updatedGuessed);

      let newIncorrectCount = incorrectGuesses;

      // 5. Check if in secret word
      if (secretWord.includes(letter)) {
        addLog('Good guess!', 'success');

        // Check win condition
        const isComplete = secretWord.split('').every((char) => updatedGuessed.includes(char));

        if (isComplete) {
          const display = secretWord.split('').join(' ');
          addLog('----------------------------------------', 'system');
          addLog(`Word: ${display}`, 'success');
          addLog(`Incorrect guesses: ${incorrectGuesses}/${MAX_INCORRECT_GUESSES}`, 'game');
          addLog(`Remaining attempts: ${MAX_INCORRECT_GUESSES - incorrectGuesses}`, 'game');
          addLog(`Guessed letters: ${[...updatedGuessed].sort().join(', ')}`, 'game');
          addLog('----------------------------------------', 'system');

          addLog('\n================================', 'success');
          addLog('YOU WIN!', 'success');
          addLog('========', 'success');
          addLog(`\nThe word was: ${secretWord}`, 'success');
          addLog('Congratulations!\n', 'success');

          setPhase('replay_prompt');
          return;
        }
      } else {
        newIncorrectCount = incorrectGuesses + 1;
        setIncorrectGuesses(newIncorrectCount);
        const remaining = MAX_INCORRECT_GUESSES - newIncorrectCount;

        addLog('Wrong guess!', 'error');
        addLog(`Incorrect guesses: ${newIncorrectCount}/${MAX_INCORRECT_GUESSES}`, 'error');
        addLog(`Remaining attempts: ${remaining}`, 'error');

        // Check lose condition
        if (newIncorrectCount >= MAX_INCORRECT_GUESSES) {
          const display = secretWord
            .split('')
            .map((c) => (updatedGuessed.includes(c) ? c : '_'))
            .join(' ');
          
          addLog('----------------------------------------', 'system');
          addLog(`Word: ${display}`, 'game');
          addLog(`Incorrect guesses: ${newIncorrectCount}/${MAX_INCORRECT_GUESSES}`, 'game');
          addLog(`Remaining attempts: 0`, 'game');
          addLog(`Guessed letters: ${[...updatedGuessed].sort().join(', ')}`, 'game');
          addLog('----------------------------------------', 'system');

          addLog('\n================================', 'error');
          addLog('GAME OVER!', 'error');
          addLog('==========', 'error');
          addLog(`\nThe correct word was: ${secretWord}`, 'error');
          addLog('Better luck next time!\n', 'error');

          setPhase('replay_prompt');
          return;
        }
      }

      // Display updated state if still playing
      const currentDisplay = secretWord
        .split('')
        .map((c) => (updatedGuessed.includes(c) ? c : '_'))
        .join(' ');
      const remainingAttempts = MAX_INCORRECT_GUESSES - newIncorrectCount;

      addLog('\n----------------------------------------', 'system');
      addLog(`Word: ${currentDisplay}`, 'game');
      addLog(`Incorrect guesses: ${newIncorrectCount}/${MAX_INCORRECT_GUESSES}`, 'game');
      addLog(`Remaining attempts: ${remainingAttempts}`, 'game');
      addLog(`Guessed letters: ${[...updatedGuessed].sort().join(', ')}`, 'game');
      addLog('----------------------------------------', 'system');
    }
  };

  const getMaskedWord = () => {
    if (!secretWord) return '_ _ _ _ _ _';
    return secretWord
      .split('')
      .map((c) => (guessedLetters.includes(c) ? c : '_'))
      .join(' ');
  };

  return (
    <div className="flex flex-col h-full bg-[#151619] border border-[#2A2A2E] rounded-xl shadow-2xl overflow-hidden">
      {/* Window Title Bar with Traffic Lights */}
      <div className="bg-[#1C1C1F] px-4 py-2.5 border-b border-[#2A2A2E] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
          </div>
          <span className="text-[11px] font-mono text-[#8E9299] ml-3 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#F27D26]" />
            hangman.py — CodeAlpha Python Interactive Console
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="restart-game-btn"
            onClick={resetToStartScreen}
            className="text-[11px] font-mono flex items-center gap-1 text-[#8E9299] hover:text-white bg-[#0A0A0B] hover:bg-[#2A2A2E] px-2.5 py-1 rounded border border-[#2A2A2E] transition-colors"
            title="Restart Hangman"
          >
            <RotateCcw className="w-3 h-3 text-[#F27D26]" />
            Reset
          </button>
        </div>
      </div>

      {/* Live Visual Telemetry Grid Bar */}
      <div className="bg-[#0A0A0B] border-b border-[#2A2A2E] p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        {/* Visual ASCII Hangman graphic */}
        <div className="sm:col-span-4 bg-[#151619] border border-[#2A2A2E] rounded-lg p-3 flex flex-col items-center justify-center">
          <div className="text-[10px] uppercase tracking-widest text-[#8E9299] font-mono mb-1">
            Gallows Stage ({incorrectGuesses}/6)
          </div>
          <pre className="text-[#F27D26] font-mono text-xs leading-tight select-none">
            {ASCII_STAGES[Math.min(incorrectGuesses, 6)]}
          </pre>
        </div>

        {/* Dynamic Telemetry Metrics */}
        <div className="sm:col-span-8 flex flex-col gap-3">
          <div className="bg-[#151619] border border-[#2A2A2E] rounded-lg p-3">
            <div className="text-[10px] uppercase tracking-widest text-[#8E9299] font-mono mb-1">
              HIDDEN WORD DISPLAY
            </div>
            <div className="text-xl sm:text-2xl font-mono font-bold tracking-[0.3em] text-white overflow-x-auto whitespace-nowrap">
              {phase === 'start' ? '_ _ _ _ _ _' : getMaskedWord()}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#151619] border border-[#2A2A2E] rounded-lg p-3">
              <div className="text-[10px] uppercase tracking-widest text-[#8E9299] font-mono mb-1">
                ATTEMPTS REMAINING
              </div>
              <div className="text-base sm:text-lg font-mono font-bold">
                <span className={incorrectGuesses >= 5 ? 'text-[#FF5F56]' : incorrectGuesses > 2 ? 'text-[#FFBD2E]' : 'text-emerald-400'}>
                  {MAX_INCORRECT_GUESSES - incorrectGuesses}
                </span>
                <span className="text-[#8E9299] text-xs font-normal"> / {MAX_INCORRECT_GUESSES}</span>
              </div>
            </div>

            <div className="bg-[#151619] border border-[#2A2A2E] rounded-lg p-3">
              <div className="text-[10px] uppercase tracking-widest text-[#8E9299] font-mono mb-1">
                LETTERS GUESSED
              </div>
              <div className="text-sm font-mono font-bold text-[#F27D26] truncate">
                {guessedLetters.length > 0 ? guessedLetters.sort().join(', ').toUpperCase() : 'NONE'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Terminal Console Content */}
      <div
        id="terminal-output-container"
        className="flex-1 p-5 font-mono text-xs sm:text-sm overflow-y-auto space-y-1.5 select-text bg-[#0A0A0B] scrollbar-thin scrollbar-thumb-[#2A2A2E]"
        style={{ minHeight: '260px', maxHeight: '420px' }}
      >
        {history.map((entry) => {
          let styleClass = 'text-[#E0E0E0]';
          if (entry.type === 'header') styleClass = 'text-[#F27D26] font-bold';
          if (entry.type === 'system') styleClass = 'text-[#8E9299] font-medium';
          if (entry.type === 'input') styleClass = 'text-sky-400 font-semibold';
          if (entry.type === 'success') styleClass = 'text-[#27C93F] font-bold';
          if (entry.type === 'error') styleClass = 'text-[#FF5F56] font-bold';
          if (entry.type === 'warning') styleClass = 'text-[#FFBD2E]';
          if (entry.type === 'info') styleClass = 'text-[#F27D26] animate-pulse';

          return (
            <div key={entry.id} className={`whitespace-pre-wrap ${styleClass}`}>
              {entry.text}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Interactive Input Form */}
      <form
        onSubmit={handleInputSubmit}
        className="bg-[#121214] px-4 py-3 border-t border-[#2A2A2E] flex items-center gap-3"
      >
        <span className="font-mono text-xs sm:text-sm font-bold text-[#27C93F] shrink-0">
          {phase === 'start'
            ? '$'
            : phase === 'replay_prompt'
            ? 'Play again? (y/n):'
            : phase === 'exited'
            ? '$ (exited)'
            : 'Enter a letter:'}
        </span>
        <input
          id="terminal-input"
          ref={inputRef}
          type="text"
          value={inputValue}
          disabled={phase === 'exited'}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={
            phase === 'start'
              ? 'Press ENTER to start...'
              : phase === 'replay_prompt'
              ? 'y / n'
              : phase === 'exited'
              ? 'Press Reset above to start again'
              : 'Type single letter (e.g. p, y, t)...'
          }
          className="flex-1 bg-[#0A0A0B] border border-[#2A2A2E] rounded px-3 py-1.5 font-mono text-xs sm:text-sm text-white placeholder-[#8E9299] focus:outline-none focus:border-[#F27D26] focus:ring-1 focus:ring-[#F27D26]"
          autoComplete="off"
        />
        <button
          id="terminal-submit-btn"
          type="submit"
          disabled={phase === 'exited'}
          className="bg-[#F27D26] hover:bg-[#ff8f3d] text-[#0A0A0B] text-xs font-bold font-mono px-4 py-2 rounded transition-all flex items-center gap-1.5 disabled:opacity-40 active:scale-95"
        >
          <Play className="w-3 h-3 fill-current" />
          EXECUTE
        </button>
      </form>

      {/* Quick Testing Shortcuts Bar */}
      <div className="bg-[#1C1C1F] px-4 py-2 border-t border-[#2A2A2E] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#8E9299] gap-2">
        <div className="flex items-center gap-2">
          <span>Simulation Target:</span>
          <span className="text-white font-semibold">{secretWord ? secretWord.toUpperCase() : 'RANDOM CHOICE'}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[#8E9299]">Quick Test Word:</span>
          <button
            type="button"
            onClick={() => startNewGame('python')}
            className="bg-[#0A0A0B] hover:bg-[#2A2A2E] text-[#F27D26] px-2 py-0.5 rounded border border-[#2A2A2E] transition-colors"
          >
            "python"
          </button>
          <button
            type="button"
            onClick={() => startNewGame('keyboard')}
            className="bg-[#0A0A0B] hover:bg-[#2A2A2E] text-[#8E9299] hover:text-white px-2 py-0.5 rounded border border-[#2A2A2E] transition-colors"
          >
            "keyboard"
          </button>
        </div>
      </div>
    </div>
  );
};

