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
