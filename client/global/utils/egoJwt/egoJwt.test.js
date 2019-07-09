import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import {
  isValidJwt,
  isDccMember,
  hasAccessToProgram,
  isProgramAdmin,
  canReadProgram,
  canWriteProgram,
  getAuthorizedProgramScopes,
} from './index';

/** has the following scopes:
 *  "PROGRAM-WP-CPMP-US.READ"
 *  "PROGRAMDATA-PACA-AU.WRITE"
 *  "PROGRAMDATA-WP-CPMP-US.WRITE"
 *  "PROGRAM-PACA-AU.READ"
 **/
const DATA_SUBMITTER = `eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjI2NzkyMDksImV4cCI6MTU2Mjc2NTYwOSwic3ViIjoiM2RjNjU5MmItMTQzNi00ZDVlLTk5MzEtMTRiZjFjZmVlZGU4IiwiaXNzIjoiZWdvIiwiYXVkIjpbXSwianRpIjoiZDUyZTFjOGYtYzVkYS00ZGRkLTgzODUtODI2OWM4NzcxYzhiIiwiY29udGV4dCI6eyJzY29wZSI6WyJQUk9HUkFNLVdQLUNQTVAtVVMuUkVBRCIsIlBST0dSQU1EQVRBLVBBQ0EtQVUuV1JJVEUiLCJQUk9HUkFNREFUQS1XUC1DUE1QLVVTLldSSVRFIiwiUFJPR1JBTS1QQUNBLUFVLlJFQUQiXSwidXNlciI6eyJuYW1lIjoiYXJnby5kYXRhc3VibWl0dGVyQGdtYWlsLmNvbSIsImVtYWlsIjoiYXJnby5kYXRhc3VibWl0dGVyQGdtYWlsLmNvbSIsInN0YXR1cyI6IkFQUFJPVkVEIiwiZmlyc3ROYW1lIjoiRGFuIiwibGFzdE5hbWUiOiJEYXRhIFN1Ym1pdHR0ZXIiLCJjcmVhdGVkQXQiOjE1NjI2MjU2NDE4NjEsImxhc3RMb2dpbiI6MTU2MjY3OTIwOTA1MCwicHJlZmVycmVkTGFuZ3VhZ2UiOm51bGwsInR5cGUiOiJVU0VSIiwicGVybWlzc2lvbnMiOlsiUFJPR1JBTS1XUC1DUE1QLVVTLlJFQUQiLCJQUk9HUkFNREFUQS1XUC1DUE1QLVVTLldSSVRFIiwiUFJPR1JBTS1QQUNBLUFVLlJFQUQiLCJQUk9HUkFNREFUQS1QQUNBLUFVLldSSVRFIl19fSwic2NvcGUiOlsiUFJPR1JBTS1XUC1DUE1QLVVTLlJFQUQiLCJQUk9HUkFNREFUQS1QQUNBLUFVLldSSVRFIiwiUFJPR1JBTURBVEEtV1AtQ1BNUC1VUy5XUklURSIsIlBST0dSQU0tUEFDQS1BVS5SRUFEIl19.bNyAjQZnTynVVUwGIYWvwnf0Bu-TihJrgncMRFHfd1S_oFV9mAU7Bf-W-J4uTtnWnWurK1qsGBHJ3QO3SDiBIhaRRj4R9qAY6fDkELNamc3E7Wxa52fmikZyo0PazdmGSEefNAW1poyjZa7XCnGYDQhFNHp9a9afvAuthRqRKXA6RV5NLtJ9WUNsoA_jg9i8z4bNQb8gubLP_e3340u7G6fFR5O8yYXtOJFblNDSFbG9_OFLpZxz-iUTCAQ5tH_aDeSgCfi780BJN9sI85rBxtpVkHwkZgLBBmv0_snVKb5s-zGr4beXbh1rBKxcAd43BKCDvZbZy4YsEmGd1JQ6uA`;

/** has the following scopes:
 * "PROGRAMDATA-PACA-AU.WRITE"
 * "PROGRAM-PACA-AU.WRITE"
 **/
