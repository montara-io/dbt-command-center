import ReactConfetti from "react-confetti";
import { YELLOW, BLUE, ACCENT } from "../../constants/colors";

function Confetti() {
  return (
    <ReactConfetti
      width={window.innerWidth}
      height={window.innerHeight}
      colors={[BLUE, YELLOW, ACCENT]}
      recycle={false}
      numberOfPieces={600}
    />
  );
}

export default Confetti;
