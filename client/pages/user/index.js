//@flow
import React from 'react';
import { get } from 'lodash';

import { createPage } from 'global/utils/pages';
import { decodeToken } from 'global/utils/egoJwt';

export default createPage({
  getInitialProps: async context => {
    const { egoJwt, asPath, query, res } = context;
    const data = decodeToken(egoJwt);
    const firstName = get(data, 'context.user.firstName', '');
    const lastName = get(data, 'context.user.lastName', '');
    return { firstName, lastName };
  },
})(({ firstName, lastName }) => {
  return (
    <div>
      Logged in user: {firstName} {lastName}
    </div>
  );
});
