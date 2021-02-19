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

import {
  format as formatDate,
  // startOfToday,
  sub as subDate,
} from 'date-fns';

const mockDataStub = {
  clinical: [''],
  molecular: ['DNA Raw Reads', 'Alignment', 'Sanger VC', 'Mutect2', 'RNA Raw Reads', 'RNA-Seq1', 'RNA-Seq2'],
};
const committedDonors = 2000;
const intervals = 7;
const getRandomDonors = (count: number) => (
  [...Array(mockDataStub.molecular.length).keys()]
    .map(_ => ([...Array(count).keys()]
      .map(k => Math.floor(Math.random() * committedDonors)).sort((a,b) => a - b)
    ))
);

// move this to backend probably
const getDates = (days: number) => {
  // const startDate = startOfToday();
  // use this to fake quarters on weekly/monthly view
  const startDate = new Date('2022-04-05T00:00:00');
  const dates = [...Array(intervals).keys()]
    .sort((a, b) => b - a)
    .map((x: number) => subDate(startDate, { days: Math.floor(days / intervals * x) }))
    .map((x: Date) => Number(formatDate(x, 't')));
  return dates;
};

export const makeMockData = (days: number) => {
  const dates = getDates(days);
  const donors = getRandomDonors(dates.length);
  return Object.keys(mockDataStub).map(chartType => ({
    chartType,
    committedDonors,
    lines: mockDataStub[chartType].map((title: string, n: number) => ({
      title,
      points: dates.map((date, i: number) => ({
        date,
        donors: donors[n][i]
      }))
    }))
  }));
};

export const adjustData = mockData => mockData
  .map(d => ({
    ...d,
    lines: d.lines.map(line => ({
      ...line,
      points: line.points.map(({ date, donors }) => ({
        x: date,
        y: donors,
        // TODO: only show year for first instance
        label: formatDate(date*1000, 'd MMM yyyy'),
        // TODO: add line name to tooltip for molecular, e.g. "Raw Reads"
        tooltip: [formatDate(date*1000, 'MMM d, yyyy'), `${donors} donors`],
      }))
    }))
  })
);
