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

import { UikitTheme } from '@icgc-argo/uikit';

export const rangeButtons = [
  {
    days: null,
    label: 'All',
    title: 'All',
  },
  {
    days: 365,
    label: 'One year',
    title: '1Y',
  },
  {
    days: 30,
    label: 'One month',
    title: '1M',
  },
  {
    days: 7,
    label: 'One week',
    title: '1W',
  },
];

export const makeChartLineMeta = (theme: UikitTheme) => [
  {
    chartType: 'clinical',
    color: theme.colors.accent2_dark,
    dataType: null,
    field: 'coreCompletionDate',
    title: null,
  },
  {
    chartType: 'molecular',
    color: theme.colors.accent4_dark,
    dataType: 'DNA',
    field: 'rawReadsFirstPublishedDate',
    title: 'DNA Raw Reads',
  },
  {
    chartType: 'molecular',
    color: theme.colors.accent1_dark,
    dataType: 'DNA',
    field: 'alignmentFirstPublishedDate',
    title: 'Alignment',
  },
  {
    chartType: 'molecular',
    color: theme.colors.error_dark,
    dataType: 'DNA',
    field: 'mutectFirstPublishedDate',
    title: 'Mutect2',
  },
  {
    chartType: 'molecular',
    color: theme.colors.warning_dark,
    dataType: 'DNA',
    field: 'sangerVcsFirstPublishedDate',
    title: 'Sanger VC',
  },
  {
    chartType: 'molecular',
    color: theme.colors.secondary_1,
    dataType: 'DNA',
    field: 'openAccessFirstPublishedDate',
    title: 'Open Access VF',
  },
  // RNA
  // not used right now
  // {
  //   chartType: 'molecular',
  //   color: theme.colors.accent3_dark,
  //   dataType: 'RNA',
  //   title: 'RNA Raw Reads',
  // },
  // {
  //   chartType: 'molecular',
  //   color: theme.colors.secondary_dark,
  //   dataType: 'RNA',
  //   title: 'RNA-Seq1',
  // },
  // {
  //   chartType: 'molecular',
  //   color: theme.colors.accent2_dark,
  //   dataType: 'RNA',
  //   title: 'RNA-Seq2',
  // },
];