const PROGRAM_ADMIN = `eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjI2NzkzNjcsImV4cCI6MTU2Mjc2NTc2Nywic3ViIjoiMTYwZmZlYzctNDk0Zi00ZGU3LWFjMDItOGRlYjEwM2I3MDU3IiwiaXNzIjoiZWdvIiwiYXVkIjpbXSwianRpIjoiMmU3ZWZjY2QtZWNlMC00NTQ4LWE2MzAtMjA5ZDEyNDFmNDU5IiwiY29udGV4dCI6eyJzY29wZSI6WyJQUk9HUkFNREFUQS1QQUNBLUFVLldSSVRFIiwiUFJPR1JBTS1QQUNBLUFVLldSSVRFIl0sInVzZXIiOnsibmFtZSI6ImFyZ28ucHJvZ3JhbWFkQGdtYWlsLmNvbSIsImVtYWlsIjoiYXJnby5wcm9ncmFtYWRAZ21haWwuY29tIiwic3RhdHVzIjoiQVBQUk9WRUQiLCJmaXJzdE5hbWUiOiJQYXVsIiwibGFzdE5hbWUiOiJQcm9ncmFtIEFkbWluIiwiY3JlYXRlZEF0IjoxNTYyNjI1NjI4ODM4LCJsYXN0TG9naW4iOjE1NjI2NzkzNjc2MDYsInByZWZlcnJlZExhbmd1YWdlIjpudWxsLCJ0eXBlIjoiVVNFUiIsInBlcm1pc3Npb25zIjpbIlBST0dSQU0tUEFDQS1BVS5XUklURSIsIlBST0dSQU1EQVRBLVBBQ0EtQVUuV1JJVEUiXX19LCJzY29wZSI6WyJQUk9HUkFNREFUQS1QQUNBLUFVLldSSVRFIiwiUFJPR1JBTS1QQUNBLUFVLldSSVRFIl19.hjJXeurgqv6xaGRN9EmLQrTrK2MOp0R5RxwbnMElwcJTMwMr5MbMRYttH9jDyevZGUHW13sFsonwiXZquF2xIzUeOdditF_I2ZVzg5My_uh0jEwarscRAV_ESmvUzA0YSryHHI6f-DKgxd2S6ngLNj9kCRuFk2K_aVMXU4cgt3vV5jAoVQ-HsE2n17paYqW7jDgjcQW32HzT9Dq6WDBPvy5pndcS4AsvqrsIvJKCUDjtmjWRIcGnQ8-UDg7lNxdju_o7LYxDub1x5iuaqm5851l1z_d7EM15JyxNHh9EX2jfEkyGhXsuBIF9TvIW3LZtExUKS1n2OScq6bqjb5xSaw`;

/** has the following scopes:
 * "score-argo-qa.WRITE"
 * "song-argo-qa.WRITE"
 * "program-service.WRITE"
 **/
const DCC_USER = `eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjI2ODQ0NTgsImV4cCI6MTU2Mjc3MDg1OCwic3ViIjoiN2VlMWRkODctNTUzMC00MzA0LWIzYjItZTZiYzU5M2FmYjM3IiwiaXNzIjoiZWdvIiwiYXVkIjpbXSwianRpIjoiYWI0NTI0MjUtYjJiOC00MzExLWFmOTAtZGFkNzhjYjM0YTUzIiwiY29udGV4dCI6eyJzY29wZSI6WyJzY29yZS1hcmdvLXFhLldSSVRFIiwic29uZy1hcmdvLXFhLldSSVRFIiwicHJvZ3JhbS1zZXJ2aWNlLldSSVRFIl0sInVzZXIiOnsibmFtZSI6Im9pY3J0ZXN0dXNlckBnbWFpbC5jb20iLCJlbWFpbCI6Im9pY3J0ZXN0dXNlckBnbWFpbC5jb20iLCJzdGF0dXMiOiJBUFBST1ZFRCIsImZpcnN0TmFtZSI6Ik9JQ1IiLCJsYXN0TmFtZSI6IlRlc3RlciIsImNyZWF0ZWRBdCI6MTU2MjYyMzkwODU2MywibGFzdExvZ2luIjoxNTYyNjg0NDU4NDA5LCJwcmVmZXJyZWRMYW5ndWFnZSI6bnVsbCwidHlwZSI6IlVTRVIiLCJwZXJtaXNzaW9ucyI6WyJzY29yZS1hcmdvLXFhLldSSVRFIiwicHJvZ3JhbS1zZXJ2aWNlLldSSVRFIiwic29uZy1hcmdvLXFhLldSSVRFIl19fSwic2NvcGUiOlsic2NvcmUtYXJnby1xYS5XUklURSIsInNvbmctYXJnby1xYS5XUklURSIsInByb2dyYW0tc2VydmljZS5XUklURSJdfQ.ma89agWRE8Vcz0M8BxNyyitx24CbjH1h7QSTOTHEJE91LshXZ7Dl6JUyka8hjUYBXxa2sNOd_iKWvXhj7WrzMC3YMAaSzntn_veCgkxDk6BK4UsY7oC3j6fyU3508dZEFHCjaSCmJ7Hjo8YMaXE9rmokyNvppAfx39EhSl2UIKWHnlnm_dNetFDy9ivytg1YZlveWCXdhegHPnh75iJJSxvMA3rgJ9zJbpr5FSMAumuYBuWlIr5smFqh2xnVGubEFfGwMnngMEX79_056VKLkXI0VPdx5hVqQF2w93-mJwPfB6NJGpydGehnHZl-rAFOe-MeOAW64Zel_24uatZQrA`;

