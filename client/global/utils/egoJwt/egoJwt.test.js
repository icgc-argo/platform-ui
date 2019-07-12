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
const DATA_SUBMITTER = `eyJhbGciOiJSUzI1NiJ9.ewogICJpYXQiOiAxNTYyNjc5MjA5LAogICJleHAiOiAyMDYyNzY1NjA5LAogICJzdWIiOiAiM2RjNjU5MmItMTQzNi00ZDVlLTk5MzEtMTRiZjFjZmVlZGU4IiwKICAiaXNzIjogImVnbyIsCiAgImF1ZCI6IFtdLAogICJqdGkiOiAiZDUyZTFjOGYtYzVkYS00ZGRkLTgzODUtODI2OWM4NzcxYzhiIiwKICAiY29udGV4dCI6IHsKICAgICJzY29wZSI6IFsKICAgICAgIlBST0dSQU0tV1AtQ1BNUC1VUy5SRUFEIiwKICAgICAgIlBST0dSQU1EQVRBLVBBQ0EtQVUuV1JJVEUiLAogICAgICAiUFJPR1JBTURBVEEtV1AtQ1BNUC1VUy5XUklURSIsCiAgICAgICJQUk9HUkFNLVBBQ0EtQVUuUkVBRCIKICAgIF0sCiAgICAidXNlciI6IHsKICAgICAgIm5hbWUiOiAiYXJnby5kYXRhc3VibWl0dGVyQGdtYWlsLmNvbSIsCiAgICAgICJlbWFpbCI6ICJhcmdvLmRhdGFzdWJtaXR0ZXJAZ21haWwuY29tIiwKICAgICAgInN0YXR1cyI6ICJBUFBST1ZFRCIsCiAgICAgICJmaXJzdE5hbWUiOiAiRGFuIiwKICAgICAgImxhc3ROYW1lIjogIkRhdGEgU3VibWl0dHRlciIsCiAgICAgICJjcmVhdGVkQXQiOiAxNTYyNjI1NjQxODYxLAogICAgICAibGFzdExvZ2luIjogMTU2MjY3OTIwOTA1MCwKICAgICAgInByZWZlcnJlZExhbmd1YWdlIjogbnVsbCwKICAgICAgInR5cGUiOiAiVVNFUiIsCiAgICAgICJwZXJtaXNzaW9ucyI6IFsKICAgICAgICAiUFJPR1JBTS1XUC1DUE1QLVVTLlJFQUQiLAogICAgICAgICJQUk9HUkFNREFUQS1XUC1DUE1QLVVTLldSSVRFIiwKICAgICAgICAiUFJPR1JBTS1QQUNBLUFVLlJFQUQiLAogICAgICAgICJQUk9HUkFNREFUQS1QQUNBLUFVLldSSVRFIgogICAgICBdCiAgICB9CiAgfSwKICAic2NvcGUiOiBbCiAgICAiUFJPR1JBTS1XUC1DUE1QLVVTLlJFQUQiLAogICAgIlBST0dSQU1EQVRBLVBBQ0EtQVUuV1JJVEUiLAogICAgIlBST0dSQU1EQVRBLVdQLUNQTVAtVVMuV1JJVEUiLAogICAgIlBST0dSQU0tUEFDQS1BVS5SRUFEIgogIF0KfQ==.bNyAjQZnTynVVUwGIYWvwnf0Bu-TihJrgncMRFHfd1S_oFV9mAU7Bf-W-J4uTtnWnWurK1qsGBHJ3QO3SDiBIhaRRj4R9qAY6fDkELNamc3E7Wxa52fmikZyo0PazdmGSEefNAW1poyjZa7XCnGYDQhFNHp9a9afvAuthRqRKXA6RV5NLtJ9WUNsoA_jg9i8z4bNQb8gubLP_e3340u7G6fFR5O8yYXtOJFblNDSFbG9_OFLpZxz-iUTCAQ5tH_aDeSgCfi780BJN9sI85rBxtpVkHwkZgLBBmv0_snVKb5s-zGr4beXbh1rBKxcAd43BKCDvZbZy4YsEmGd1JQ6uA`;

/** has the following scopes:
 * "PROGRAMDATA-PACA-AU.WRITE"
 * "PROGRAM-PACA-AU.WRITE"
 **/
