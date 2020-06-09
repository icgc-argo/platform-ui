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

import { storiesOf } from '@storybook/react';
import React from 'react';
import FileTable from '.';

const records = [
  {
    program_id: 'PROGRAM_ID_1',
    donor_submitter_id: 'ICGC_1234',
    gender: 'Female',
    specimen_submitter_id: '12345',
    specimen_type: 'Solid tissue',
    tumour_normal_designation: 'Normal - tissue adjacent to primary tumour',
    sample_submitter_id: '1234567',
    sample_type: 'Total DNA',
  },
  {
    program_id: 'PROGRAM_ID_2',
    donor_submitter_id: 'ICGC_1234',
    gender: 'Female',
    specimen_submitter_id: '67891',
    specimen_type: 'Solid tissue',
    tumour_normal_designation: 'Metastatic tumour - metastasis to distant location',
    sample_submitter_id: '1234567',
    sample_type: 'Total DNA',
  },
];

const FileTableStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => {
    return (
      <FileTable
        submissionInfo={{
          fileName: 'registration_schrodinger.tsv',
          creator: 'Schrodinger Submitter',
          createdAt: 'May 20, 2020',
        }}
        stats={{
          newCount: 2,
          existingCount: 2,
        }}
        records={records.map((record, i) => ({
          ...record,
          row: `${i}`,
          isNew: true,
        }))}
      />
    );
  })
  .add('No data', () => <FileTable submissionInfo={null} stats={null} records={[]} />);

export default FileTableStories;
