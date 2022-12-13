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

import { gql } from '@apollo/client';

const PROGRAM_DONOR_SUMMARY_QUERY = gql`
  query ProgramDonorSummary(
    $programShortName: String!
    $first: Int!
    $offset: Int!
    $sorts: [DonorSummaryEntrySort]
    $filters: [ProgramDonorSummaryFilter!]
  ) {
    programDonorSummary(
      programShortName: $programShortName
      first: $first
      offset: $offset
      sorts: $sorts
      filters: $filters
    ) {
      entries {
        id
        donorId
        programShortName
        validWithCurrentDictionary
        releaseStatus
        submitterDonorId
        submittedCoreDataPercent
        registeredNormalSamples
        registeredTumourSamples
        publishedNormalAnalysis
        publishedTumourAnalysis
        alignmentsCompleted
        alignmentsRunning
        alignmentsFailed
        sangerVcsCompleted
        sangerVcsRunning
        sangerVcsFailed
        mutectFailed
        mutectRunning
        mutectCompleted
        openAccessFailed
        openAccessRunning
        openAccessCompleted
        processingStatus
        updatedAt
        rnaRegisteredNormalSamples
        rnaRegisteredTumourSamples
        rnaPublishedNormalAnalysis
        rnaPublishedTumourAnalysis
        rnaAlignmentsCompleted
        rnaAlignmentsRunning
        rnaAlignmentFailed
        matchedTNPairsDNA
      }
      stats {
        registeredDonorsCount
        fullyReleasedDonorsCount
        partiallyReleasedDonorsCount
        noReleaseDonorsCount
        donorsInvalidWithCurrentDictionaryCount
        completedWorkflowRuns
        inProgressWorkflowRuns
        failedWorkflowRuns
        coreCompletion {
          completed
          incomplete
          noData
        }
        sampleStatus {
          valid
          invalid
        }
        rawReadsStatus {
          valid
          invalid
        }
        alignmentStatusCount {
          completed
          inProgress
          failed
          noData
        }
        sangerStatusCount {
          completed
          inProgress
          failed
          noData
        }
        mutectStatusCount {
          completed
          inProgress
          failed
          noData
        }
        openAccessStatusCount {
          completed
          inProgress
          failed
          noData
        }
        rnaAlignmentStatusCount {
          completed
          inProgress
          failed
          noData
        }
        rnaSampleStatus {
          dataSubmitted
          noDataSubmitted
        }
        rnaRawReadStatus {
          dataSubmitted
          noDataSubmitted
        }
        dnaTNRegisteredStatus {
          tumorAndNormal
          tumorOrNormal
          noData
        }
        dnaTNMatchedPairStatus {
          tumorNormalMatchedPair
          tumorNormalNoMatchedPair
          tumorNormalMatchedPairMissingRawReads
          noData
        }
      }
    }
  }
`;

export default PROGRAM_DONOR_SUMMARY_QUERY;
