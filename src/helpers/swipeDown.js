import cloneDeep from "lodash.clonedeep";
import { addNumber } from "./addNumber";

export const swipeDown = (data, gameOver) => {
  console.log("swipe down");
  let oldArray = JSON.parse(JSON.stringify(data));
  let newArray = cloneDeep(data);

  for (let i = 3; i >= 0; i--) {
    let slow = newArray.length - 1;
    let fast = slow - 1;
    while (slow > 0) {
      if (fast === -1) {
        fast = slow - 1;
        slow--;
        continue;
      }
      if (newArray[slow][i] === 0 && newArray[fast][i] === 0) {
        fast--;
      } else if (newArray[slow][i] === 0 && newArray[fast][i] !== 0) {
        newArray[slow][i] = newArray[fast][i];
        newArray[fast][i] = 0;
        fast--;
      } else if (newArray[slow][i] !== 0 && newArray[fast][i] === 0) {
        fast--;
      } else if (newArray[slow][i] !== 0 && newArray[fast][i] !== 0) {
        if (newArray[slow][i] === newArray[fast][i]) {
          newArray[slow][i] = newArray[slow][i] + newArray[fast][i];
          newArray[fast][i] = 0;
          fast = slow - 1;
          slow--;
        } else {
          slow--;
          fast = slow - 1;
        }
      }
    }
  }
  if (JSON.stringify(newArray) !== JSON.stringify(oldArray)) {
    addNumber(newArray);
  }
  if (gameOver) {
    return newArray;
  } else {
    return newArray;
  }
};
