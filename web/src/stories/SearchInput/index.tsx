import styled from "styled-components";
import Input from "../Input";
import Icon from "../Icon";

import { isMobileDevice } from "../../utils/responsiveness";
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_SPACING,
  INPUT_HEIGHT,
  MID_SPACING,
  SMALL_SPACING,
} from "../../constants/style-units";

type TextAreaProps = {
  onChange: (searchTerm: string) => void;
  value: string;
  placeholder: string;
};

const StyledSearchInput = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: ${isMobileDevice() ? "35rem" : "13rem"};

  .m-basic-input {
    margin-bottom: 0 !important;

    .p-inputtext {
      height: ${INPUT_HEIGHT};
      padding: ${SMALL_SPACING} 1.5rem ${SMALL_SPACING}
        ${isMobileDevice() ? MID_SPACING : "1.75rem"};
    }
  }
  .m-search-icon {
    position: absolute;
    left: ${SMALL_SPACING};
    ${isMobileDevice() ? `top: 2rem;` : ``}
  }
  .m-times-icon {
    position: absolute;
    right: ${DEFAULT_SPACING};
    cursor: pointer;
  }
`;

function SearchInput({
  onChange,
  value,
  placeholder,
}: Readonly<TextAreaProps>) {
  const iconSize = isMobileDevice() ? DEFAULT_FONT_SIZE : "0.85rem";
  return (
    <StyledSearchInput className="m-search-input">
      <Icon className="m-search-icon" iconName={"search"} size={iconSize} />
      <Input
        id={"search"}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder={placeholder}
      />
      {!!value && (
        <Icon
          className="m-times-icon"
          iconName={"times"}
          size={iconSize}
          onClick={() => onChange("")}
        />
      )}
    </StyledSearchInput>
  );
}

export default SearchInput;
