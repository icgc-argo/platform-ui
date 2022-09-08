/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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

import { css } from '@icgc-argo/uikit';

export const searchBackgroundStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
  height: auto;
  margin-bottom: 25px;
  padding: 0 17px;
`;

export const searchTitleParentStyle = css`
  display: flex;
  align-items: center;
  width: fit-content;
  margin-left: 10px;
`;

export const searchBoldTextStyle = css`
  margin-left: 5px;
`;

export const searchClearFilterStyle = css`
  background-color: inherit;
  border: none;
`;

export const searchRightSideGroupStyle = css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const searchFilterParentStyle = css`
  display: flex;
  align-items: center;
  width: fit-content;
  margin: 0 10px;
`;

export const searchDropdownStyle = css`
  width: fit-content;
  height: fit-content;
  margin: 0 0 0 7px;
  padding: 8px;
`;

export const searchDownArrowStyle = css`
  margin-left: 10px;
  height: 9px;
`;

export const searchBarParentStyle = css`
  display: flex;
  border-radius: 100px;
  border-style: solid;
  border-color: #babcc2;
  border-width: 1px;
  margin: 0 10px;
  position: relative;
`;

export const searchInputFieldStyle = css`
  border-radius: 100px 0 0 100px;
  border-top: none;
  border-left: none;
  border-bottom: none;
  width: 215px;
`;

export const searchFilterButtonStyle = css`
  border-radius: 0 100px 100px 0;
  border: none;
`;

export const searchFilterContainerStyle = css`
  display: flex;
  align-items: center;
`;

export const searchFilterIconStyle = css`
  margin-right: 5px;
`;

export const searchDownloadIconStyle = css`
  margin: 0 3px;
`;
