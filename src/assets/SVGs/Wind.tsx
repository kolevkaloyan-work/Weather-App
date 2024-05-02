import * as React from "react";
import Svg, { Path } from "react-native-svg";
const WindSVG = (props: any) => (
  <Svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 8h9.11A1.89 1.89 0 0 0 16 6.11v0c0-1.615-1.894-2.486-3.12-1.435L12.5 5M3 12h14.902C19.06 12 20 12.94 20 14.098v0c0 2.152-2.853 2.91-3.92 1.041L16 15M5 16h6.11A1.89 1.89 0 0 1 13 17.89v0c0 1.615-1.894 2.486-3.12 1.435L9.5 19"
    />
  </Svg>
);
export default WindSVG;
