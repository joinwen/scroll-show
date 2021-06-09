import {clientY, getHeightWithMargin, getStyle, pageY, toNumber} from "../tools/index";

const defaultOptions = {
  wrapped: null,
  child: null
}
const removeBorder = (wrapped, y) => {
  let bt = getStyle(wrapped, "border-top");
  return y - toNumber(bt);
}

const scrollShow = (options) => {
  options = Object.assign(defaultOptions, options);
  let wrapped = options.wrapped,
    child = options.child;
  let y = clientY(wrapped, child),
    childHeight = getHeightWithMargin(child);
  y = removeBorder(wrapped, y);
  return [y, childHeight];
}
export default scrollShow;

