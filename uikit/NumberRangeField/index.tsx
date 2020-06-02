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

import { css } from '@emotion/core';
import { FieldDescriptionLabel, FieldInputWrapper } from './common';
import React from 'react';
import Input from 'uikit/form/Input';
import Button from 'uikit/Button';
import { useTheme } from 'uikit/ThemeProvider';
import Typography from 'uikit/Typography';

const NumberRangeField: React.ComponentType<{
  min: string;
  onMinChange: React.Dispatch<React.SetStateAction<string>>;
  max: string;
  onMaxChange: React.Dispatch<React.SetStateAction<string>>;
  onGoClick: () => any;
  goButtonEnabled: boolean;
  validation?: (i: number) => boolean;
}> = ({
  min,
  onMinChange,
  max,
  onMaxChange,
  onGoClick,
  goButtonEnabled,
  validation = i => true,
}) => {
  const theme = useTheme();
  const [minErrorState, setMinErrorState] = React.useState(false);
  const [maxErrorState, setMaxErrorState] = React.useState(false);

  const errorMsg = (
    <Typography variant={'caption'} color={theme.colors.error}>
      Invalid
    </Typography>
  );

  const isInputInvalid = (input: string) => {
    const numberInput = Number(input);
    return isNaN(numberInput) || !validation(numberInput);
  };

  return (
    <div
      css={css`
        ${css(theme.typography.default as any)}
        display: flex;
        align-items: flex-start;
        width: 100%;
      `}
    >
      <FieldDescriptionLabel>Min:</FieldDescriptionLabel>
      <FieldInputWrapper>
        <Input
          error={minErrorState}
          aria-label="minimum_input"
          placeholder="e.g. 0"
          size="sm"
          value={min}
          onChange={e => {
            onMinChange(e.target.value);
          }}
          onBlur={e => {
            setMinErrorState(isInputInvalid(e.target.value));
          }}
          getOverrideCss={() =>
            css`
              border-radius: 0px;
              ${css(theme.typography.data as any)}
            `
          }
        />
        {minErrorState && errorMsg}
      </FieldInputWrapper>

      <FieldDescriptionLabel>Max:</FieldDescriptionLabel>

      <FieldInputWrapper>
        <Input
          error={maxErrorState}
          aria-label="maximum_input"
          placeholder="e.g. 85"
          size="sm"
          value={max}
          onChange={e => {
            onMaxChange(e.target.value);
          }}
          onBlur={e => {
            setMaxErrorState(isInputInvalid(e.target.value));
          }}
          getOverrideCss={() =>
            css`
              border-radius: 0px 8px 8px 0px;
              ${css(theme.typography.data as any)}
            `
          }
        />
        {maxErrorState && errorMsg}
      </FieldInputWrapper>

      <Button
        css={css`
          margin: 2px 0px 0px 5px;
        `}
        variant="secondary"
        onClick={e => onGoClick()}
        disabled={!goButtonEnabled}
      >
        GO
      </Button>
    </div>
  );
};

export default NumberRangeField;
