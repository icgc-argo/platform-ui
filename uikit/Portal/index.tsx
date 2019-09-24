import React from 'react';
import ReactDOM from 'react-dom';

// Portal that support server rendering
export default class Portal extends React.Component<{ selector: string }> {
  element: HTMLElement;
  componentDidMount() {
    this.element = document.querySelector(this.props.selector);
    this.forceUpdate();
  }

  render() {
    if (this.element === undefined) {
      return null;
    }

    return ReactDOM.createPortal(this.props.children, this.element);
  }
}
