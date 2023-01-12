import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Letter from "../components /Letter";
import Line from "../components /Line";

const ALPHABET = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const Home: NextPage = () => {
  const [solution, setSolution] = useState("");
  const [letter, setLetter] = useState("");
  const [wordBank, setWordBank] = useState<string[]>(Array(6).fill(null));
  const [gameWon, setGameWon] = useState(false);
  const [youLost, setYouLost] = useState(0);

  useEffect(() => {
    const fetchWords = async () => {
      const response = await fetch("/words.json");
      const words = await response.json();

      // Randomly picking a word which needs to be guesses
      setSolution(words[Math.floor(Math.random() * words.length)]);
    };

    fetchWords();
  }, []);

  // Takes a value (letter) from a key from a Letter component
  function updateWord(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const target = event.target as HTMLButtonElement;
    setLetter(letter + target.value);
  }

  function handleSubmit() {
    if (gameWon) return;
    if (letter.length > 5) {
      window.alert("Too many letters, delete extra ones");
    }
    if (letter.length !== 5) return;

    const isCorrect = solution === letter;
    if (isCorrect) {
      setGameWon(true);
    }

    const newGuesses = [...wordBank];
    newGuesses[wordBank.findIndex((val) => val == null)] = letter;
    setWordBank(newGuesses);

    setLetter("");
    // Counts the number of words, if 6, loss
    setYouLost((prev) => prev + 1);
  }

  function deleteLetter() {
    setLetter(letter.slice(0, -1));
  }

  return (
    <section className="flex flex-col justify-end items-center min-h-screen pb-36 mt-12">
      {gameWon && <div>You Win</div>}
      {youLost === 6 && <div>You Lost</div>}
      <div className="h-full w-full flex flex-col justify-center items-center">
        {wordBank.map((word, index) => {
          const isCurrentLetter =
            index === wordBank.findIndex((val) => val == null);
          return (
            <div key={index} className="">
              <Line
                solution={solution}
                word={isCurrentLetter ? letter : word ?? ""}
              />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-6 gap-2 mt-16 w-[80vw] h-[30vh]">
        {ALPHABET.map((letter, index) => (
          <Letter
            key={index}
            letter={letter.toUpperCase()}
            updateWord={updateWord}
          />
        ))}
      </div>

      <div className="flex gap-3 mt-4 ">
        <button
          onClick={handleSubmit}
          className="bg-gray-500 rounded-md text-white px-4 py-4"
        >
          Enter
        </button>
        <button
          onClick={deleteLetter}
          className="bg-gray-500 rounded-md text-white px-4 py-4"
        >
          Delete
        </button>
      </div>
    </section>
  );
};

export default Home;
