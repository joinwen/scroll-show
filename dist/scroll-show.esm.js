/**
 * 获取 dom 属性
 */
const getStyle = (ele, attr) => {
  return document.defaultView.getComputedStyle(ele)[attr];
};

/**
 * 字符串转数字
 */
const toNumber = (str) => {
  return Number.parseInt(str);
};

/**
 * 获取 高度 + 内边距 + 边框
 */
const getHeightWithBorder = (ele) => {
  return ele.offsetHeight;
};

/**
 * 获取 高度 + 内边距 + 边框 + 外边距
 */
const getHeightWithMargin = (ele) => {
  let height = getHeightWithBorder(ele),
    mt = getStyle(ele, "margin-top"),
    mb = getStyle(ele, "margin-bottom");
  return height + toNumber(mt) + toNumber(mb);
};

/**
 * 获取元素的 pageY
 */
const pageY = (ele) => {
  let y = 0;
  while(ele.offsetParent) {
    y += ele.offsetTop;
    ele = ele.offsetParent;
  }
  return y;
};

/**
 * 获取 src 在 target 元素里的 clientY
 * @param target
 * @param src
 */
const clientY = (target, src) => {
  let srcY = pageY(src),
    targetY = pageY(target),
    scrollY = target.scrollTop || 0;     // 没有滚动 scrollY = 0
  return srcY - targetY - scrollY;
};

const defaultOptions = {
  wrapped: null,
  child: null
};
const removeBorder = (wrapped, y) => {
  let bt = getStyle(wrapped, "border-top");
  return y - toNumber(bt);
};

const scrollShow = (options) => {
  options = Object.assign(defaultOptions, options);
  let wrapped = options.wrapped,
    child = options.child;
  let y = clientY(wrapped, child),
    childHeight = getHeightWithMargin(child);
  y = removeBorder(wrapped, y);
  return [y, childHeight];
};

export default scrollShow;
