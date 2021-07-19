/**
 * 获取 dom 属性
 */
const getStyle = (ele, attr) => {
  try{
    return document.defaultView.getComputedStyle(ele)[attr];
  }catch (e) {
    return 0;
  }
};

/**
 * 字符串转数字
 */
const toNumber = (str) => {
  return Number.parseInt(str);
};

/**
 * 获取 高度
 */
const getHeight = (ele) => {
  let height = getStyle(ele,"height");
  return toNumber(height);
};

/**
 * 获取 高度 + 内边距
 */
const getHeightWithPadding = (ele) => {
  return ele.clientHeight;
};

/**
 * 获取 高度 + 内边距 + 边框
 */
const getHeightWithBorder = (ele) => {
  return ele.offsetHeight;
};

/**
 * 获取宽度
 */
const getWidth = (ele) => {
  let width = getStyle(ele, "width");
  return toNumber(width);
};

/**
 * 获取宽度 + 内边距
 */
const getWidthWithPadding = (ele) => {
  return ele.clientWidth;
};

/**
 * 获取 宽度 + 内边距 + 边框
 */
const getWidthWithBorder = (ele) => {
  return ele.offsetWidth;
};

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
};

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
};

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
};

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
};

/**
 *
 * @param y 元素 在 父元素内的相对位置
 * @param options
 */
const judgeY = (y, options) => {
  options.wrapped;
    let child = options.child,
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
};

const updatePositionByWLevel = (options, x, y) => {
  let wLevel = options.wLevel,
    wrapped = options.wrapped,
    pt = toNumber(getStyle(wrapped,"padding-top")),
    bt = toNumber(getStyle(wrapped, "border-top-width")),
    pl = toNumber(getStyle(wrapped, "padding-left")),
    bl = toNumber(getStyle(wrapped, "border-left-width"));
  switch (wLevel) {
    case 0: {
      y = y - pt - bt;
      x = x - pl - bl;
      options.wHeight = getHeight(wrapped);
      options.wWidth = getWidth(wrapped);
    }break;
    case 1: {
      y = y - bt;
      x = x - bl;
      options.wHeight = getHeightWithPadding(wrapped);
      options.wWidth = getWidthWithPadding(wrapped);
    }break;
    case 2: {
      y = y * 1;
      x = x * 1;
      options.wHeight = getHeightWithBorder(wrapped);
      options.wWidth = getWidthWithBorder(wrapped);
    }break;
  }
  return [x, y]
};

const updatePositionByCLevel = (options, x, y) => {
  let cLevel = options.cLevel,
    child = options.child,
    pt = toNumber(getStyle(child, "padding-top")),
    bt = toNumber(getStyle(child, "border-top-width")),
    pl = toNumber(getStyle(child, "padding-left")),
    bl = toNumber(getStyle(child, "border-left-width"));
  switch (cLevel) {
    case 0: {
      y = y + pt + bt;
      x = x + pl + bl;
      options.cHeight = getHeight(child);
      options.cWidth = getWidth(child);
    }break;
    case 1: {
      y = y + bt;
      x = x + bl;
      options.cHeight = getHeightWithPadding(child);
      options.cWidth = getWidthWithPadding(child);
    }break;
    case 2: {
      y = y * 1;
      x = x * 1;
      options.cHeight = getHeightWithBorder(child);
      options.cWidth = getWidthWithBorder(child);
    }break;
  }
  return [x, y];
};

const defaultOptions = {
  wrapped: null, // 父元素
  child: null, // 子元素
  wLevel: 1,  // 0: 只是内容区, 1: 内容区+内边距, 2: 内容区 + 内边距 + 边框
  cLevel: 2,  // 0: 只是内容区, 1: 内容区+内边距, 2: 内容区 + 内边距 + 边框
  symY: 0,    // 对称 Y 偏移
  symX: 0,    // 对称 X 偏移
  top: 0,     // top 偏移
  bottom: 0,  // bottom 偏移
  left: 0,    // left 偏移
  right: 0,   // right 偏移
  wHeight: 0, // 容器高度
  wWidth: 0,  // 容器宽度
  cHeight: 0, // 子元素高度
  cWidth: 0,  // 子元素宽度
  enableBCR: false, // 是否启用 getBoundingClientRect
  cbY: () => {
  },  // 回调函数
  cbX: () => {

  },  // 回调函数
  ratio: undefined, // 子元素出现比例 TODO
  ratioFn: undefined, // 子元素出现比例 自定义函数 TODO
};
const handleOptions = (options) => {
  let symY = options.symY,
    symX = options.symX;
  if(symY) {
    options.top = symY;
    options.bottom = symY;
  }
  if(symX) {
    options.left = symX;
    options.right = symX;
  }
};

const scrollShow = (options) => {
  options = Object.assign(defaultOptions, options);
  handleOptions(options);
  let y = clientY(options.wrapped, options.child, options.enableBCR);
  let x = clientX(options.wrapped, options.child, options.enableBCR);
  [x, y] = updatePositionByWLevel(options, x, y);
  [x, y] = updatePositionByCLevel(options, x, y);
  judgeY(y, options);
  // judgeX(x, options);
};

export default scrollShow;
