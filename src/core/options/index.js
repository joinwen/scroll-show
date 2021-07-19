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
export {
  defaultOptions,
  handleOptions
}
