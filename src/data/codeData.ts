export const HANGMAN_PYTHON_CODE = `"""
CodeAlpha Python Programming Internship - Task 1
Project Title: CodeAlpha Hangman Game
Description: A beginner-friendly text-based Hangman game built with Python.
"""

import random

# Predefined list of exactly 5 words (no external files or APIs used)
WORDS = ["python", "computer", "programming", "developer", "keyboard"]

# Maximum allowed incorrect guesses before losing
MAX_INCORRECT_GUESSES = 6


def choose_word():
    """
    Randomly selects and returns one word from the predefined words list.
    """
    return random.choice(WORDS)


def display_word(word, guessed_letters):
    """
    Returns the hidden word with correctly guessed letters revealed
    and unguessed letters represented as underscores, separated by spaces.
    Example: 'p _ t h _ n'
    """
    displayed = [letter if letter in guessed_letters else "_" for letter in word]
    return " ".join(displayed)


def play_game():
    """
    Handles a single round of the Hangman game.
    Manages user input, validation, guess tracking, and win/loss states.
    """
    secret_word = choose_word()
    guessed_letters = []
    incorrect_guesses = 0

    print("\\n" + "=" * 40)
    print("NEW GAME STARTED")
    print("=" * 40)

    # Main game loop
    while incorrect_guesses < MAX_INCORRECT_GUESSES:
        current_display = display_word(secret_word, guessed_letters)
        remaining_attempts = MAX_INCORRECT_GUESSES - incorrect_guesses

        print("\\n" + "-" * 40)
        print(f"Word: {current_display}")
        print(f"Incorrect guesses: {incorrect_guesses}/{MAX_INCORRECT_GUESSES}")
        print(f"Remaining attempts: {remaining_attempts}")

        if guessed_letters:
            print(f"Guessed letters: {', '.join(sorted(guessed_letters))}")
        else:
            print("Guessed letters: None")
        print("-" * 40)

        user_input = input("\\nEnter a letter: ").strip()

        # 1. Handle empty input
        if not user_input:
            print("\\nInvalid input! Input cannot be empty. Please enter a letter.")
            continue

        # 2. Handle multiple characters
        if len(user_input) > 1:
            print("\\nInvalid input! Please enter only one letter at a time.")
            continue

        # 3. Handle numbers and special characters
        if not user_input.isalpha():
            print("\\nInvalid input! Numbers and special characters are not allowed.")
            continue

        # Convert uppercase letters to lowercase
        letter = user_input.lower()

        # 4. Handle repeated guesses
        if letter in guessed_letters:
            print(f"\\nYou already guessed '{letter}'! Try a different letter.")
            continue

        # Add letter to guessed letters list
        guessed_letters.append(letter)

        # 5. Check if the guess is correct or incorrect
        if letter in secret_word:
            print("\\nGood guess!")

            # Check if all letters in the secret word have been guessed
            is_word_complete = all(char in guessed_letters for char in secret_word)
            if is_word_complete:
                print("\\n================================")
                print("YOU WIN!")
                print("========")
                print(f"\\nThe word was: {secret_word}")
                print("Congratulations!")
                return
        else:
            incorrect_guesses += 1
            remaining_attempts = MAX_INCORRECT_GUESSES - incorrect_guesses
            print("\\nWrong guess!")
            print(f"\\nIncorrect guesses: {incorrect_guesses}/{MAX_INCORRECT_GUESSES}")
            print(f"Remaining attempts: {remaining_attempts}")

    # 6. Lose condition reached (6 incorrect guesses)
    print("\\n================================")
    print("GAME OVER!")
    print("==========")
    print(f"\\nThe correct word was: {secret_word}")
    print("Better luck next time!")


def main():
    """
    Main function to display the welcome screen, start the game,
    and handle the replay option.
    """
    # 1. Start Screen
    print("================================")
    print("CODEALPHA HANGMAN")
    print("=================")
    print("\\nWelcome to the Hangman Game!\\n")
    input("Press ENTER to start...")

    # Game replay loop
    while True:
        play_game()

        # Prompt user to play again
        while True:
            play_again = input("\\nWould you like to play again? (y/n): ").strip().lower()
            if play_again == "y":
                break
            elif play_again == "n":
                print("\\nThanks for playing CodeAlpha Hangman!")
                return
            else:
                print("Invalid input! Please enter 'y' to play again or 'n' to exit.")


if __name__ == "__main__":
    main()
`;

