import React from 'react';
import get from 'lodash/get';
import Page404 from 'components/pages/404';
import Page401 from 'components/pages/401';
import Page500 from 'components/pages/500';

export const ERROR_STATUS_KEY = 'statusCode';

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    if (err[ERROR_STATUS_KEY] === 401) {
      res.status(401);
    }
    return { [ERROR_STATUS_KEY]: get(res, ERROR_STATUS_KEY) || get(err, ERROR_STATUS_KEY) || null };
  }

  render() {
    if (this.props.statusCode === 404) {
      return <Page404 />;
    }
    if (this.props.statusCode === 500) {
      return <Page500 />;
    }
    if (this.props.statusCode === 401) {
      return <Page401 />;
    }
    return (
      <p>
        {this.props.statusCode
          ? `An error ${this.props.statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    );
  }
}

export default Error;
