// globalStyles.js
import { createGlobalStyle } from "styled-components";

import { Colors } from "@blueprintjs/core/lib/esm/common";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";
import { isMobileDevice } from "../utils/responsiveness";
import {
  BOLD,
  CHECKBOX_SIZE,
  DEFAULT_FONT_SIZE,
  DEFAULT_SPACING,
  SMALL_FONT_SIZE,
  SMALL_SPACING,
  TINY_SPACING,
} from "../constants/style-units";
import {
  ALERT_SUCCESS,
  BORDER_LIGHT,
  GRAY_230,
  GRAY_270,
  INPUT_BORDER,
  alertInfo,
  BLUE,
  boxShadow,
  gray220,
  gray250,
  primary,
  tableHeaderBackground,
  white,
} from "../constants/colors";

const GlobalStyle = createGlobalStyle`
/**** Start Blueprint *****/
/* multi select */
.bp4-multi-select-popover .bp4-menu {
  max-height: 300px;
  max-width: 470px;
  overflow: auto;
}

/* Input fields */
.bp4-input {
  border: 0.7px solid ${Colors.LIGHT_GRAY1};
  box-shadow: inset 0px 1px 1px rgba(16, 22, 26, 0.2);
}

.bp4-input::placeholder {
  color: ${Colors.GRAY3};
}

.disabled-filter input,
.disabled-filter > .bp4-input,
.disabled-filter.bp4-input {
  background: none !important;
  color: ${Colors.DARK_GRAY1} !important;
}

.disabled-filter > select,
.disabled-filter > button {
  background-color: ${Colors.LIGHT_GRAY5} !important;
  color: ${Colors.DARK_GRAY1} !important;
}
.disabled-filter > .bp4-icon-caret-down,
.disabled-filter > .bp4-icon-double-caret-vertical,
.disabled-filter > .bp4-button-group {
  display: none; /* Remove select arrow */
}

.bp4-multi-select-tag-input-input::placeholder {
  color: ${Colors.GRAY3};
}

.bp4-dialog-container {
  padding-top: 110px; !important;
  align-items: flex-start !important;
}

.ace_editor.ace_autocomplete {
  width: 500px;
}

.toast-with-no-close-button [aria-label="Close"] {
  display: none;
}

/* Dadi changes */

.bp4-card {
  padding: 1rem;
}

.bp4-popover2-transition-container {
  z-index: 5718;
}
.bp4-popover2-content {
  font-size: ${DEFAULT_FONT_SIZE};
  max-width: 25rem;
}

.bp4-tooltip2.bp4-intent-success .bp4-popover2-content {
  background: ${ALERT_SUCCESS};
  color: ${primary};
}
.bp4-tooltip2.bp4-intent-success .bp4-popover2-arrow-fill {
  fill: ${ALERT_SUCCESS};
}

.m-feature-announcement-popover .bp4-overlay-content {
  z-index: 1100;
}

.bp4-label, .bp4-button, .bp4-key-combo, .bp4-input, .bp4-html-select select {
  font-family: Poppins, sans-serif;
}
text {
  font-family: Poppins, sans-serif !important;
}

.bp4-html-table th {
  background: ${tableHeaderBackground} !important;

  padding: 0.5rem !important;
  font-size: ${SMALL_FONT_SIZE} !important;
}

.bp4-html-table td {
  padding: 0.5rem !important;
  font-size: ${SMALL_FONT_SIZE} !important;
  background: ${white} !important;
}
.bp4-html-table {
  border: 1px solid ${BORDER_LIGHT} !important;
}



/* multi select */
.bp4-multi-select-popover .bp4-menu {
  max-height: 300px;
  max-width: 470px;
  overflow: auto;
}

/* Input fields */
.bp4-input {
  border: 0.7px solid ${Colors.LIGHT_GRAY1};
  box-shadow: inset 0px 1px 1px rgba(16, 22, 26, 0.2);
}

.bp4-input::placeholder {
  color: ${Colors.GRAY3};
}

.disabled-filter input,
.disabled-filter > .bp4-input,
.disabled-filter.bp4-input {
  background: none !important;
  color: ${Colors.DARK_GRAY1} !important;
}

.disabled-filter > select,
.disabled-filter > button {
  background-color: ${Colors.LIGHT_GRAY5} !important;
  color: ${Colors.DARK_GRAY1} !important;
}
.disabled-filter > .bp4-icon-caret-down,
.disabled-filter > .bp4-icon-double-caret-vertical,
.disabled-filter > .bp4-button-group {
  display: none; /* Remove select arrow */
}

.bp4-multi-select-tag-input-input::placeholder {
  color: ${Colors.GRAY3};
}

.bp4-dialog-container {
  padding-top: 110px; !important;
  align-items: flex-start !important;
}

.ace_editor.ace_autocomplete {
  width: 500px;
}

.toast-with-no-close-button [aria-label="Close"] {
  display: none;
}

/* Dadi changes */

.bp4-card {
  padding: 1rem;
}

.bp4-popover2-transition-container {
  z-index: 5718;
}
.bp4-popover2-content {
  font-size: ${DEFAULT_FONT_SIZE};
  max-width: 25rem;
}

.bp4-label, .bp4-button, .bp4-key-combo, .bp4-input, .bp4-html-select select {
  font-family: Poppins, sans-serif;
}
text {
  font-family: Poppins, sans-serif !important;
}

.bp4-html-table th {
  background: ${tableHeaderBackground} !important;

  padding: 0.5rem !important;
  font-size: ${SMALL_FONT_SIZE} !important;
}

.bp4-html-table td {
  padding: 0.5rem !important;
  font-size: ${SMALL_FONT_SIZE} !important;
  background: ${white} !important;
}
.bp4-html-table {
  border: 1px solid ${BORDER_LIGHT} !important;
}

.bp4-menu-item.bp4-selected {
  background: ${gray220} !important;
  color: ${primary} !important;
}

.bp4-menu-item-icon {
  color: ${primary} !important;
}
/**** End Blueprint *****/


html, body {
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    font-size: calc(13px + (16 - 13) * ((100vw - 1440px) / (1920 - 1440)));
    font-family: 'Poppins', sans-serif !important;
}

body {
    margin: 0;
    padding: 0;
    color: #222222;
    background: linear-gradient(rgb(47, 77, 111), rgb(110, 131, 154));
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
  
#root {
  height: 100%;
  background: linear-gradient(rgb(47, 77, 111), rgb(110, 131, 154));
}

.App {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    .m-toast{
      .p-toast-top-center{
        top: 50px;
      }
    }
}

.center {
    align-items: center;
    margin-left: auto;
    margin-right: auto;
}

.fadeout {
  -webkit-animation: fadeout .3s linear forwards;
    animation: fadeout .3s linear forwards;
}

[class*="selected--"] {
  font-weight: bold;
}

@-webkit-keyframes fadeout {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes fadeout {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

// Dadi Changes
h2 {
  font-weight: 600;
}
h3 {
  font-family: 'Poppins', sans-serif;
}
.m-popovr {
  max-width: 100%;
}
.p-component {
  font-family: 'Poppins', sans-serif !important;
}
.p-checkbox .p-checkbox-box.p-highlight {
  border-color: ${BLUE} !important;
  background-color: ${BLUE} !important;
  
}
.p-checkbox .p-checkbox-box {
  height: ${CHECKBOX_SIZE};
  width: ${CHECKBOX_SIZE};
  .p-checkbox-icon {
    font-size: ${DEFAULT_FONT_SIZE};
  }
}

.p-multiselect-panel {
  font-size: ${DEFAULT_FONT_SIZE} !important;
}
.p-multiselect-panel .p-multiselect-items .p-multiselect-item.p-highlight {
  background-color: ${gray250} !important;
}
.p-multiselect-item {
  font-size: ${DEFAULT_FONT_SIZE};
  .p-checkbox {
    height: ${CHECKBOX_SIZE};
    width: ${CHECKBOX_SIZE};
  }
}

.p-multiselect-close {
  height: 1rem !important;
  width: 1rem !important;
  .p-multiselect-close-icon {
    font-size: ${DEFAULT_FONT_SIZE} !important;
  }
}
  

.m-flex-align-center {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

h1,h2,h3,h4 {
  font-weight: ${BOLD};
}
h4 {
  margin-top: ${DEFAULT_SPACING};
  margin-bottom: ${DEFAULT_SPACING};
}

svg {
  outline: none;
}
img {
  max-width: 100%;
}
.mantine-Popover-dropdown {
  width: 16rem !important;
  &.m-popover-dropdown-dark {
    background: ${BLUE};
    color: ${white};
  }
  
}

.p-inputtext:enabled:focus, .p-inputswitch.p-focus .p-inputswitch-slider {
  box-shadow: 0 0 0 1px ${boxShadow};
}

.p-datepicker table td > span.p-highlight {
  background: ${alertInfo};
}

// Dropdown
.m-basic-dropdown {
  position: relative;
  
  .p-dropdown {
    width: 100%;
    max-width: ${isMobileDevice() ? "40rem" : "20rem"};
    border-radius: 0;
    border: none;
    border-bottom: 2px solid ${GRAY_230};
    outline: none;
    font-family: inherit;
    .p-dropdown-trigger {
      width: 1.8rem;
    }
    .p-dropdown-label {
      font-size: ${DEFAULT_FONT_SIZE};
    }

    .p-dropdown-trigger-icon.pi.pi-chevron-down.p-clickable,
    .p-dropdown-trigger-icon.p-clickable.pi.pi-chevron-up {
      font-size: x-small;
    }

    &:not(.p-disabled).p-focus {
      box-shadow: none;
      border-color: ${GRAY_230};
    }

    &:not(.p-disabled):hover {
      border-color: ${GRAY_230};
    }

    .p-inputtext {
      padding-left: 0;
      font-family: inherit;
    }
  }

  .p-component {
    font-family: inherit;
  }

  
}

.p-dropdown-panel {
  .p-dropdown-items {
    padding: 0;
    
    .p-dropdown-item {
      padding: ${isMobileDevice() ? DEFAULT_SPACING : "0.75rem"};
      font-size: ${DEFAULT_FONT_SIZE};
    }
  }
  .p-dropdown-empty-message {
    font-size: ${DEFAULT_FONT_SIZE};
  }
}

.p-dropdown-items {
  .p-dropdown-item.p-highlight {
    display: none;
  }

  .p-dropdown-item {
    display: flex;
    align-items: center;
    font-family: Poppins;
    &:not(:last-child) {
      border-bottom: none;
      &::after {
        content: '';
        border-bottom: 1px solid ${GRAY_230};
        position: absolute;
        left: 15px;
        right: 15px;
        bottom: 0px;
      }
    }
    &:not(.p-disabled):hover {
      background-color: ${GRAY_270} !important;
    }
  }
}

.p-dropdown-panel {
  margin-left: ${isMobileDevice() ? 0 : "-10px"};
  .p-dropdown-header {
    background-color: transparent;
    &::after {
      content: '';
      border-bottom: 1px solid ${INPUT_BORDER};
      position: absolute;
      left: 10px;
      right: 10px;
      top: 2.75rem;
    }
  }
}

.p-dropdown-filter-container {
  .p-dropdown-filter {
    font-size: ${DEFAULT_FONT_SIZE};
    padding: ${TINY_SPACING};
  }
  .p-dropdown-filter-icon {
    font-size: 0.875rem;
  }
}


// Tooltip
.p-tooltip.p-component {
  
  .p-tooltip-text {
    font-size: ${DEFAULT_FONT_SIZE};
    padding: ${SMALL_SPACING};
  }
}



`;

export default GlobalStyle;
