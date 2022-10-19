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

import { useState } from 'react';
import { css, styled, Tab, Tabs, useTheme } from '@icgc-argo/uikit';

export enum PipelineTabNames {
  DNA = 'DNA',
  RNA = 'RNA',
}

export const getPipelineTabSettings = () => {
  const theme = useTheme();
  return {
    [PipelineTabNames.DNA]: {
      alignmentsFailed: 'alignmentsFailed',
      alignmentsCompleted: 'alignmentsCompleted',
      alignmentsRunning: 'alignmentsRunning',
      color: theme.colors.warning_4,
    },
    [PipelineTabNames.RNA]: {
      alignmentsFailed: 'rnaAlignmentFailed',
      alignmentsCompleted: 'rnaAlignmentsCompleted',
      alignmentsRunning: 'rnaAlignmentsRunning',
      color: theme.colors.accent3_4,
    },
  };
};

export const usePipelineTabs = () => {
  const [activePipelineTab, setActivePipelineTab] = useState<PipelineTabNames>(
    PipelineTabNames.DNA,
  );
  const pipelineTabSettings = getPipelineTabSettings();
  const pipelineTabColor = pipelineTabSettings[activePipelineTab].color;
  return {
    activePipelineTab,
    pipelineTabColor,
    pipelineTabSettings,
    setActivePipelineTab,
  };
};

const StyledPipelineTab = styled(Tab)<{ pipelineTabColor: string }>`
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
    background: ${(props) => props.pipelineTabColor};
    border-bottom: 0px none ${({ theme }) => css(theme.colors.white)};
    border-top: 3px solid ${({ theme }) => css(theme.colors.secondary)};
    :hover {
      background-color: ${(props) => props.pipelineTabColor};
    }
  }
  &:first-of-type {
    margin-left: 279px;
  }
`;

export const PipelineTabs = ({
  activePipelineTab,
  handlePipelineTabs,
}: {
  activePipelineTab: PipelineTabNames;
  handlePipelineTabs: (e: any, value: PipelineTabNames) => void;
}) => {
  const { pipelineTabColor } = usePipelineTabs();

  return (
    <Tabs onChange={handlePipelineTabs} value={activePipelineTab}>
      <StyledPipelineTab
        label="DNA-SEQ"
        pipelineTabColor={pipelineTabColor}
        value={PipelineTabNames.DNA}
      />
      <StyledPipelineTab
        label="RNA-SEQ"
        pipelineTabColor={pipelineTabColor}
        value={PipelineTabNames.RNA}
      />
    </Tabs>
  );
};