const BOGUS_PROGRAM_ID = 'BOGUS_PROGRAM';

describe('isValidJwt', () => {
  it('should return false if undefined', () => {
    expect(isValidJwt()).to.be.false;
  });
  it('should return true for valid jwt', () => {
    [DATA_SUBMITTER, PROGRAM_ADMIN, DCC_USER].forEach(token => {
      expect(isValidJwt(token)).to.be.true;
    });
  });
});

describe('getAuthorizedProgramScopes', () => {
  it('should return authorized program scopes', () => {
    expect(getAuthorizedProgramScopes(DATA_SUBMITTER)).to.deep.equal([
      { policy: 'PROGRAM-WP-CPMP-US', permission: 'READ' },
      { policy: 'PROGRAM-PACA-AU', permission: 'READ' },
    ]);
    expect(getAuthorizedProgramScopes(PROGRAM_ADMIN)).to.deep.equal([
      { policy: 'PROGRAM-PACA-AU', permission: 'WRITE' },
    ]);
    expect(getAuthorizedProgramScopes(DCC_USER)).to.deep.equal([]);
  });
});

describe('isDccMember', () => {
  it('should validate DCC member as such', () => {
    expect(isDccMember(DCC_USER)).to.be.true;
  });
  it('should validate non DCC member as such', () => {
    expect(isDccMember(DATA_SUBMITTER)).to.be.false;
  });
});

describe('canReadProgram', () => {
  it('should validate read access', () => {
    expect(canReadProgram({ egoJwt: PROGRAM_ADMIN, programId: 'PACA-AU' })).to.be.true;
  });
  it('should invalidate read access', () => {
    expect(canReadProgram({ egoJwt: PROGRAM_ADMIN, programId: BOGUS_PROGRAM_ID })).to.be.false;
  });
});

describe('canWriteProgram', () => {
  it('should validate write access', () => {
    expect(canWriteProgram({ egoJwt: PROGRAM_ADMIN, programId: 'PACA-AU' })).to.be.true;
  });
  it('should invalidate write access', () => {
    expect(canWriteProgram({ egoJwt: PROGRAM_ADMIN, programId: BOGUS_PROGRAM_ID })).to.be.false;
  });
  it('should invalidate read only access', () => {
    expect(canWriteProgram({ egoJwt: DATA_SUBMITTER, programId: 'WP-CPMP-US' })).to.be.false;
  });
});

describe('isProgramAdmin', () => {
  it('should validate admin access', () => {
    expect(isProgramAdmin({ egoJwt: PROGRAM_ADMIN, programId: 'PACA-AU' })).to.be.true;
  });
  it('should invalidate read only access', () => {
    expect(isProgramAdmin({ egoJwt: DATA_SUBMITTER, programId: 'PACA-AU' })).to.be.false;
  });
});
