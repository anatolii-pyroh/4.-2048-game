import "./App.css";
import { Box, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Cells from "./components/Cells";
import { useEffect, useRef } from "react";
import { initialize } from "./helpers/initialize";
import { updateState } from "./redux/reducers/gameDataSlice";
import { useEvent } from "./hooks/useEvent";
import { swipeUp } from "./helpers/swipeUp";
import { swipeDown } from "./helpers/swipeDown";
import { swipeLeft } from "./helpers/swipeLeft";
import { swipeRight } from "./helpers/swipeRight";

function App() {
  const data = useSelector((state) => state.gameData.cells);
  const dispatch = useDispatch();
  const executedRef = useRef(false);

  const UP_ARROW = 38;
  const DOWN_ARROW = 40;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;
  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case UP_ARROW:
        dispatch(updateState(swipeUp(data, false)));
        break;
      case DOWN_ARROW:
        dispatch(updateState(swipeDown(data, false)));
        break;
      case LEFT_ARROW:
        dispatch(updateState(swipeLeft(data, false)));
        break;
      case RIGHT_ARROW:
        dispatch(updateState(swipeRight(data, false)));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (executedRef.current) {
      return;
    } else {
      executedRef.current = true;
      dispatch(updateState(initialize(data)));
    }
  }, []);

  useEvent("keydown", () => handleKeyDown(event, data));

  return (
    <Container maxWidth='sm' className='App'>
      <Cells />
    </Container>
  );
}

export default App;
