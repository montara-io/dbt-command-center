import { CODE_FONT } from '../../constants';
import { BOLD } from '../../styles/style-units';

function CodeText({ children }: Readonly<{ children: string }>) {
  return <span style={{ fontFamily: CODE_FONT, fontWeight: BOLD }}>{children}</span>;
}

export default CodeText;
