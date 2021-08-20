import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

function applyInverseWidth(num) {
  return num * (414 / screenWidth);
}

export default applyInverseWidth;
