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

import styled from '@emotion/styled';
import defaultTheme from 'uikit/theme/defaultTheme';

const PipeContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  font-family: ${({ theme }) => theme.typography.paragraph.fontFamily};
  font-size: 11px;
  font-weight: bold;
  line-height: 1.27;
  letter-spacing: normal;
  text-align: center;
  width: 100%;
  padding: 5px;
  height: 14px;
`;

const PipeItem = styled<'div', { fill: keyof typeof defaultTheme.colors }>('div')`
  flex-grow: 1;
  background-color: ${({ theme, fill }) => theme.colors[fill]};
  margin-right: 1px;

  &:only-child {
    margin: 0px;
    border-radius: 10px;
  }

  &:first-of-type:not(:last-of-type) {
    border-radius: 10px 0 0 10px;
  }
  &:last-of-type:not(:first-of-type) {
    margin: 0px;
    border-radius: 0 10px 10px 0;
  }
`;

const Pipe: React.ComponentType<{}> & { Item: typeof PipeItem } = ({ children }) => (
  <PipeContainer>{children}</PipeContainer>
);

Pipe.Item = PipeItem;

export default Pipe;
