import {clientY, getStyle, toNumber} from "../tools/index";

const defaultOptions = {
  wrapped: null,
  child: null,
  wLevel: 0,  // 0: 只是内容区, 1: 内容区+内边距, 2: 内容区 + 内边距 + 边框
  cLevel: 0,  // 0: 只是内容区, 1: 内容区+内边距, 2: 内容区 + 内边距 + 边框
  forward: 0,
  cb: () => {}
}
const removeBorder = (wrapped, y) => {
  let bt = getStyle(wrapped, "border-top");
  return y - toNumber(bt);
}
const updatePositionByWLevel = (options, y) => {
  let wLevel = options.wLevel,
    wrapped = options.wrapped,
    pt = getStyle(wrapped,"padding-top"),
    bt = getStyle(wrapped, "border-top");
  switch (wLevel) {
    case 0: {
      y = y - pt - bt;
    }break;
    case 1: {
      y = y - bt;
    }break;
    case 2: {
      y = y * 1;
    }break;
  }
  return y;
}

/**
 *
 * @param y 元素 在 父元素内的相对位置
 * @param options
 */
const judgeY = (y, options) => {
  let wrapped = options.wrapped,
    child = options.child,
    callback = options.cb,
    cLevel = options.cLevel,
    forward = options.forward;
  y += forward;
  if(y <= 0) {
    /**
     * 如果 y 为负数，元素被【上面】遮挡
     */
    let newY = y + (cLevel ? child.offsetHeight : child.clientHeight);
    if(newY > 0) { // 部分遮挡
      callback(child, true);
    } else {      // 全部遮挡
      callback(child, false);
    }
  } else {
    /**
     * 如果 y 为 正数，元素可能被【下面】遮挡
     */
    if(y <= (wrapped.clientHeight) && y >= 2 * forward) { // 被【下面】部分遮挡
      callback(child, true);
    } else {  // 被【下面】完全遮挡
      callback(child, false);
    }
  }
}
const scrollShow = (options) => {
  options = Object.assign(defaultOptions, options);
  let y = clientY(options.wrapped, options.child);
  y = updatePositionByWLevel(options, y);       // wrapped 元素的 border 宽度会计算进去，在这里减掉
  judgeY(y, options);
}
export default scrollShow;

