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

import { css, styled, Tab, Tabs } from '@icgc-argo/uikit';
import { useState } from 'react';

export enum PipelineNames {
  DNA = 'DNA',
  RNA = 'RNA',
}

export const PIPELINE_COLORS = {
  [PipelineNames.DNA]: 'warning_4',
  [PipelineNames.RNA]: 'accent3_4',
};

export const usePipelines = () => {
  const [activePipeline, setActivePipeline] = useState<PipelineNames>(PipelineNames.DNA);
  return {
    activePipeline,
    setActivePipeline,
  };
};

const StyledPipelineTab = styled(Tab)<{ activePipeline: PipelineNames }>`
  align-items: center;
  justify-content: center;
  padding: 3px 0px;
  margin: 0 8px 0 0;
  border: 1px solid ${({ theme }) => css(theme.colors.grey_2)};
  border-bottom: 1px none ${({ theme }) => css(theme.colors.white)};
  border-radius: 5px 5px 0px 0px;
  width: 150px;
  font-size: 13px;
  background: ${({ theme }) => css(theme.colors.grey_3)};
  :hover {
    background-color: ${({ theme }) => css(theme.colors.grey_4)};
  }
  &.active {
    background: ${({ activePipeline, theme }) =>
      css(theme.colors[PIPELINE_COLORS[activePipeline]])};
    border-bottom: 0px none ${({ theme }) => css(theme.colors.white)};
    border-top: 3px solid ${({ theme }) => css(theme.colors.secondary)};
    :hover {
      background-color: ${({ activePipeline, theme }) =>
        css(theme.colors[PIPELINE_COLORS[activePipeline]])};
    }
  }
  &:first-of-type {
    margin-left: 279px;
  }
`;

export const PipelineTabs = ({
  activePipeline,
  handlePipelineTabs,
}: {
  activePipeline: PipelineNames;
  handlePipelineTabs: (e: any, value: PipelineNames) => void;
}) => (
  <Tabs onChange={handlePipelineTabs} value={activePipeline}>
    <StyledPipelineTab label="DNA-SEQ" activePipeline={activePipeline} value={PipelineNames.DNA} />
    <StyledPipelineTab label="RNA-SEQ" activePipeline={activePipeline} value={PipelineNames.RNA} />
  </Tabs>
);
