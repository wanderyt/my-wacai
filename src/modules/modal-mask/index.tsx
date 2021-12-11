import React from 'react';
import './index.scss';

interface IModalMaskProps {
  extraCls?: string;
  onClick?: () => void;
}

/**
 * A component that shows a modal mask over the entire screen. It uses RGBA as background color
 * so opacity is achieved without using the CSS opacity property, so that children are not affected. We
 * provide a default z-index of 9999, but that can be customized. All children provided will
 * be added as children of the component.
 *
 * Developers can modify this component to expose more things to be customized as needed.
 */

class ModalMask extends React.Component<IModalMaskProps> {
  onClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  render() {
    let modalMaskCls = 'ModalMask__container';

    // Add any extra CSS class
    if (this.props.extraCls) {
      modalMaskCls += ' ' + this.props.extraCls;
    }

    return (
      <div className={modalMaskCls} onClick={this.onClick}>
        <div className="ModalMask__content">{this.props.children}</div>
      </div>
    );
  }
}

export default ModalMask;
