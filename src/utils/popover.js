export const getPopoverPosition = (
  triggerPosition,
  popoverPlace,
  popoverPosition,
  windowWidth
) => {
  const { top, left, height, width } = triggerPosition;
  const { left: popoverLeft, width: popoverWidth } = popoverPosition || {};
  let newLeft = left + width / 2;
  if (popoverLeft + popoverWidth > windowWidth) {
    newLeft = windowWidth - popoverWidth / 2;
  }

  switch (popoverPlace) {
    case 'top':
    case 'top-left':
    case 'top-right':
      return {
        left: left + width / 2,
        top: top - height,
      };
    case 'right':
      return {
        left: left + width,
        top,
      };

    case 'right-top':
      return {
        left: left + width,
        top: top - height / 2,
      };

    case 'right-bottom':
      return {
        left: left + width,
        top: top + height / 2,
      };

    case 'left':
      return {
        left,
        top,
      };

    case 'left-top':
      return {
        left,
        top: top - height / 2,
      };

    case 'left-bottom':
      return {
        left,
        top: top + height / 2,
      };

    default:
      // cases: bottom, bottom-right, bottom-left
      return {
        left: newLeft,
        top: top + height,
      };
  }
};
