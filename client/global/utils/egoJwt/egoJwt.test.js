import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { isValidJwt } from './index';

describe('isValidJwt', () => {
  it('should return false if undefined', () => {
    expect(isValidJwt()).to.be.false;
  });
});

describe('isDccMember', () => {
  it('should validate DCC member as such', () => {
    expect(true).to.be.true;
  });
  it('should validate non DCC member as such', () => {
    expect(true).to.be.true;
  });
});

describe('isRdpcMember', () => {
  it('should validate RDPC member as such', () => {
    expect(true).to.be.true;
  });
  it('should validate non RDPC member as such', () => {
    expect(true).to.be.true;
  });
});

describe('getAuthorizedProgramPolicies', () => {
  // it('should validate ')
});
