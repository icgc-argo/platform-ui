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
import PropTypes from 'prop-types';
import FormControlContext from '../FormControl/FormControlContext';
import styled from '@emotion/styled';
import clsx from 'clsx';
import css from '@emotion/css';
import Icon from '../../Icon';
import pick from 'lodash/pick';
import get from 'lodash/get';

const InputLabel = React.forwardRef<
  HTMLLabelElement,
  {
    /**
     * The CSS class name of the wrapper element.
     */
    className?: string;
    children?: React.ReactNode;
    htmlFor?: string;
  }
>(function InputLabel(props, ref) {
  const { className: classNameProp, children, ...other } = props;

  const Label = styled('label')`
    ${({ theme }) => css(theme.typography.label)};
    margin-top: 7px;
    &.disabled {
    }
  `;

  const AsteriskContainer = styled('span')``;

  const contextValue = React.useContext(FormControlContext);

  return (
    <Label
      ref={ref}
      className={clsx(pick(contextValue, ['error', 'disabled']), classNameProp)}
      {...other}
    >
      {children}
      {get(contextValue, 'required') && (
        <AsteriskContainer>
          <Icon
            css={css`
              margin-bottom: 5px;
              margin-left: 5px;
            `}
            width="6px"
            height="6px"
            name="asterisk"
            fill="#DF1B42"
          />
        </AsteriskContainer>
      )}
    </Label>
  );
});

InputLabel.displayName = 'InputLabel';

export default InputLabel;
