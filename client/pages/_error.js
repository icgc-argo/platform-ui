import React from 'react';
import get from 'lodash/get';
import Page404 from 'components/pages/404';
import Page401 from 'components/pages/401';
import Page500 from 'components/pages/500';

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const STATUS_KEY = 'statusCode';
    if (err[STATUS_KEY] === 401) {
      res.status(401);
    }
    return { [STATUS_KEY]: get(res, STATUS_KEY) || get(err, STATUS_KEY) || null };
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
