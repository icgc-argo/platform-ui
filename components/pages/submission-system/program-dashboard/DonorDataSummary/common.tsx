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

import { DonorDataReleaseState, ProgramDonorReleaseStats } from './types';
import { DataTableStarIcon as StarIcon } from '../../common';
import { ComponentProps, useEffect, useState } from 'react';

export const RELEASED_STATE_FILL_COLOURS: {
  [k in DonorDataReleaseState]: ComponentProps<typeof StarIcon>['fill'];
} = {
  [DonorDataReleaseState.FULLY]: 'secondary',
  [DonorDataReleaseState.PARTIALLY]: 'secondary_2',
  [DonorDataReleaseState.NO]: 'white',
};

export const RELEASED_STATE_STROKE_COLOURS: {
  [k in DonorDataReleaseState]: ComponentProps<typeof StarIcon>['outline'];
} = {
  [DonorDataReleaseState.FULLY]: null,
  [DonorDataReleaseState.PARTIALLY]: null,
  [DonorDataReleaseState.NO]: { color: 'secondary', width: 1 },
};

export const useTimeout = (msTimeout: number = 30000) => {
  const [isTimeOut, setIsTimeOut] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimeOut(true);
    }, msTimeout);
    return () => clearTimeout(timer);
  }, []);
  return isTimeOut;
};

export const FILTER_OPTIONS = {
  completeIncomplete: [
    {
      key: 'COMPLETE',
      value: 'Complete',
    },
    {
      key: 'INCOMPLETE',
      value: 'Incomplete',
    },
    {
      key: 'NO_DATA',
      value: 'No data submitted',
    },
  ],
  validInvalid: [
    {
      key: 'VALID',
      value: 'Valid',
    },
    {
      key: 'INVALID',
      value: 'Invalid',
    },
  ],
  completedInProgressFailed: [
    {
      key: 'COMPLETED',
      value: 'Completed',
    },
    {
      key: 'IN_PROGRESS',
      value: 'In progress',
    },
    {
      key: 'FAILED',
      value: 'Failed',
    },
    {
      key: 'NO_DATA',
      value: 'No data',
    },
  ],
  dataSubmittedNoData: [
    {
      key: 'DATA_SUBMITTED',
      value: 'Data submitted',
    },
    {
      key: 'NO_DATA',
      value: 'No data submitted',
    },
  ],
  samplesRegisteredNoSamplesRegistered: [
    {
      key: 'SAMPLES_REGISTERED',
      value: 'Samples registered',
    },
    {
      key: 'NO_SAMPLES_REGISTERED',
      value: 'No samples registered',
    },
  ],
  tnRegisteredTnNotRegistered: [
    {
      key: 'TUMOR_AND_NORMAL',
      value: 'T and N registered',
    },
    {
      key: 'TUMOR_OR_NORMAL',
      value: 'T or N not registered',
    },
    {
      key: 'NO_DATA',
      value: 'No samples registered',
    },
  ],
  tnMatchedPairSubmittedTnMatchedPairNotSubmitted: [
    {
      key: 'TUMOR_NORMAL_MATCHED_PAIR',
      value: 'T|N matched pair submitted',
    },
    {
      key: 'TUMOR_NORMAL_NO_MATCHED_PAIR',
      value: 'T|N matched pair not submitted',
    },
    {
      key: 'NO_DATA',
      value: 'No data submitted',
    },
  ],
};

export const EMPTY_PROGRAM_SUMMARY_STATS: ProgramDonorReleaseStats = {
  registeredDonorsCount: 0,
  fullyReleasedDonorsCount: 0,
  partiallyReleasedDonorsCount: 0,
  noReleaseDonorsCount: 0,
  donorsInvalidWithCurrentDictionaryCount: 0,
  percentageCoreClinical: 0,
  percentageTumourAndNormal: 0,
  coreCompletion: {
    completed: 0,
    incomplete: 0,
    noData: 0,
  },
  sampleStatus: {
    valid: 0,
    invalid: 0,
  },
  dnaTNRegisteredStatus: {
    tumorAndNormal: 0,
    tumorOrNormal: 0,
    noData: 0,
  },
  dnaTNMatchedPairStatus: {
    tumorNormalMatchedPair: 0,
    tumorNormalNoMatchedPair: 0,
    noData: 0,
  },
  rawReadsStatus: {
    valid: 0,
    invalid: 0,
  },
  alignmentStatusCount: {
    completed: 0,
    inProgress: 0,
    failed: 0,
    noData: 0,
  },
  sangerStatusCount: {
    completed: 0,
    inProgress: 0,
    failed: 0,
    noData: 0,
  },
  mutectStatusCount: {
    completed: 0,
    inProgress: 0,
    failed: 0,
    noData: 0,
  },
  openAccessStatusCount: {
    completed: 0,
    inProgress: 0,
    failed: 0,
    noData: 0,
  },
  completedWorkflowRuns: 0,
  inProgressWorkflowRuns: 0,
  failedWorkflowRuns: 0,
  rnaRawReadStatus: {
    dataSubmitted: 0,
    noDataSubmitted: 0,
  },
  rnaSampleStatus: {
    dataSubmitted: 0,
    noDataSubmitted: 0,
  },
  rnaAlignmentStatusCount: {
    completed: 0,
    inProgress: 0,
    failed: 0,
    noData: 0,
  },
};
