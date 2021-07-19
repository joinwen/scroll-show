import {
  getHeight,
  getHeightWithBorder,
  getHeightWithPadding,
  getStyle,
  getWidth, getWidthWithBorder,
  getWidthWithPadding,
  toNumber
} from "../../tools";

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
}

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
export {
  updatePositionByCLevel,
  updatePositionByWLevel
}