const PROGRAM_ADMIN = `eyJhbGciOiJSUzI1NiJ9.ewogICJpYXQiOiAxNTYyNjc5MzY3LAogICJleHAiOiAyMDYyNzY1NzY3LAogICJzdWIiOiAiMTYwZmZlYzctNDk0Zi00ZGU3LWFjMDItOGRlYjEwM2I3MDU3IiwKICAiaXNzIjogImVnbyIsCiAgImF1ZCI6IFtdLAogICJqdGkiOiAiMmU3ZWZjY2QtZWNlMC00NTQ4LWE2MzAtMjA5ZDEyNDFmNDU5IiwKICAiY29udGV4dCI6IHsKICAgICJzY29wZSI6IFsKICAgICAgIlBST0dSQU1EQVRBLVBBQ0EtQVUuV1JJVEUiLAogICAgICAiUFJPR1JBTS1QQUNBLUFVLldSSVRFIgogICAgXSwKICAgICJ1c2VyIjogewogICAgICAibmFtZSI6ICJhcmdvLnByb2dyYW1hZEBnbWFpbC5jb20iLAogICAgICAiZW1haWwiOiAiYXJnby5wcm9ncmFtYWRAZ21haWwuY29tIiwKICAgICAgInN0YXR1cyI6ICJBUFBST1ZFRCIsCiAgICAgICJmaXJzdE5hbWUiOiAiUGF1bCIsCiAgICAgICJsYXN0TmFtZSI6ICJQcm9ncmFtIEFkbWluIiwKICAgICAgImNyZWF0ZWRBdCI6IDE1NjI2MjU2Mjg4MzgsCiAgICAgICJsYXN0TG9naW4iOiAxNTYyNjc5MzY3NjA2LAogICAgICAicHJlZmVycmVkTGFuZ3VhZ2UiOiBudWxsLAogICAgICAidHlwZSI6ICJVU0VSIiwKICAgICAgInBlcm1pc3Npb25zIjogWwogICAgICAgICJQUk9HUkFNLVBBQ0EtQVUuV1JJVEUiLAogICAgICAgICJQUk9HUkFNREFUQS1QQUNBLUFVLldSSVRFIgogICAgICBdCiAgICB9CiAgfSwKICAic2NvcGUiOiBbCiAgICAiUFJPR1JBTURBVEEtUEFDQS1BVS5XUklURSIsCiAgICAiUFJPR1JBTS1QQUNBLUFVLldSSVRFIgogIF0KfQ==.hjJXeurgqv6xaGRN9EmLQrTrK2MOp0R5RxwbnMElwcJTMwMr5MbMRYttH9jDyevZGUHW13sFsonwiXZquF2xIzUeOdditF_I2ZVzg5My_uh0jEwarscRAV_ESmvUzA0YSryHHI6f-DKgxd2S6ngLNj9kCRuFk2K_aVMXU4cgt3vV5jAoVQ-HsE2n17paYqW7jDgjcQW32HzT9Dq6WDBPvy5pndcS4AsvqrsIvJKCUDjtmjWRIcGnQ8-UDg7lNxdju_o7LYxDub1x5iuaqm5851l1z_d7EM15JyxNHh9EX2jfEkyGhXsuBIF9TvIW3LZtExUKS1n2OScq6bqjb5xSaw`;

/** has the following scopes:
 * "score-argo-qa.WRITE"
 * "song-argo-qa.WRITE"
 * "program-service.WRITE"
 **/
