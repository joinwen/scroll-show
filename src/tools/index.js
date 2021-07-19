/**
 * 获取 dom 属性
 */
const getStyle = (ele, attr) => {
  try{
    return document.defaultView.getComputedStyle(ele)[attr];
  }catch (e) {
    return 0;
  }
}

/**
 * 字符串转数字
 */
const toNumber = (str) => {
  return Number.parseInt(str);
}

/**
 * 获取 高度
 */
const getHeight = (ele) => {
  let height = getStyle(ele,"height");
  return toNumber(height);
}

/**
 * 获取 高度 + 内边距
 */
const getHeightWithPadding = (ele) => {
  return ele.clientHeight;
}

/**
 * 获取 高度 + 内边距 + 边框
 */
const getHeightWithBorder = (ele) => {
  return ele.offsetHeight;
}

/**
 * 获取 高度 + 内边距 + 边框 + 外边距
 */
const getHeightWithMargin = (ele) => {
  let height = getHeightWithBorder(ele),
    mt = getStyle(ele, "margin-top"),
    mb = getStyle(ele, "margin-bottom");
  return height + toNumber(mt) + toNumber(mb);
}

/**
 * 获取宽度
 */
const getWidth = (ele) => {
  let width = getStyle(ele, "width");
  return toNumber(width);
}

/**
 * 获取宽度 + 内边距
 */
const getWidthWithPadding = (ele) => {
  return ele.clientWidth;
}

/**
 * 获取 宽度 + 内边距 + 边框
 */
const getWidthWithBorder = (ele) => {
  return ele.offsetWidth;
}

/**
 * 获取 宽度 + 内边距 + 边框 + 外边距
 */
const getWidthWithMargin = (ele) => {
  let width = getWidthWithBorder(ele),
    ml = getStyle(ele, "margin-left"),
    mr = getStyle(ele,"margin-right");
  return width + toNumber(ml) + toNumber(mr);
}

/**
 * 获取元素的 pageY
 */
const pageY = (ele, bcr) => {
  if(bcr) {
    return ele.getBoundingClientRect()["y"];
  }
  let y = 0;
  while(ele.offsetParent) {
    y += ele.offsetTop;
    ele = ele.offsetParent;
  }
  return y;
}

/**
 * 获取元素的 pageX
 */
const pageX = (ele, bcr) => {
  if(bcr) {
    return ele.getBoundingClientRect()["x"];
  }
  let x = 0;
  while(ele.offsetParent) {
    x += ele.offsetLeft;
    ele = ele.offsetParent;
  }
  return x;
}

/**
 *
 * 获取 src 在 target 元素里的 clientX
 * @param target 相对的坐标系统
 * @param src
 */
const clientX = (target, src, bcr) => {
  let srcX = pageX(src, bcr),
    targetX = pageX(target, bcr),
    scrollX = target.offsetLeft || 0; // 没有滚动 scrollX = 0
  return bcr ? srcX - targetX : srcX - targetX - scrollX;
}

/**
 * 获取 src 在 target 元素里的 clientY
 * @param target
 * @param src
 */
const clientY = (target, src, bcr) => {
  let srcY = pageY(src, bcr),
    targetY = pageY(target, bcr),
    scrollY = target.scrollTop || 0;     // 没有滚动 scrollY = 0
  return bcr ? srcY - targetY : srcY - targetY - scrollY;
}

export {
  clientX,
  clientY,
  getHeight,
  getHeightWithPadding,
  getHeightWithBorder,
  getHeightWithMargin,
  getWidth,
  getWidthWithPadding,
  getWidthWithBorder,
  getWidthWithMargin,
  pageX,
  pageY,
  getStyle,
  toNumber
}
