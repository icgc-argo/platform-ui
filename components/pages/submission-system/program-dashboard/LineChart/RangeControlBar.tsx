import React from 'react';
import * as u from './utils';

type RangeButtonProps = {
  children: any;
  handleClick: () => void;
  isActive: boolean;
  label: string;
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
    cursor: 'pointer',
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
  handleClick,
  isActive,
  label,
}: RangeButtonProps) => {
  return (
    <button
      aria-label={label}
      title={label}
      type="button"
      onClick={handleClick}
      style={{...styles.button, ...(isActive ? styles.buttonActive : {})}}
      >
      {children}
    </button>
  );
};

const RangeControlBar = ({ activeBtn, handleBtnClick, rangeArray }) => {
  return (
    <div style={styles.bar}>
      <div>
        {u.rangeButtons.map(btn => (
          <RangeButton
            handleClick={() => handleBtnClick(btn.title)}
            isActive={activeBtn === btn.title}
            key={btn.label}
            label={btn.label}
            >
            {btn.title}
          </RangeButton>
        ))}
      </div>
      <div style={styles.dateRange}>{rangeArray[0]} <span style={styles.dateRange.span}>to</span> {rangeArray[1]}</div>
    </div>
  );
}

export default RangeControlBar;
