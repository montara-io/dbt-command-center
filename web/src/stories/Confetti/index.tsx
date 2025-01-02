import ReactConfetti from "react-confetti";
import { PRIMARY, ACCENT, WARNING_TEXT } from "../../constants/colors";

function Confetti() {
  return (
    <ReactConfetti
      width={window.innerWidth}
      height={window.innerHeight}
      colors={[PRIMARY, WARNING_TEXT, ACCENT]}
      recycle={false}
      numberOfPieces={600}
    />
  );
}

export default Confetti;
