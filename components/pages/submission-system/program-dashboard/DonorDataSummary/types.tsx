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

export type DonorSummaryRecord = {
  releaseStatus: DonorDataReleaseState;
  donorId: string;
  submitterDonorId: string;
  submittedCoreDataPercent: number;
  submittedExtendedDataPercent: number;
  registeredNormalSamples: number;
  registeredTumourSamples: number;
  publishedNormalAnalysis: number;
  publishedTumourAnalysis: number;
  alignmentsCompleted: number;
  alignmentsRunning: number;
  alignmentsFailed: number;
  sangerVcsCompleted: number;
  sangerVcsRunning: number;
  sangerVcsFailed: number;
  mutectFailed: number;
  mutectRunning: number;
  mutectCompleted: number;
  processingStatus: MolecularProcessingStatus;
  updatedAt: Date | string;
  validWithCurrentDictionary: boolean;
};

export type ProgramDonorReleaseStats = {
  registeredDonorsCount: number;
  fullyReleasedDonorsCount: number;
  partiallyReleasedDonorsCount: number;
  noReleaseDonorsCount: number;
  donorsInvalidWithCurrentDictionaryCount: number;
};

export enum DonorDataReleaseState {
  FULLY = 'FULLY_RELEASED',
  PARTIALLY = 'PARTIALLY_RELEASED',
  NO = 'NO_RELEASE',
}
export enum MolecularProcessingStatus {
  COMPLETE = 'COMPLETE',
  PROCESSING = 'PROCESSING',
  REGISTERED = 'REGISTERED',
}

// **** GQL types ****
export type ProgramDonorsSummaryQueryData = {
  programDonorSummaryEntries: DonorSummaryRecord[];
  programDonorSummaryStats: ProgramDonorReleaseStats;
};

export type ProgramDonorsSummaryQueryVariables = {
  programShortName: string;
  first: number;
  offset: number;
  sorts: DonorSummaryEntrySort[];
};

export type DonorSummaryEntrySort = {
  field: DonorSummaryEntrySortField;
  order: DonorSummaryEntrySortOrder;
};

export type DonorSummaryEntrySortField = keyof DonorSummaryRecord;
export type DonorSummaryEntrySortOrder = 'asc' | 'desc';
