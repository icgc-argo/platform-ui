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
import { storiesOf } from '@storybook/react';
import useClickAway from '.';
import { action } from '@storybook/addon-actions';

export default storiesOf(`${__dirname}`, module).add(
  'Basic',
  () => {
    const ref = React.createRef<HTMLButtonElement>();
    useClickAway({
      domElementRef: ref,
      onClickAway: action('onClickAway'),
      onElementClick: action('onElementClick'),
    });
    return (
      <button
        ref={ref}
      >{`I have "ref={ref}". click me, then click away while looking at "Action" tab`}</button>
    );
  },
  {
    info: {
      text: `
      This is a convenient hook for implementing clickaways. While using this hook, do not use an \`onClick\` handler on your DOM element. Instead, attach a ref to it, and pass \`useClickAway\` the callback under \`onElementClick\`.

      Observe the *Action* tab to see events from this hook.
      `,
    },
  },
);
