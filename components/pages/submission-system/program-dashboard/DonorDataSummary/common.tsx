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

import React from 'react';
import { DonorDataReleaseState } from './types';
import { DataTableStarIcon as StarIcon } from '../../common';

export const RELEASED_STATE_FILL_COLOURS: {
  [k in DonorDataReleaseState]: React.ComponentProps<typeof StarIcon>['fill']
} = {
  [DonorDataReleaseState.FULLY]: 'secondary',
  [DonorDataReleaseState.PARTIALLY]: 'secondary_2',
  [DonorDataReleaseState.NO]: 'white',
};

export const RELEASED_STATE_STROKE_COLOURS: {
  [k in DonorDataReleaseState]: React.ComponentProps<typeof StarIcon>['outline']
} = {
  [DonorDataReleaseState.FULLY]: null,
  [DonorDataReleaseState.PARTIALLY]: null,
  [DonorDataReleaseState.NO]: { color: 'secondary', width: 1 },
};

export const useTimeout = (msTimeout: number = 30000) => {
  const [isTimeOut, setIsTimeOut] = React.useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimeOut(true);
    }, msTimeout);
    return () => clearTimeout(timer);
  }, []);
  return isTimeOut;
};
