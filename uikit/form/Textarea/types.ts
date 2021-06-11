export enum CountLabels {
  chars = 'characters',
  words = 'words',
}

export type CountPositions =
  | 'absolute'
  | 'absolute left'
  | 'absolute right'
  | 'left'
  | 'left absolute'
  | 'right'
  | 'right absolute';

export interface TextareaProps {
  ['aria-label']: string;
  /**
   * Characterss/words given vs remaining
   */
  countDirection?: 'asc' | 'desc';
  /**
   * Limit should be greater than 0 to enable the counter
   */
  countLimit?: number;
  /**
   * Counter's position under the Textarea
   */
  countPosition?: CountPositions;
  /**
   * What to count: characters or words
   */
  countType?: 'chars' | 'words';
  disabled?: boolean;
  error?: boolean;
  focused?: boolean;
  /**
   * Useful to correctly connect a label (using htmlFor)
   */
  id?: string;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  /**
   * Disallows users to continue typing once a count limit has been reached (avoiding error)
   */
  truncate?: boolean;
  value?: string;
}
