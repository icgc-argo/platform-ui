import React from 'react';

export default function Affix(props: {
  top: number;
  children: React.ReactNode;
  offset?: number;
  className?: string;
}) {
  const element = React.createRef<HTMLDivElement>();
  let oldPosition: string;
  let oldTop: string;
  let oldWidth: string;
  // Offset could make the element fixed ealier or later
  const { offset = 0 } = props;

  const checkPosition = (distanceToBody: number, width: number) => {
    const scrollTop = window.scrollY;

    if (distanceToBody - scrollTop < props.top + offset) {
      if (element.current.style.top != props.top + 'px') {
        oldTop = element.current.style.position;
        element.current.style.top = props.top + 'px';
      }
      if (element.current.style.position != 'fixed') {
        oldPosition = element.current.style.position;
        oldWidth = element.current.style.position;
        element.current.style.position = 'fixed';
        element.current.style.width = width + 'px';
      }
    } else {
      // reset to default
      element.current.style.position = oldPosition;
      element.current.style.top = oldTop;
      element.current.style.width = oldWidth;
    }
  };

  React.useEffect(() => {
    if (typeof window.scrollY === 'undefined') {
      // don't work in IE
      return;
    }

    const distanceToBody = window.scrollY + element.current.getBoundingClientRect().top;
    const handleScroll = () => {
      requestAnimationFrame(() => {
        checkPosition(distanceToBody, element.current.clientWidth);
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <div ref={element} style={{ zIndex: 1 }} className={props.className}>
      {props.children}
    </div>
  );
}
