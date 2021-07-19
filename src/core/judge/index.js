/**
 *
 * @param y 元素 在 父元素内的相对位置
 * @param options
 */
const judgeY = (y, options) => {
  let wrapped = options.wrapped,
    child = options.child,
    wHeight = options.wHeight,
    cHeight = options.cHeight,
    callback = options.cbY,
    top = options.top,
    bottom = options.bottom;
  if(y > bottom) {
    y += bottom;
  } else {
    y -= top;
  }
  if(y <= 0) {
    /**
     * 如果 y 为负数，元素被【上面】遮挡
     */
    let newY = y + cHeight;
    if(newY > 0) { // 部分遮挡
      callback(child, true, 1);
    } else {      // 全部遮挡
      callback(child, false, 1);
    }
  } else {
    /**
     * 如果 y 为 正数，元素可能被【下面】遮挡
     */
    if(y <= wHeight) { // 被【下面】部分遮挡
      callback(child, true, 2);
    } else {  // 被【下面】完全遮挡
      callback(child, false, 2);
    }
  }
}

const judgeX = (x, options) => {
  let wrapped = options.wrapped,
    child = options.child,
    wWidth = options.wWidth,
    cWidth = options.cWidth,
    callback = options.cbX,
    left = options.left,
    right = options.right;
  if(x > right) {
    x += right;
  } else {
    x -= left;
  }
  if(x <= 0) {
    /**
     * 如果 x 为负数，元素被【左面】遮挡
     */
    let newX = x + cWidth;
    if(newX > 0) { // 部分遮挡
      callback(child, true, 1);
    } else {      // 全部遮挡
      callback(child, false, 1);
    }
  } else {
    /**
     * 如果 x 为 正数，元素可能被【右面】遮挡
     */
    if(x <= wWidth) { // 被【右面】部分遮挡
      callback(child, true, 2);
    } else {  // 被【右面】完全遮挡
      callback(child, false, 2);
    }
  }
}
export {
  judgeX,
  judgeY
}
