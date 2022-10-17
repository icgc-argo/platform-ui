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
import { Button, Link, Table, TableColumnConfig, Typography } from '@icgc-argo/uikit';
import fileSize from 'filesize';

import { DownloadIcon, FileCard, getAccessIcon } from '../common';
import { FileRecord } from '../types';

const DownstreamAnalysis = ({ data }: { data: Array<FileRecord> }) => {
  const containerRef = React.createRef<HTMLDivElement>();

  const tableColumns: Array<TableColumnConfig<FileRecord>> = [
    {
      Header: 'File ID',
      accessor: 'fileId',
      width: 160,
      Cell: ({ original }: { original: FileRecord }) => {
        return <Link href="">{original.fileId}</Link>;
      },
    },
    {
      width: 270,

      Header: 'Data Type',
      accessor: 'dataType',
    },
    {
      width: 270,
      Header: 'Analysis Workflow',
      accessor: 'analysisWorkflow',
    },
    {
      Header: 'File Format',
      accessor: 'fileFormat',
    },
    {
      Header: 'File Size',
      accessor: 'fileSize',
      Cell: ({ original }: { original: FileRecord }) => {
        return fileSize(original.fileSize);
      },
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      width: 90,

      Cell: ({ original }: { original: FileRecord }) => {
        return (
          <div
            css={css`
              display: flex;
              justify-content: center;
              width: 100%;
            `}
          >
            {getAccessIcon(original.actions)}
          </div>
        );
      },
    },
  ];
  return (
    <FileCard>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: center;
        `}
      >
        <Typography color="primary" variant="default" component="span">
          Downstream File Analysis
        </Typography>

        <Button>
          <DownloadIcon />
          MANIFEST
        </Button>
      </div>
      <div
        css={css`
          width: 100%;
          padding: 10px 0;
        `}
      >
        <Table parentRef={containerRef} showPagination={false} data={data} columns={tableColumns} />
      </div>
    </FileCard>
  );
};

export default DownstreamAnalysis;
