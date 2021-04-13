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

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { radios, boolean, text } from '@storybook/addon-knobs';
import React from 'react';
import Button from '.';
import { asyncDummyFunc, placeholderImageURLRoot } from '../testUtil';
import Icon from 'uikit/Icon';
import { css } from 'uikit';
import { BUTTON_VARIANTS, BUTTON_SIZES } from './constants';

const dummyClick = action('Clicked!');

export const createKnobs = () => {
  const variant = radios('variant', BUTTON_VARIANTS, BUTTON_VARIANTS.PRIMARY);
  const size = radios('size', BUTTON_SIZES, BUTTON_SIZES.MD);
  const disabled = boolean('disabled', false);
  const isAsync = boolean('isAsync', false);
  const children = text('children', 'some button');

  const className = text('className', undefined);
  const id = text('id', undefined);

  return {
    variant,
    size,
    disabled,
    isAsync,
    children,
    className,
    id,
  };
};

const ButtonStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => {
    const props = createKnobs();
    return <Button {...props} onClick={props.isAsync ? asyncDummyFunc : dummyClick} />;
  })
  .add('Button with multiple child nodes', () => {
    const props = createKnobs();
    return (
      <Button {...props} onClick={props.isAsync ? asyncDummyFunc : dummyClick}>
        <img src={`${placeholderImageURLRoot}/12/20`} />
        <span style={{ color: '#64D518' }}>Red Span</span>
        <img src={`${placeholderImageURLRoot}/20/20`} />
        <img src={`${placeholderImageURLRoot}/7/7`} />
      </Button>
    );
  })
  .add('Loader on click', () => {
    const props = createKnobs();

    return (
      <Button onClick={async () => new Promise((resolve) => setTimeout(resolve, 1500))} isAsync>
        Click me!
      </Button>
    );
  })
  .add('Custom Loader', () => {
    const props = createKnobs();
    const CustomLoader = ({ theme, variant }) => (
      <div>
        <Icon
          name="spinner"
          width={'12px'}
          height={'12px'}
          fill={theme.button.textColors[variant].default}
          css={css`
            margin-right: 4px;
          `}
        />
        VALIDATING FILES
      </div>
    );

    return (
      <Button
        Loader={CustomLoader}
        onClick={async () => new Promise((resolve) => setTimeout(resolve, 1500))}
        isAsync
      >
        Upload files...
      </Button>
    );
  });

export default ButtonStories;
