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
// import { MenuItem } from './../SubMenu';
import { MenuItem } from '../../SubMenu';

import { css } from '@emotion/core';
import NumberRangeField from 'uikit/NumberRangeField';

const NumberRangeFacet = ({
  subMenuName,
  isSelected,
  onClick,
}: {
  subMenuName: string;
  isSelected?: boolean;
  onClick?: (e: any) => void;
}) => {
  // must be initialized, use string to handle 'backspaces' from input field
  // parse to number upon use
  const [minimumInput, setMinimumInput] = React.useState('');
  const [maximumInput, setMaximumInput] = React.useState('');

  const getRangeValues = () => {
    return {
      min: parseFloat(minimumInput),
      max: parseFloat(maximumInput),
    };
  };

  const [inputsValid, setInputsValid] = React.useState(false);

  const validator = (i: number) => i >= 0;

  React.useEffect(() => {
    const { min, max } = getRangeValues();
    const atLeastOneProvided = !(isNaN(min) && isNaN(max));
    const validIfProvided = input => (input === '' ? true : validator(input));

    setInputsValid(
      atLeastOneProvided && (validIfProvided(minimumInput) && validIfProvided(maximumInput)),
    );
  }, [minimumInput, maximumInput]);

  const goButtonHandler = () => {
    const { min, max } = getRangeValues();
    //todo
  };

  return (
    <MenuItem
      onClick={onClick}
      selected={isSelected}
      isFacetVariant={true}
      className="FacetMenu"
      content={subMenuName}
      chevronOnLeftSide={true}
      css={css`
        width: 300px;
      `}
    >
      <MenuItem
        className="FacetContentSlim"
        selected={false}
        level={1}
        content={
          <NumberRangeField
            min={minimumInput}
            max={maximumInput}
            onMinChange={setMinimumInput}
            onMaxChange={setMaximumInput}
            onGoClick={goButtonHandler}
            goButtonEnabled={inputsValid}
            validation={validator}
          />
        }
        contentAs="div"
      />
    </MenuItem>
  );
};

export default NumberRangeFacet;