export const README_MARKDOWN = `# CodeAlpha Hangman Game

**CodeAlpha Python Programming Internship – Task 1: Hangman Game**

---

## 1. Project Title
**CodeAlpha Hangman Game**

---

## 2. Project Description
The **CodeAlpha Hangman Game** is a beginner-friendly, text-based terminal game developed in Python. In this classic word-guessing game, the player attempts to guess a secret, hidden word one letter at a time within a limited number of attempts. 

The game selects a word at random from a predefined list of 5 computer science terms. The player has a maximum of **6 incorrect guesses** before losing. The project demonstrates core Python fundamentals such as control flow, collections, string manipulation, and input validation in a clean, modular structure.

---

## 3. Features
- **Clean Console Interface**: Clear visual separation with formatted headers, borders, and state summaries.
- **5 Predefined Words**: Built directly into the script without external file or API dependencies.
- **Dynamic Hidden Word Display**: Shows underscores for unguessed characters and reveals correct letters dynamically.
- **Robust Input Validation**:
  - Rejects empty inputs.
  - Rejects multi-character strings.
  - Rejects numbers and special symbols.
  - Prevents penalty for repeated letter guesses.
  - Case-insensitive (automatically converts uppercase input to lowercase).
- **Guess & Attempt Tracker**: Displays remaining attempts (out of 6 max incorrect guesses) and the complete list of guessed letters.
- **Win & Lose Conditions**: Informative outcome screens displaying the secret word.
- **Play Again Option**: Allows continuous replay without restarting the Python interpreter.

---

## 4. Technologies & Python Concepts Used
- **Python 3**: Core language.
- **\`random\` Module**: \`random.choice()\` for random word selection.
- **Functions & Modularity**: Structured logic split into \`choose_word()\`, \`display_word()\`, \`play_game()\`, and \`main()\`.
- **Loops**: \`while\` loops for game turns, input validation, and replay control.
- **Conditional Statements**: \`if\`, \`elif\`, and \`else\` for guess evaluation and rule enforcement.
- **Data Structures**:
  - \`list\` for word bank and tracking guessed letters.
  - String operations (\`.strip()\`, \`.lower()\`, \`.isalpha()\`, \`.join()\`).
- **Input/Output**: Standard \`input()\` and formatted \`print()\` output.

---

## 5. How to Run the Game

### Prerequisites
- Python 3.6 or higher installed on your computer.

### Step-by-Step Instructions

1. **Open your Terminal or Command Prompt**:
   - On Windows: Open Command Prompt (\`cmd\`) or PowerShell.
   - On macOS/Linux: Open Terminal.

2. **Navigate to the Project Directory**:
   \`\`\`bash
   cd path/to/CodeAlpha_Hangman
   \`\`\`

3. **Run the Script**:
   \`\`\`bash
   python hangman.py
   \`\`\`
   *(or \`python3 hangman.py\` on macOS/Linux)*

---

## 6. How the Game Works

1. **Start**: The user is greeted by the start screen and presses \`ENTER\` to begin.
2. **Word Selection**: The script randomly selects one word from:
   - \`python\`
   - \`computer\`
   - \`programming\`
   - \`developer\`
   - \`keyboard\`
3. **Guessing**:
   - The user inputs one letter per turn.
   - If the letter is in the word, it reveals all matching positions (\`Good guess!\`).
   - If the letter is not in the word, the incorrect guess count increases by 1 (\`Wrong guess!\`).
4. **End Game**:
   - **Win**: The user reveals all letters before reaching 6 incorrect guesses.
   - **Lose (Game Over)**: The user makes 6 incorrect guesses.
5. **Replay**: The user is prompted \`Would you like to play again? (y/n)\`.

---

## 7. Example Gameplay

\`\`\`text
================================
CODEALPHA HANGMAN
=================

Welcome to the Hangman Game!

Press ENTER to start...

========================================
NEW GAME STARTED
========================================

----------------------------------------
Word: _ _ _ _ _ _
Incorrect guesses: 0/6
Remaining attempts: 6
Guessed letters: None
----------------------------------------

Enter a letter: p

Good guess!

----------------------------------------
Word: p _ _ _ _ _
Incorrect guesses: 0/6
Remaining attempts: 6
Guessed letters: p
----------------------------------------

Enter a letter: a

Wrong guess!

Incorrect guesses: 1/6
Remaining attempts: 5

----------------------------------------
Word: p _ _ _ _ _
Incorrect guesses: 1/6
Remaining attempts: 5
Guessed letters: a, p
----------------------------------------

Enter a letter: y

Good guess!

----------------------------------------
Word: p y _ _ _ _
Incorrect guesses: 1/6
Remaining attempts: 5
Guessed letters: a, p, y
----------------------------------------

Enter a letter: t

Good guess!

----------------------------------------
Word: p y t _ _ _
Incorrect guesses: 1/6
Remaining attempts: 5
Guessed letters: a, p, t, y
----------------------------------------

Enter a letter: h

Good guess!

----------------------------------------
Word: p y t h _ _
Incorrect guesses: 1/6
Remaining attempts: 5
Guessed letters: a, h, p, t, y
----------------------------------------

Enter a letter: o

Good guess!

----------------------------------------
Word: p y t h o _
Incorrect guesses: 1/6
Remaining attempts: 5
Guessed letters: a, h, o, p, t, y
----------------------------------------

Enter a letter: n

Good guess!

================================
YOU WIN!
========

The word was: python
Congratulations!

Would you like to play again? (y/n): n

Thanks for playing CodeAlpha Hangman!
\`\`\`

---

## 8. CodeAlpha Internship Task Reference
This project was developed strictly in accordance with the project specifications for:
- **Internship**: CodeAlpha Python Programming Internship
- **Task**: Task 1 – Hangman Game
- **Developer**: Intern
- **Status**: Completed & Tested
`;
