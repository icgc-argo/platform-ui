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
import { DataBucket, DataItem } from './types';
import theme from 'uikit/theme/defaultTheme';

export const getMaxY = (data: DataItem[]) => {
  const yValues = data
    .map((dataItem: DataItem) => dataItem.buckets.map((bucket: DataBucket) => bucket.donors))
    .reduce((acc, curr) => acc.concat(curr), []);
  return Math.max(...yValues);
};

export const convertUnixEpochToJSEpoch = (unixEpoch: number) => unixEpoch * 1000;

export const rangeButtons = [
  {
    days: null,
    title: 'All',
    label: 'All',
  },
  {
    days: 365,
    title: '1Y',
    label: 'One year',
  },
  {
    days: 30,
    title: '1M',
    label: 'One month',
  },
  {
    days: 7,
    title: '1W',
    label: 'One week',
  },
];

export const chartLineDict = [
  // DNA
  {
    color: theme.colors.accent1_dark,
    field: 'alignmentFirstPublishedDate',
    title: 'Alignment',
  },
  {
    color: theme.colors.accent4_dark,
    field: 'rawReadsFirstPublishedDate',
    title: 'DNA Raw Reads',
  },
  {
    color: theme.colors.error_dark,
    field: 'mutectFirstPublishedDate',
    title: 'Mutect2',
  },
  {
    color: theme.colors.warning_dark,
    field: 'sangerVcsFirstPublishedDate',
    title: 'Sanger VC',
  },
  // RNA
  // not used right now
  // { title: 'RNA Raw Reads', color: theme.colors.accent3_dark },
  // { title: 'RNA-Seq1', color: theme.colors.secondary_dark },
  // { title: 'RNA-Seq2', color: theme.colors.accent2_dark },
];
