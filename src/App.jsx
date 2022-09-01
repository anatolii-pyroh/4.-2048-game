import { Box, Container } from "@mui/material";
import "./App.css";
// hooks, reducers
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useEvent } from "./hooks/useEvent";
import { updateGrid, updateIsGameOver } from "./redux/reducers/gameDataSlice";
// helpers
import { initialize } from "./helpers/initialize";
import { swipeUp, swipeDown, swipeLeft, swipeRight } from "./helpers/swipes";
import { checkIsGameOver } from "./helpers/isGameOver";
// components
import Grid from "./components/Grid";
import ResetButton from "./components/ResetButton";

function App() {
  const data = useSelector((state) => state.gameData.grid);
  let counter = 0;
  const gameOver = useSelector((state) => state.gameData.isGameOver);
  const executedRef = useRef(false);
  const dispatch = useDispatch();

  const UP_ARROW = 38;
  const DOWN_ARROW = 40;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;
  const handleKeyPress = (event) => {
    if (gameOver) {
      return;
    }
    switch (event.keyCode) {
      case UP_ARROW:
        dispatch(updateGrid(swipeUp(data)));
        break;
      case DOWN_ARROW:
        dispatch(updateGrid(swipeDown(data)));
        break;
      case LEFT_ARROW:
        dispatch(updateGrid(swipeLeft(data)));
        break;
      case RIGHT_ARROW:
        dispatch(updateGrid(swipeRight(data)));
        break;
      default:
        break;
    }
    // check if possible to continue swiping
    // if not, set gameOver to true
    let gameOverr = checkIsGameOver(data);
    console.log(checkIsGameOver(data));
    if (gameOverr) {
      dispatch(updateIsGameOver(true));
    }
  };

  // fix double useEffect call and initialize 2 numbers for 2 random blocks
  useEffect(() => {
    if (executedRef.current) {
      return;
    } else {
      executedRef.current = true;
      dispatch(updateGrid(initialize(data)));
    }
  }, []);
  // event listener on arrow key press
  useEvent("keydown", handleKeyPress);

  return (
    <Container maxWidth='sm' className='App'>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>2048</h1>
        <Box>
          <ResetButton />
          Score:
        </Box>
      </Box>
      <Grid />
      <p>
        <span>HOW TO PLAY:</span> use Arrow keys to swipe blocks{" "}
      </p>
    </Container>
  );
}

export default App;
