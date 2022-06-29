/// <reference types="react" />
import PropTypes from 'prop-types';
declare const Footer: {
  ({
    version,
    apiVersion,
    links,
    className,
    ...otherProps
  }: {
    [x: string]: any;
    version?: string;
    apiVersion?: any;
    links?: any[];
    className?: string;
  }): JSX.Element;
  propTypes: {
    version: PropTypes.Requireable<string>;
    apiVersion: PropTypes.Requireable<string>;
    links: PropTypes.Requireable<any[]>;
  };
};
export default Footer;
