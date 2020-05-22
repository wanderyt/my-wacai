import React from 'react';

// Don't add spacebar (32)
var keys = {
  33: 1, // pageup
  34: 1, // pagedown
  35: 1, // end
  36: 1, // home
  37: 1, // left
  38: 1, // up
  39: 1, // right
  40: 1 // down
};
// cannot simulate keydown events, please change if can be improved
/* istanbul ignore next */
function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.returnValue = false;
}

// cannot simulate keydown events, please change if can be improved
/* istanbul ignore next */
function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

function disableScroll() {
  /* istanbul ignore else */
  if (window.addEventListener) {
    // older FF
    window.addEventListener('DOMMouseScroll', preventDefault, false);
  }
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove = preventDefault; // mobile
  document.onkeydown = preventDefaultForScrollKeys;

  document.body.style.overflowY = 'hidden';
}

function enableScroll() {
  /* istanbul ignore else */
  if (window.removeEventListener) {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
  }
  window.onmousewheel = document.onmousewheel = null;
  window.onwheel = null;
  window.ontouchmove = null;
  document.onkeydown = null;

  document.body.removeAttribute('style');
}

/**
 * A higher-order component that disables/enables screen scrolling when
 * the wrapped component is mounted/unmounted.
 *
 * The approach used is to disable all input that can lead to scrolling. Other CSS-only
 * solutions exist but this solution is purer without other potential side effects.
 */
export default function disableScreenScrolling(WrappedComponent) {
  class DisableScreenScrolling extends React.Component {
    componentDidMount() {
      disableScroll();
    }

    componentWillUnmount() {
      enableScroll();
    }

    render() {
      // Pass through all props
      return <WrappedComponent {...this.props} />;
    }
  }

  return DisableScreenScrolling;
}
