/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React from 'react';
import * as u from './utils';

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
}: {
  children: any;
  handleClick: () => void;
  isActive: boolean;
  label: string;
}) => {
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
