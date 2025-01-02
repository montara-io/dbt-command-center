import { REQUIRED } from "../../constants/colors";
import { SMALL_SPACING } from "../../constants/style-units";
import { isMobileDevice } from "../../utils/responsiveness";
import Typography from "../Typography";

type InputErrorProps = {
  errorMessage: string;
};

function InputError({ errorMessage }: Readonly<InputErrorProps>) {
  return (
    <Typography
      style={{
        display: "block",
        marginTop: SMALL_SPACING,
        color: REQUIRED,
        maxWidth: isMobileDevice() ? "45rem" : "25rem",
      }}
      variant="small-text"
      className="m-input-error"
    >
      {errorMessage}
    </Typography>
  );
}

export default InputError;
