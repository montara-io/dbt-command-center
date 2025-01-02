import styled from "styled-components";
import TopBar from "./components/TopBar";
import RunDetails from "./RunDetails";
import ToastWrapper from "./components/ToastWrapper";
import { Dispatch, createContext, useMemo, useReducer } from "react";
import {
  MainAction,
  MainState,
  initialMainState,
  mainReducer,
} from "./main.redux";
import { white } from "./constants/colors";

type MainContextType = [MainState, Dispatch<MainAction>];

const StyledBody = styled.div`
  height: 100vh;
  width: 100%;
  background: ${white};
  overflow: hidden;
`;

export const MainContext = createContext<MainContextType>([
  initialMainState,
  (initialState) => initialState,
]);
function Main() {
  const [mainState, mainDispatch] = useReducer(mainReducer, initialMainState);
  const mainContextProviderValue: MainContextType = useMemo(
    () => [mainState, mainDispatch],
    [mainState]
  );
  return (
    <MainContext.Provider value={mainContextProviderValue}>
      <StyledBody>
        <TopBar />
        <RunDetails />
        <ToastWrapper />
      </StyledBody>
    </MainContext.Provider>
  );
}

export default Main;
