/**
 * 获取 dom 属性
 */
const getStyle = (ele, attr) => {
  return document.defaultView.getComputedStyle(ele)[attr];
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
const pageY = (ele) => {
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
const pageX = (ele) => {
  let x = 0;
  while(ele.offsetParent) {
    x += ele.offsetLeft;
    ele = ele.offsetParent;
  }
  return x;
}
