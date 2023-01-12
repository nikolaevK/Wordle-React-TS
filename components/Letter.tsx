type Props = {
  letter: string;
  updateWord: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Letter = ({ letter, updateWord }: Props) => {
  return (
    <button
      className="px-4 py-6 text-white bg-gray-500 uppercase rounded-md"
      onClick={(e) => {
        updateWord(e);
      }}
      value={letter}
    >
      {letter}
    </button>
  );
};

export default Letter;
