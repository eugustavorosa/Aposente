import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

function applyDinamicWidth(num) {
  return num * (screenWidth / 414);
}

export default applyDinamicWidth;
