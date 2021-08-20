import { Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

function applyDinamicHeight(num) {
  return num * (screenHeight / 896);
}

export default applyDinamicHeight;
