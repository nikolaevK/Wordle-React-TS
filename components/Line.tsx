type Props = {
  word: string;
  solution: string | undefined;
};

const Line = ({ word, solution }: Props) => {
  const tiles = [];
  let color = "";

  for (let i = 0; i < 5; i++) {
    const char = word[i];

    if (solution && word.length > 4 && word.length < 6) {
      if (solution[i] === char) {
        color = "green";
      } else if (solution.includes(char)) {
        color = "yellow";
      } else {
        color = "gray";
      }
    }

    tiles.push(
      <div
        key={i}
        style={{
          height: "70px",
          width: "70px",
          border: "1px solid  black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontStyle: "bold",
          background: `${color}`,
          borderRadius: "5px",
        }}
      >
        {char}
      </div>
    );
    // for each div different color
    color = "";
  }

  return <div className="flex">{tiles}</div>;
};

export default Line;
