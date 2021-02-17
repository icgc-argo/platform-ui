import React, { useState } from 'react';

type RangeButtonProps = {
  children: any;
  data: any;
  isActive: boolean;
  handleClick: any;
  setActiveButton: any;
  title: string;
};

const styles = {
  bar: {
    alignItems: 'center',
    background: '#f2f2f8',
    display: 'flex',
    height: 30,
    justifyContent: 'space-between',
    width: '100%',
    padding: '0 10px 0 5px',
    boxSizing: 'border-box'
  },
  button: {
    background: 'transparent',
    border: '0 none',
    color: '#525767',
    display: 'inline-block',
    fontFamily: 'Work Sans, sans-serif',
    fontSize: '12px',
    padding: 4,
    width: '25px',
  },
  buttonActive: {
    color: '#045093',
    fontFamily: 'Work Sans, sans-serif',
    fontWeight: 600,
  },
  dateRange: { 
    color: '#000',
    fontFamily: 'Work Sans, sans-serif',
    fontSize: '11px',
    lineHeight: '14px',
    span: {
      color: '#525767',
      fontSize: '12px',
    }
  }
};

const RangeButton = ({
  children,
  data,
  handleClick,
  isActive,
  setActiveButton,
  title
}: RangeButtonProps) => {
  const buttonClick = () => {
    handleClick(data);
    setActiveButton(title)
  };
  return (
    <button
      aria-label={title}
      title={title}
      type="button"
      onClick={buttonClick}
      style={{...styles.button, ...(isActive ? styles.buttonActive : {})}}
      >
      {children}
    </button>
  )
}

const RangeControlBar = ({ handleClick, options }) => {
  const [activeButton, setActiveButton] = useState(options.buttons[0].title);

  return (
    <div style={styles.bar}>
      <div>
        {options.buttons.map(button => (
          <RangeButton
            data={button.data}
            isActive={activeButton === button.title}
            key={button.label}
            title={button.title}
            handleClick={handleClick}
            setActiveButton={setActiveButton}
            >
            {button.label}
          </RangeButton>
        ))}
      </div>
      <div style={styles.dateRange}>02/22/2022 <span style={styles.dateRange.span}>to</span> 02/29/2022</div>
    </div>
  );
}

export default RangeControlBar;