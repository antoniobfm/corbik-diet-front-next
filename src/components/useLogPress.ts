import { useCallback, useRef, useState } from "react";

const useLongPress = (
  onLongPress,
  onClick,
  { shouldPreventDefault = true, timeToBeClick = 300, timeToOpenModal = 1000 } = {}
) => {
  const [kill, setKill] = useState(false);
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef();
  const target = useRef();

  const start = useCallback(
    event => {
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener("touchend", preventDefault, {
          passive: false
        });
        target.current = event.target;
				// console.log(event)
      }
      timeout.current = setTimeout(() => {
        onLongPress(event);
				if (!kill) {
        	setLongPressTriggered(true);
				}
				// console.log(event)
      }, timeToBeClick);
    },
    [onLongPress, timeToBeClick, shouldPreventDefault, kill]
  );

  const clear = useCallback(
    (event, shouldTriggerClick = true) => {
      timeout.current && clearTimeout(timeout.current);
      shouldTriggerClick && !longPressTriggered && !kill && onClick();
      setLongPressTriggered(false);
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener("touchend", preventDefault);
      }
			setKill(false);
    },
    [shouldPreventDefault, onClick, longPressTriggered, kill]
  );

  return {
    onMouseDown: e => start(e),
    onTouchStart: e => start(e),
    onTouchMove: e => {clear(e, false); setKill(true)},
    onMouseUp: e => clear(e),
    onMouseLeave: e => clear(e, false),
    onTouchEnd: e => clear(e)
  };
};

const isTouchEvent = event => {
  return "touches" in event;
};

const preventDefault = event => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

export default useLongPress;