const DCC_USER = `eyJhbGciOiJSUzI1NiJ9.ewogICJpYXQiOiAxNTYyNjg0NDU4LAogICJleHAiOiAyMDYyNzcwODU4LAogICJzdWIiOiAiN2VlMWRkODctNTUzMC00MzA0LWIzYjItZTZiYzU5M2FmYjM3IiwKICAiaXNzIjogImVnbyIsCiAgImF1ZCI6IFtdLAogICJqdGkiOiAiYWI0NTI0MjUtYjJiOC00MzExLWFmOTAtZGFkNzhjYjM0YTUzIiwKICAiY29udGV4dCI6IHsKICAgICJzY29wZSI6IFsKICAgICAgInNjb3JlLWFyZ28tcWEuV1JJVEUiLAogICAgICAic29uZy1hcmdvLXFhLldSSVRFIiwKICAgICAgInByb2dyYW0tc2VydmljZS5XUklURSIKICAgIF0sCiAgICAidXNlciI6IHsKICAgICAgIm5hbWUiOiAib2ljcnRlc3R1c2VyQGdtYWlsLmNvbSIsCiAgICAgICJlbWFpbCI6ICJvaWNydGVzdHVzZXJAZ21haWwuY29tIiwKICAgICAgInN0YXR1cyI6ICJBUFBST1ZFRCIsCiAgICAgICJmaXJzdE5hbWUiOiAiT0lDUiIsCiAgICAgICJsYXN0TmFtZSI6ICJUZXN0ZXIiLAogICAgICAiY3JlYXRlZEF0IjogMTU2MjYyMzkwODU2MywKICAgICAgImxhc3RMb2dpbiI6IDE1NjI2ODQ0NTg0MDksCiAgICAgICJwcmVmZXJyZWRMYW5ndWFnZSI6IG51bGwsCiAgICAgICJ0eXBlIjogIlVTRVIiLAogICAgICAicGVybWlzc2lvbnMiOiBbCiAgICAgICAgInNjb3JlLWFyZ28tcWEuV1JJVEUiLAogICAgICAgICJwcm9ncmFtLXNlcnZpY2UuV1JJVEUiLAogICAgICAgICJzb25nLWFyZ28tcWEuV1JJVEUiCiAgICAgIF0KICAgIH0KICB9LAogICJzY29wZSI6IFsKICAgICJzY29yZS1hcmdvLXFhLldSSVRFIiwKICAgICJzb25nLWFyZ28tcWEuV1JJVEUiLAogICAgInByb2dyYW0tc2VydmljZS5XUklURSIKICBdCn0=.UDg7lNxdju_o7LYxDub1x5iuaqm5851l1z_d7EM15JyxNHh9EX2jfEkyGhXsuBIF9TvIW3LZtExUKS1n2OScq6bqjb5xSaw`;

const EXPIRED_TOKEN =
  'eyJhbGciOiJSUzI1NiJ9.ewogICJpYXQiOiAxNTYyNjg0NDU4LAogICJleHAiOiAxNTYyNzcwODU4LAogICJzdWIiOiAiN2VlMWRkODctNTUzMC00MzA0LWIzYjItZTZiYzU5M2FmYjM3IiwKICAiaXNzIjogImVnbyIsCiAgImF1ZCI6IFtdLAogICJqdGkiOiAiYWI0NTI0MjUtYjJiOC00MzExLWFmOTAtZGFkNzhjYjM0YTUzIiwKICAiY29udGV4dCI6IHsKICAgICJzY29wZSI6IFsKICAgICAgInNjb3JlLWFyZ28tcWEuV1JJVEUiLAogICAgICAic29uZy1hcmdvLXFhLldSSVRFIiwKICAgICAgInByb2dyYW0tc2VydmljZS5XUklURSIKICAgIF0sCiAgICAidXNlciI6IHsKICAgICAgIm5hbWUiOiAib2ljcnRlc3R1c2VyQGdtYWlsLmNvbSIsCiAgICAgICJlbWFpbCI6ICJvaWNydGVzdHVzZXJAZ21haWwuY29tIiwKICAgICAgInN0YXR1cyI6ICJBUFBST1ZFRCIsCiAgICAgICJmaXJzdE5hbWUiOiAiT0lDUiIsCiAgICAgICJsYXN0TmFtZSI6ICJUZXN0ZXIiLAogICAgICAiY3JlYXRlZEF0IjogMTU2MjYyMzkwODU2MywKICAgICAgImxhc3RMb2dpbiI6IDE1NjI2ODQ0NTg0MDksCiAgICAgICJwcmVmZXJyZWRMYW5ndWFnZSI6IG51bGwsCiAgICAgICJ0eXBlIjogIlVTRVIiLAogICAgICAicGVybWlzc2lvbnMiOiBbCiAgICAgICAgInNjb3JlLWFyZ28tcWEuV1JJVEUiLAogICAgICAgICJwcm9ncmFtLXNlcnZpY2UuV1JJVEUiLAogICAgICAgICJzb25nLWFyZ28tcWEuV1JJVEUiCiAgICAgIF0KICAgIH0KICB9LAogICJzY29wZSI6IFsKICAgICJzY29yZS1hcmdvLXFhLldSSVRFIiwKICAgICJzb25nLWFyZ28tcWEuV1JJVEUiLAogICAgInByb2dyYW0tc2VydmljZS5XUklURSIKICBdCn0=.UDg7lNxdju_o7LYxDub1x5iuaqm5851l1z_d7EM15JyxNHh9EX2jfEkyGhXsuBIF9TvIW3LZtExUKS1n2OScq6bqjb5xSaw';

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
  it('should return false for expired token', () => {
    expect(isValidJwt(EXPIRED_TOKEN)).to.be.false;
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
