'use strict';

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
  return ~~Number.parseInt(str);
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

module.exports = scrollShow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXNob3cuY2pzLmpzIiwic291cmNlcyI6WyIuLi9zcmMvdG9vbHMvaW5kZXguanMiLCIuLi9zcmMvY29yZS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog6I635Y+WIGRvbSDlsZ7mgKdcclxuICovXHJcbmNvbnN0IGdldFN0eWxlID0gKGVsZSwgYXR0cikgPT4ge1xyXG4gIHRyeXtcclxuICAgIHJldHVybiBkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGVsZSlbYXR0cl07XHJcbiAgfWNhdGNoIChlKSB7XHJcbiAgICByZXR1cm4gMDtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlrZfnrKbkuLLovazmlbDlrZdcclxuICovXHJcbmNvbnN0IHRvTnVtYmVyID0gKHN0cikgPT4ge1xyXG4gIHJldHVybiB+fk51bWJlci5wYXJzZUludChzdHIpO1xyXG59XHJcblxyXG4vKipcclxuICog6I635Y+WIOmrmOW6plxyXG4gKi9cclxuY29uc3QgZ2V0SGVpZ2h0ID0gKGVsZSkgPT4ge1xyXG4gIGxldCBoZWlnaHQgPSBnZXRTdHlsZShlbGUsXCJoZWlnaHRcIik7XHJcbiAgcmV0dXJuIHRvTnVtYmVyKGhlaWdodCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5Yg6auY5bqmICsg5YaF6L656LedXHJcbiAqL1xyXG5jb25zdCBnZXRIZWlnaHRXaXRoUGFkZGluZyA9IChlbGUpID0+IHtcclxuICByZXR1cm4gZWxlLmNsaWVudEhlaWdodDtcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPliDpq5jluqYgKyDlhoXovrnot50gKyDovrnmoYZcclxuICovXHJcbmNvbnN0IGdldEhlaWdodFdpdGhCb3JkZXIgPSAoZWxlKSA9PiB7XHJcbiAgcmV0dXJuIGVsZS5vZmZzZXRIZWlnaHQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5Yg6auY5bqmICsg5YaF6L656LedICsg6L655qGGICsg5aSW6L656LedXHJcbiAqL1xyXG5jb25zdCBnZXRIZWlnaHRXaXRoTWFyZ2luID0gKGVsZSkgPT4ge1xyXG4gIGxldCBoZWlnaHQgPSBnZXRIZWlnaHRXaXRoQm9yZGVyKGVsZSksXHJcbiAgICBtdCA9IGdldFN0eWxlKGVsZSwgXCJtYXJnaW4tdG9wXCIpLFxyXG4gICAgbWIgPSBnZXRTdHlsZShlbGUsIFwibWFyZ2luLWJvdHRvbVwiKTtcclxuICByZXR1cm4gaGVpZ2h0ICsgdG9OdW1iZXIobXQpICsgdG9OdW1iZXIobWIpO1xyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5a695bqmXHJcbiAqL1xyXG5jb25zdCBnZXRXaWR0aCA9IChlbGUpID0+IHtcclxuICBsZXQgd2lkdGggPSBnZXRTdHlsZShlbGUsIFwid2lkdGhcIik7XHJcbiAgcmV0dXJuIHRvTnVtYmVyKHdpZHRoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPluWuveW6piArIOWGhei+uei3nVxyXG4gKi9cclxuY29uc3QgZ2V0V2lkdGhXaXRoUGFkZGluZyA9IChlbGUpID0+IHtcclxuICByZXR1cm4gZWxlLmNsaWVudFdpZHRoO1xyXG59XHJcblxyXG4vKipcclxuICog6I635Y+WIOWuveW6piArIOWGhei+uei3nSArIOi+ueahhlxyXG4gKi9cclxuY29uc3QgZ2V0V2lkdGhXaXRoQm9yZGVyID0gKGVsZSkgPT4ge1xyXG4gIHJldHVybiBlbGUub2Zmc2V0V2lkdGg7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5Yg5a695bqmICsg5YaF6L656LedICsg6L655qGGICsg5aSW6L656LedXHJcbiAqL1xyXG5jb25zdCBnZXRXaWR0aFdpdGhNYXJnaW4gPSAoZWxlKSA9PiB7XHJcbiAgbGV0IHdpZHRoID0gZ2V0V2lkdGhXaXRoQm9yZGVyKGVsZSksXHJcbiAgICBtbCA9IGdldFN0eWxlKGVsZSwgXCJtYXJnaW4tbGVmdFwiKSxcclxuICAgIG1yID0gZ2V0U3R5bGUoZWxlLFwibWFyZ2luLXJpZ2h0XCIpO1xyXG4gIHJldHVybiB3aWR0aCArIHRvTnVtYmVyKG1sKSArIHRvTnVtYmVyKG1yKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPluWFg+e0oOeahCBwYWdlWVxyXG4gKi9cclxuY29uc3QgcGFnZVkgPSAoZWxlKSA9PiB7XHJcbiAgbGV0IHkgPSAwO1xyXG4gIHdoaWxlKGVsZS5vZmZzZXRQYXJlbnQpIHtcclxuICAgIHkgKz0gZWxlLm9mZnNldFRvcDtcclxuICAgIGVsZSA9IGVsZS5vZmZzZXRQYXJlbnQ7XHJcbiAgfVxyXG4gIHJldHVybiB5O1xyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5YWD57Sg55qEIHBhZ2VYXHJcbiAqL1xyXG5jb25zdCBwYWdlWCA9IChlbGUpID0+IHtcclxuICBsZXQgeCA9IDA7XHJcbiAgd2hpbGUoZWxlLm9mZnNldFBhcmVudCkge1xyXG4gICAgeCArPSBlbGUub2Zmc2V0TGVmdDtcclxuICAgIGVsZSA9IGVsZS5vZmZzZXRQYXJlbnQ7XHJcbiAgfVxyXG4gIHJldHVybiB4O1xyXG59XHJcblxyXG4vKipcclxuICpcclxuICog6I635Y+WIHNyYyDlnKggdGFyZ2V0IOWFg+e0oOmHjOeahCBjbGllbnRYXHJcbiAqIEBwYXJhbSB0YXJnZXQg55u45a+555qE5Z2Q5qCH57O757ufXHJcbiAqIEBwYXJhbSBzcmNcclxuICovXHJcbmNvbnN0IGNsaWVudFggPSAodGFyZ2V0LCBzcmMpID0+IHtcclxuICBsZXQgc3JjWCA9IHBhZ2VYKHNyYyksXHJcbiAgICB0YXJnZXRYID0gcGFnZVgodGFyZ2V0KSxcclxuICAgIHNjcm9sbFggPSB0YXJnZXQub2Zmc2V0TGVmdCB8fCAwOyAvLyDmsqHmnInmu5rliqggc2Nyb2xsWCA9IDBcclxuICByZXR1cm4gc3JjWCAtIHRhcmdldFggLSBzY3JvbGxYO1xyXG59XHJcblxyXG4vKipcclxuICog6I635Y+WIHNyYyDlnKggdGFyZ2V0IOWFg+e0oOmHjOeahCBjbGllbnRZXHJcbiAqIEBwYXJhbSB0YXJnZXRcclxuICogQHBhcmFtIHNyY1xyXG4gKi9cclxuY29uc3QgY2xpZW50WSA9ICh0YXJnZXQsIHNyYykgPT4ge1xyXG4gIGxldCBzcmNZID0gcGFnZVkoc3JjKSxcclxuICAgIHRhcmdldFkgPSBwYWdlWSh0YXJnZXQpLFxyXG4gICAgc2Nyb2xsWSA9IHRhcmdldC5zY3JvbGxUb3AgfHwgMDsgICAgIC8vIOayoeaciea7muWKqCBzY3JvbGxZID0gMFxyXG4gIHJldHVybiBzcmNZIC0gdGFyZ2V0WSAtIHNjcm9sbFk7XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgY2xpZW50WCxcclxuICBjbGllbnRZLFxyXG4gIGdldEhlaWdodCxcclxuICBnZXRIZWlnaHRXaXRoUGFkZGluZyxcclxuICBnZXRIZWlnaHRXaXRoQm9yZGVyLFxyXG4gIGdldEhlaWdodFdpdGhNYXJnaW4sXHJcbiAgZ2V0V2lkdGgsXHJcbiAgZ2V0V2lkdGhXaXRoUGFkZGluZyxcclxuICBnZXRXaWR0aFdpdGhCb3JkZXIsXHJcbiAgZ2V0V2lkdGhXaXRoTWFyZ2luLFxyXG4gIHBhZ2VYLFxyXG4gIHBhZ2VZLFxyXG4gIGdldFN0eWxlLFxyXG4gIHRvTnVtYmVyXHJcbn1cclxuIiwiaW1wb3J0IHtjbGllbnRZLCBnZXRTdHlsZSwgdG9OdW1iZXJ9IGZyb20gXCIuLi90b29scy9pbmRleFwiO1xyXG5cclxuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XHJcbiAgd3JhcHBlZDogbnVsbCxcclxuICBjaGlsZDogbnVsbCxcclxuICBib3JkZXI6IHRydWUsXHJcbiAgZm9yd2FyZDogMCxcclxuICBjYjogKCkgPT4ge31cclxufVxyXG5jb25zdCByZW1vdmVCb3JkZXIgPSAod3JhcHBlZCwgeSkgPT4ge1xyXG4gIGxldCBidCA9IGdldFN0eWxlKHdyYXBwZWQsIFwiYm9yZGVyLXRvcFwiKTtcclxuICByZXR1cm4geSAtIHRvTnVtYmVyKGJ0KTtcclxufVxyXG5cclxuY29uc3QganVkZ2VZID0gKHksIG9wdGlvbnMpID0+IHtcclxuICBsZXQgd3JhcHBlZCA9IG9wdGlvbnMud3JhcHBlZCxcclxuICAgIGNoaWxkID0gb3B0aW9ucy5jaGlsZCxcclxuICAgIGNhbGxiYWNrID0gb3B0aW9ucy5jYixcclxuICAgIGJvcmRlciA9IG9wdGlvbnMuYm9yZGVyLFxyXG4gICAgZm9yd2FyZCA9IG9wdGlvbnMuZm9yd2FyZDtcclxuICB5ICs9IGZvcndhcmQ7XHJcbiAgaWYoeSA8PSAwKSB7XHJcbiAgICBsZXQgbmV3WSA9IHkgKyAoYm9yZGVyID8gY2hpbGQub2Zmc2V0SGVpZ2h0IDogY2hpbGQuY2xpZW50SGVpZ2h0KTtcclxuICAgIGNvbnNvbGUubG9nKG5ld1kpO1xyXG4gICAgaWYobmV3WSA+IDApIHtcclxuICAgICAgY2FsbGJhY2soY2hpbGQsIHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2FsbGJhY2soY2hpbGQsIGZhbHNlKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgaWYoeSA8PSAod3JhcHBlZC5jbGllbnRIZWlnaHQpICYmIHkgPj0gMiAqIGZvcndhcmQpIHtcclxuICAgICAgY2FsbGJhY2soY2hpbGQsIHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2FsbGJhY2soY2hpbGQsIGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuY29uc3Qgc2Nyb2xsU2hvdyA9IChvcHRpb25zKSA9PiB7XHJcbiAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gIGxldCB5ID0gY2xpZW50WShvcHRpb25zLndyYXBwZWQsIG9wdGlvbnMuY2hpbGQpO1xyXG4gIHkgPSByZW1vdmVCb3JkZXIob3B0aW9ucy53cmFwcGVkLCB5KTsgICAgICAgLy8gd3JhcHBlZCDlhYPntKDnmoQgYm9yZGVyIOWuveW6puS8muiuoeeul+i/m+WOu++8jOWcqOi/memHjOWHj+aOiVxyXG4gIGp1ZGdlWSh5LCBvcHRpb25zKTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBzY3JvbGxTaG93O1xyXG5cclxuIl0sIm5hbWVzIjpbXSwibWFw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
