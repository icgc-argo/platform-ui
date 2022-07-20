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

import React from 'react';
import { FileCard, TableDiv, getAccessIcon } from '../common';
import { css } from '@emotion/core';
import SimpleTable from '@icgc-argo/uikit/Table/SimpleTable';
import get from 'lodash/get';

import { FileSummaryInfo } from '../types';
import fileSize from 'filesize';
import { startCase } from 'lodash';

import { useQuery } from '@apollo/client';
import PROGRAM_NAME_QUERY from './gql/PROGRAM_NAME_QUERY';
import sqonBuilder from 'sqon-builder';
import urlJoin from 'url-join';
import { FILE_REPOSITORY_PATH } from 'global/constants/pages';
import Link from 'next/link';
import A from '@icgc-argo/uikit/Link';

const FileSummary = ({ data }: { data: FileSummaryInfo }) => {
  const { loading, data: { program = undefined } = {} } = useQuery<{
    program: { name: string };
  }>(PROGRAM_NAME_QUERY, {
    variables: {
      shortName: data.program,
    },
  });

  const programFilter = sqonBuilder.has('study_id', data.program).build();
  const programFilterUrl = urlJoin(
    FILE_REPOSITORY_PATH,
    `?filters=${encodeURIComponent(JSON.stringify(programFilter))}`,
  );

  const tableData = {
    'File ID': data.fileId,
    'File Name': data.fileName,
    'Object ID': data.objectId,
    'File Type': data.fileFormat,
    'File Size': fileSize(data.size),
    'File Access': (
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <>{getAccessIcon(data.access)}</>
        <> {startCase(data.access)}</>
      </div>
    ),
    Program: (
      <Link href={programFilterUrl} passHref>
        <A>
          {get(program, 'name', false) ? `${get(program, 'name')} (${data.program})` : data.program}
        </A>
      </Link>
    ),
    'MD5 Checksum': data.checksum,
    'Repository Name': data.repoName,
    'Repository Country': data.repoCountry,
  };

  return (
    <FileCard cardTitle="File Summary">
      <TableDiv>
        <SimpleTable data={tableData} />
      </TableDiv>
    </FileCard>
  );
};

export default FileSummary;
