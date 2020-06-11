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

import { FileRepositoryRecord } from './types';
import { sample } from 'lodash';

const idmaker = () => `FL${Math.floor(1000 + Math.random() * 9000)}`;
export const dummyExamples: Array<FileRepositoryRecord> = [
  {
    objectId: 'FL9951',
    donorId: 'DO9980',
    programId: 'BRCA-MX',
    dataType: 'Aligned Reads',
    experimentalStrategy: 'WXS',
    fileType: 'FASTQ',
    size: 129580000,
    isDownloadable: true,
  },
  {
    objectId: 'FL9981',
    donorId: 'DO9981',
    programId: 'BRCA-US',
    dataType: 'SSM',
    experimentalStrategy: 'WGS',
    fileType: 'FASTQ',
    size: 7695800000,
    isDownloadable: false,
  },
  {
    objectId: 'FL9980',
    donorId: 'DO9982',
    programId: 'CESC-US',
    dataType: 'Aligned Reads',
    experimentalStrategy: 'WXS',
    fileType: 'FASTQ',
    size: 121130000,
    isDownloadable: true,
  },
];

export let dummyData = [];
for (let i = 0; i < 108; i++) {
  dummyData.push({ ...sample(dummyExamples), objectId: `FL-${i + 1}` });
}
