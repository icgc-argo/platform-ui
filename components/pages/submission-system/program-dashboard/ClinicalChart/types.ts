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

export type DataPoint = {
  label: string;
  tooltip: string[];
  x: string;
  y: string;
};

export type DataBucket = {
  date: string;
  donors: number;
};

export type ChartLine = {
  field: DonorField;
  points: string;
  title: ChartLineTitle;
};

export type DataItem = {
  title: DonorField;
  buckets: DataBucket[];
};

export type ChartType = 'clinical' | 'molecular';

export type PointsCoordinates = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

export type ChartLineTitle = null | string;

export type DonorField =
  | 'createdAt'
  // TODO replace with clinical date
  | 'mutectFirstPublishedDate'
  | 'alignmentFirstPublishedDate'
  | 'rawReadsFirstPublishedDate'
  | 'sangerVcsFirstPublishedDate';

export type ProgramDonorPublishedAnalysisByDateRangeQueryVariables = {
  bucketCount: number;
  dateRangeFrom: string;
  dateRangeTo: string;
  donorFields: DonorField[];
  programShortName: string;
};

export type ProgramDonorPublishedAnalysisByDateRangeBucket = {
  date: string;
  donors: number;
};

export type ProgramDonorPublishedAnalysisByDateRange = {
  title: DonorField;
  buckets: ProgramDonorPublishedAnalysisByDateRangeBucket[];
};

export type ProgramDonorPublishedAnalysisByDateRangeQueryData = {
  programDonorPublishedAnalysisByDateRange: ProgramDonorPublishedAnalysisByDateRange[];
};

export type RangeButtons = 'All' | '1Y' | '1M' | '1W';
