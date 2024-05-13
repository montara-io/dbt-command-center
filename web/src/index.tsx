import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import RunDetails from "./RunDetails";
import GlobalStyle from "./styles/globalStyles";
import styled from "styled-components";

const StyledBody = styled.div`
  height: 100vh;
  min-width: 60vw;
  background: #fff;
  padding: 0.5rem 1rem 0rem 1rem;
  overflow: hidden;
`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyle />
    <StyledBody>
      <RunDetails />
    </StyledBody>
  </React.StrictMode>
);
