/// <reference types="react" />
import PropTypes from 'prop-types';
declare function Option({ ...other }: { [x: string]: any }): JSX.Element;
declare namespace Option {
  var propTypes: {
    value: PropTypes.Requireable<any>;
  };
}
export default Option;
