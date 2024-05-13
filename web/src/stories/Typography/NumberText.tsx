import Typography from ".";
import { NOT_AVAILABLE_DASH } from "../../constants";

function NumberText({ children }: Readonly<{ children: string | number }>) {
  const formatted = (
    Number(children) > 0 ? Number(children) : NOT_AVAILABLE_DASH
  ).toLocaleString();
  return (
    <Typography variant="normal-text" isEllipsis tooltip={formatted}>
      {formatted}
    </Typography>
  );
}

export default NumberText;
