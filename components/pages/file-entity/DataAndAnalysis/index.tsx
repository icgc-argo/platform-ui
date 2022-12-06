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

import { css, Link, SimpleTable, useTheme } from '@icgc-argo/uikit';
import {
  WORKFLOW_NAMES,
  WORKFLOW_NAME_URLS,
  WORKFLOW_VERSION_URLS,
  GENOME_BUILD,
  GENOME_BUILD_URL,
  GENOME_ANNOTATION,
  GENOME_ANNOTATION_URL,
} from 'global/constants';
import { FileCard, TableDiv } from '../common';
import { DataAnalysisInfo, DataAnalysisWorkflowType } from '../types';

function getWorkflowTypeDisplay(workflowType: DataAnalysisWorkflowType): string {
  return workflowType ? [workflowType.workflow_name, workflowType.workflow_version].join(', ') : '';
}

const getWorkflowNameLink = (workflowType: DataAnalysisWorkflowType) => {
  if (!workflowType || !workflowType.workflow_name) return null;

  switch (workflowType.workflow_name) {
    case WORKFLOW_NAMES.dnaSeq:
      return (
        <Link href={WORKFLOW_NAME_URLS.dnaSeq} target="_blank">
          {workflowType.workflow_name}
        </Link>
      );
    case WORKFLOW_NAMES.sangerWgs:
      return (
        <Link href={WORKFLOW_NAME_URLS.sangerWgs} target="_blank">
          {workflowType.workflow_name}
        </Link>
      );
    case WORKFLOW_NAMES.sangerWxs:
      return (
        <Link href={WORKFLOW_NAME_URLS.sangerWxs} target="_blank">
          {workflowType.workflow_name}
        </Link>
      );
    case WORKFLOW_NAMES.mutect2:
      return (
        <Link href={WORKFLOW_NAME_URLS.mutect2} target="_blank">
          {workflowType.workflow_name}
        </Link>
      );
    case WORKFLOW_NAMES.openAccess:
      return (
        <Link href={WORKFLOW_NAME_URLS.openAccess} target="_blank">
          {workflowType.workflow_name}
        </Link>
      );
    // case for rnaseq worlflow url. url not ready yet.
    // case WORKFLOW_NAMES.rnaSeq:
    //   return (
    //     <Link href={WORKFLOW_NAME_URLS.rnaSeq} target="_blank">
    //       {workflowType.workflow_name}
    //     </Link>
    //   );
    default:
      return workflowType.workflow_name;
  }
};

const getWorkflowVersionLink = (workflowType: DataAnalysisWorkflowType) => {
  if (!workflowType || !workflowType.workflow_name) return null;

  switch (workflowType.workflow_name) {
    case WORKFLOW_NAMES.dnaSeq:
      return (
        <Link
          href={`${WORKFLOW_VERSION_URLS.dnaSeq}${workflowType.workflow_version}`}
          target="_blank"
        >
          {workflowType.workflow_version}
        </Link>
      );
    case WORKFLOW_NAMES.sangerWgs:
      return (
        <Link
          href={`${WORKFLOW_VERSION_URLS.sangerWgs}${workflowType.workflow_version}`}
          target="_blank"
        >
          {workflowType.workflow_version}
        </Link>
      );
    case WORKFLOW_NAMES.sangerWxs:
      return (
        <Link
          href={`${WORKFLOW_VERSION_URLS.sangerWxs}${workflowType.workflow_version}`}
          target="_blank"
        >
          {workflowType.workflow_version}
        </Link>
      );
    case WORKFLOW_NAMES.mutect2:
      return (
        <Link
          href={`${WORKFLOW_VERSION_URLS.mutect2}${workflowType.workflow_version}`}
          target="_blank"
        >
          {workflowType.workflow_version}
        </Link>
      );
    case WORKFLOW_NAMES.openAccess:
      return (
        <Link
          href={`${WORKFLOW_VERSION_URLS.openAccess}${workflowType.workflow_version}`}
          target="_blank"
        >
          {workflowType.workflow_version}
        </Link>
      );
    case WORKFLOW_NAMES.rnaSeq:
      return (
        <Link
          href={`${WORKFLOW_VERSION_URLS.rnaSeq}${workflowType.workflow_version}`}
          target="_blank"
        >
          {workflowType.workflow_version}
        </Link>
      );
    default:
      return workflowType.workflow_version;
  }
};

const getGenomeBuild = (workflowType: DataAnalysisWorkflowType) => {
  if (!workflowType || !workflowType.workflow_name) return null;

  switch (workflowType.workflow_name) {
    case WORKFLOW_NAMES.rnaSeq:
      return (
        <Link href={GENOME_BUILD_URL.rnaSeq} target="_blank">
          {GENOME_BUILD.rnaSeq}
        </Link>
      );
    default:
      return (
        <Link href={GENOME_BUILD_URL.default} target="_blank">
          {GENOME_BUILD.default}
        </Link>
      );
  }
};

const getGenomeAnnotation = (workflowType: DataAnalysisWorkflowType) => {
  if (!workflowType || !workflowType.workflow_name) return null;

  switch (workflowType.workflow_name) {
    case WORKFLOW_NAMES.rnaSeq:
      return (
        <Link href={GENOME_ANNOTATION_URL.rnaSeq} target="_blank">
          {GENOME_ANNOTATION.rnaSeq}
        </Link>
      );
    default:
      const theme = useTheme();
      return (
        <div
          css={css`
            font-style: italic;
            color: ${theme.colors.grey};
          `}
        >
          N/A
        </div>
      );
  }
};

const DataAndAnalysis = ({ data }: { data: DataAnalysisInfo }) => {
  const theme = useTheme();

  const tableData = {
    'Experimental Strategy': data.experimentalStrategy,
    'Data Category': data.dataCategory,
    'Data Type': data.dataType,
    Platform: data.platform,
    'Genome Build': getGenomeBuild(data.workflowType),
    'Genome Annotation': getGenomeAnnotation(data.workflowType),
    'Workflow Name': getWorkflowNameLink(data.workflowType),
    'Workflow Version': getWorkflowVersionLink(data.workflowType),
    'Analysis Tools':
      data.software && data.software.reduce((prev, current) => `${prev}, ${current}`),
  };

  for (const prop in tableData) {
    if (tableData[prop] === null) tableData[prop] = '--';
  }

  return (
    <FileCard cardTitle="Data &amp; Analysis Information">
      <TableDiv>
        <SimpleTable data={tableData} />
      </TableDiv>
    </FileCard>
  );
};

export default DataAndAnalysis;
