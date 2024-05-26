import { useState } from "react";
import {
  Dropdown as PDropdown,
  DropdownValueTemplateType,
  DropdownProps as PDropdownProps,
} from "primereact/dropdown";
import InputLabel from "../InputLabel";
import { sortByKey } from "../../utils/arrays";
import Typography from "../Typography";

const MIN_FILTER_LENGTH = 5;

export type DropDownItem = {
  label: string;
  value: string;
};

export interface DropdownProps extends PDropdownProps {
  id: string;
  options: DropDownItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (e: any) => void;
  placeholder?: string;
  label?: string;
  isDisabled?: boolean;
  selectedByValue?: string;
  selectedTemplate?: DropdownValueTemplateType;
  tooltip?: string;
  style?: object;
  className?: string;
  hideDropdownIcon?: boolean;
  helpLinkTooltip?: string;
  helperText?: string;
  appendToSelf?: boolean;
  wrapperClass?: string;
}

function Dropdown({
  isDisabled,
  id,
  label,
  onChange,
  options,
  placeholder,
  selectedByValue,
  selectedTemplate,
  tooltip,
  style = {},
  className = "",
  helpLinkTooltip = "",
  helperText = "",
  appendToSelf = false,
  wrapperClass = "",
  ...props
}: Readonly<DropdownProps>) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`m-basic-dropdown p-field ${wrapperClass}`}>
      {!!label && (
        <InputLabel
          inputId={`${id}-label`}
          labelText={label}
          helpLinkTooltip={helpLinkTooltip}
        />
      )}
      <PDropdown
        tooltip={tooltip}
        id={id}
        value={selectedByValue}
        options={sortByKey({ arr: options, key: "label" })}
        onChange={onChange}
        placeholder={placeholder}
        disabled={isDisabled}
        panelClassName={`m-dropdown-panel-${id}`}
        filter={options?.length > MIN_FILTER_LENGTH}
        valueTemplate={selectedTemplate}
        appendTo={appendToSelf ? "self" : document.body}
        onShow={() => setOpen(true)}
        onHide={() => setOpen(false)}
        dropdownIcon={open ? "pi pi-chevron-up" : "pi pi-chevron-down"}
        style={{ ...style }}
        className={className}
        {...props}
      />
      {!!helperText && (
        <Typography variant="small-text">{helperText}</Typography>
      )}
    </div>
  );
}

export default Dropdown;
