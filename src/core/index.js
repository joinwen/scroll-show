import {clientY, getHeightWithMargin, getStyle, pageY, toNumber} from "../tools/index";

const defaultOptions = {
  wrapped: null,
  child: null,
  border: true,
  cb: () => {}
}
const removeBorder = (wrapped, y) => {
  let bt = getStyle(wrapped, "border-top");
  return y - toNumber(bt);
}

const judgeY = (y, options) => {
  let wrapped = options.wrapped,
    child = options.child,
    callback = options.cb,
    border = options.border;
  if(y <= 0) {
    let newY = y + (border ? child.offsetHeight : child.clientHeight);
    console.log(newY);
    if(newY > 0) {
      callback(child, true);
    } else {
      callback(child, false);
    }
  } else {
    if(y <= wrapped.clientHeight && y >= 0) {
      callback(child, true);
    } else {
      callback(child, false);
    }
  }
}
const scrollShow = (options) => {
  options = Object.assign(defaultOptions, options);
  let y = clientY(options.wrapped, options.child);
  y = removeBorder(options.wrapped, y);       // wrapped 元素的 border 宽度会计算进去，在这里减掉
  judgeY(y, options);
}
export default scrollShow;

