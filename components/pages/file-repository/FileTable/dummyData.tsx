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

import { FileRepositoryRecord, FileDataNames, FileStrategyNames, FileFormatNames } from './types';

import { sample } from 'lodash';

const idmaker = () => `FL${Math.floor(1000 + Math.random() * 9000)}`;
export const dummyExamples: Array<FileRepositoryRecord> = [
  {
    fileID: 'FL9951',
    donorID: 'DO9980',
    program: { shortName: 'BRCA-MX', fullName: 'Brain Cancer Mexico' },
    dataType: FileDataNames.ALIGNED_READS,
    strategy: FileStrategyNames.WXS,
    format: FileFormatNames.FASTQ,
    size: 129580000,
    isDownloadable: true,
  },
  {
    fileID: 'FL9981',
    donorID: 'DO9981',
    program: { shortName: 'BRCA-US', fullName: 'Brain Cancer USA' },
    dataType: FileDataNames.SSM,
    strategy: FileStrategyNames.WGS,
    format: FileFormatNames.FASTQ,
    size: 7695800000,
    isDownloadable: false,
  },
  {
    fileID: 'FL9980',
    donorID: 'DO9982',
    program: { shortName: 'CESC-US', fullName: 'center for eccentric scientific children' },
    dataType: FileDataNames.ALIGNED_READS,
    strategy: FileStrategyNames.WXS,
    format: FileFormatNames.FASTQ,
    size: 121130000,
    isDownloadable: true,
  },
];

export let dummyData = [];
for (let i = 0; i < 100; i++) {
  dummyData.push({ ...sample(dummyExamples), fileID: idmaker() });
}
