(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.scrollShow = factory());
}(this, (function () { 'use strict';

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
    child: null,
    border: true,
    forward: 0,
    cb: () => {}
  };
  const removeBorder = (wrapped, y) => {
    let bt = getStyle(wrapped, "border-top");
    return y - toNumber(bt);
  };

  const judgeY = (y, options) => {
    let wrapped = options.wrapped,
      child = options.child,
      callback = options.cb,
      border = options.border,
      forward = options.forward;
    y += forward;
    if(y <= 0) {
      let newY = y + (border ? child.offsetHeight : child.clientHeight);
      console.log(newY);
      if(newY > 0) {
        callback(child, true);
      } else {
        callback(child, false);
      }
    } else {
      if(y <= (wrapped.clientHeight) && y >= 2 * forward) {
        callback(child, true);
      } else {
        callback(child, false);
      }
    }
  };
  const scrollShow = (options) => {
    options = Object.assign(defaultOptions, options);
    let y = clientY(options.wrapped, options.child);
    y = removeBorder(options.wrapped, y);       // wrapped 元素的 border 宽度会计算进去，在这里减掉
    judgeY(y, options);
  };

  return scrollShow;

})));
