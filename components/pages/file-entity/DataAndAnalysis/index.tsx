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

import { FileCard, TableDiv } from '../common';
import SimpleTable from 'uikit/Table/SimpleTable';
import { DataAnalysisInfo, DataAnalysisWorkflowType } from '../types';
import Link from 'uikit/Link';

function getWorkflowTypeDisplay(workflowType: DataAnalysisWorkflowType): string {
  return workflowType ? [workflowType.workflow_name, workflowType.workflow_version].join(', ') : '';
}

// Hard-coded Genome Build as per: https://github.com/icgc-argo/platform-ui/issues/2105
const GENOME_BUILD = 'GRCh38';
const GENOME_BUILD_URL = 'https://www.ncbi.nlm.nih.gov/assembly/GCF_000001405.26/';

const DataAndAnalysis = ({ data }: { data: DataAnalysisInfo }) => {
  const tableData = {
    'Experimental Strategy': data.experimentalStrategy,
    'Data Category': data.dataCategory,
    'Data Type': data.dataType,
    'Platform': data.platform,
    'Genome Build': (
      <Link
        href={GENOME_BUILD_URL}
        target='_blank'
      >
        {GENOME_BUILD}
      </Link>
    ),
    'Genome Annotation': 'N/A',
    'Workflow Name': getWorkflowTypeDisplay(data.workflowType),
    'Analysis Tools': data.software,
  };

  return (
    <FileCard cardTitle="Data & Analysis Information">
      <TableDiv>
        <SimpleTable data={tableData} />
      </TableDiv>
    </FileCard>
  );
};

export default DataAndAnalysis;
