import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

function applyDinamicSize(num) {
  return num * ((screenWidth * screenHeight) / (414 * 896));
}

export default applyDinamicSize;
