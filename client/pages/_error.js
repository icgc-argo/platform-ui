import React from 'react';
import Page404 from './404';
import Page500 from './404';

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    if (this.props.statusCode === 404) {
      return <Page404 />;
    }
    if (this.props.statusCode === 500) {
      return <Page500 />;
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
