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

import { styled } from 'uikit';

export const FieldInputWrapper = styled('div')`
  width: 35%;
  &:first-of-type:not(:last-of-type) {
    border-radius: 10px 0 0 10px;
  }
`;

export const FieldDescriptionLabel = styled('div')`
  display: flex;
  width: 15%;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.grey_2};
  color: ${({ theme }) => theme.colors.black};
  border: solid 1px ${({ theme }) => theme.colors.grey_1};

  font-size: 12px;
  line-height: 1.33;
  font-weight: normal;
  align-items: center;
  justify-content: center;
  &:first-of-type:not(:last-of-type) {
    border-radius: 10px 0 0 10px;
    border-right: 0px;
  }
  &:nth-last-of-type(2) {
    margin: 0px;
    border-radius: 0px;
    border-left: 0px;
    border-right: 0px;
  }
`;
