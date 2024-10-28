import React from "react";

const AlphabetList = ({
  onLetterClick,
}: {
  onLetterClick: (lette: string) => void;
}) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="absolute right-0 top-0 space-y-2">
      {alphabet.map((letter) => (
        <div
          key={letter}
          className="cursor-pointer text-xs text-gray-700 hover:text-green-600 hover:scale-110"
          onClick={() => onLetterClick(letter)}
        >
          {letter}
        </div>
      ))}
    </div>
  );
};

export default AlphabetList;
