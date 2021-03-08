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
import { DataLine, DataObj, DataPoint } from './types';
import themeColors from 'uikit/theme/defaultTheme/colors';

export const getMinMax = (
  { data, minMax, coord }: {
    data: DataObj;
    minMax: 'min' | 'max';
    coord: 'x' | 'y';
  }) => {
  const allCoord = [
    ...data.lines
    .map((line: DataLine) => line.points
      .map((point: DataPoint) => Number(point[coord]))
    )
    .reduce((acc, curr) => ([...acc, ...curr]), [])
  ];
  return Math[minMax](...allCoord);
};
export const convertUnixEpochToJSEpoch = (unixEpoch: number) => unixEpoch * 1000;

export const rangeButtons = [
  {
    data: 700,
    title: 'All',
    label: 'All',
  },
  {
    data: 365,
    title: '1Y',
    label: 'One year',
  },
  {
    data: 30,
    title: '1M',
    label: 'One month',
  },
  {
    data: 7,
    title: '1W',
    label: 'One week',
  }
];

export const chartLineColors = {
  'Alignment': themeColors.accent1_dark,
  'DNA Raw Reads': themeColors.accent4_dark,
  'Mutect2': themeColors.error_dark,
  'RNA Raw Reads': themeColors.accent3_dark,
  'RNA-Seq1': themeColors.secondary_dark,
  'RNA-Seq2': themeColors.accent2_dark,
  'Sanger VC': themeColors.warning_dark,
};
