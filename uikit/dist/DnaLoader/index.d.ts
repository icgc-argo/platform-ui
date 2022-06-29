/// <reference types="react" />
import PropTypes from 'prop-types';
declare const DnaLoader: {
  ({ dotsCount, ...rest }: { [x: string]: any; dotsCount?: number }): JSX.Element;
  propTypes: {
    dotsCount: PropTypes.Requireable<number>;
  };
};
export default DnaLoader;
