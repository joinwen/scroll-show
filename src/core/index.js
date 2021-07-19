import {
  clientX,
  clientY
} from "../tools/index";
import {judgeX, judgeY} from "./judge";
import {updatePositionByCLevel, updatePositionByWLevel} from "./position";
import {defaultOptions, handleOptions} from "./options";

const scrollShow = (options) => {
  options = Object.assign(defaultOptions, options);
  handleOptions(options);
  let y = clientY(options.wrapped, options.child, options.enableBCR);
  let x = clientX(options.wrapped, options.child, options.enableBCR);
  [x, y] = updatePositionByWLevel(options, x, y);
  [x, y] = updatePositionByCLevel(options, x, y);
  judgeY(y, options);
  // judgeX(x, options);
}
export default scrollShow;

