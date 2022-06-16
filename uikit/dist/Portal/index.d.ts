import React from 'react';
export default class Portal extends React.Component<{
  selector: string;
}> {
  element: HTMLElement;
  componentDidMount(): void;
  render(): React.ReactPortal;
}
