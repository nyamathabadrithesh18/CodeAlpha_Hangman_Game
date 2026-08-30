"""
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

    print("\n" + "=" * 40)
    print("NEW GAME STARTED")
    print("=" * 40)

    # Main game loop
    while incorrect_guesses < MAX_INCORRECT_GUESSES:
        current_display = display_word(secret_word, guessed_letters)
        remaining_attempts = MAX_INCORRECT_GUESSES - incorrect_guesses

        print("\n" + "-" * 40)
        print(f"Word: {current_display}")
        print(f"Incorrect guesses: {incorrect_guesses}/{MAX_INCORRECT_GUESSES}")
        print(f"Remaining attempts: {remaining_attempts}")

        if guessed_letters:
            print(f"Guessed letters: {', '.join(sorted(guessed_letters))}")
        else:
            print("Guessed letters: None")
        print("-" * 40)

        user_input = input("\nEnter a letter: ").strip()

        # 1. Handle empty input
        if not user_input:
            print("\nInvalid input! Input cannot be empty. Please enter a letter.")
            continue

        # 2. Handle multiple characters
        if len(user_input) > 1:
            print("\nInvalid input! Please enter only one letter at a time.")
            continue

        # 3. Handle numbers and special characters
        if not user_input.isalpha():
            print("\nInvalid input! Numbers and special characters are not allowed.")
            continue

        # Convert uppercase letters to lowercase
        letter = user_input.lower()

        # 4. Handle repeated guesses
        if letter in guessed_letters:
            print(f"\nYou already guessed '{letter}'! Try a different letter.")
            continue

        # Add letter to guessed letters list
        guessed_letters.append(letter)

        # 5. Check if the guess is correct or incorrect
        if letter in secret_word:
            print("\nGood guess!")

            # Check if all letters in the secret word have been guessed
            is_word_complete = all(char in guessed_letters for char in secret_word)
            if is_word_complete:
                print("\n================================")
                print("YOU WIN!")
                print("========")
                print(f"\nThe word was: {secret_word}")
                print("Congratulations!")
                return
        else:
            incorrect_guesses += 1
            remaining_attempts = MAX_INCORRECT_GUESSES - incorrect_guesses
            print("\nWrong guess!")
            print(f"\nIncorrect guesses: {incorrect_guesses}/{MAX_INCORRECT_GUESSES}")
            print(f"Remaining attempts: {remaining_attempts}")

    # 6. Lose condition reached (6 incorrect guesses)
    print("\n================================")
    print("GAME OVER!")
    print("==========")
    print(f"\nThe correct word was: {secret_word}")
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
    print("\nWelcome to the Hangman Game!\n")
    input("Press ENTER to start...")

    # Game replay loop
    while True:
        play_game()

        # Prompt user to play again
        while True:
            play_again = input("\nWould you like to play again? (y/n): ").strip().lower()
            if play_again == "y":
                break
            elif play_again == "n":
                print("\nThanks for playing CodeAlpha Hangman!")
                return
            else:
                print("Invalid input! Please enter 'y' to play again or 'n' to exit.")


if __name__ == "__main__":
    main()
