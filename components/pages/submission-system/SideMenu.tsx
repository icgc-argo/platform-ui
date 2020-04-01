import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useLazyQuery } from '@apollo/react-hooks';
import orderBy from 'lodash/orderBy';
import Link from 'next/link';
import Router from 'next/router';
import styled from '@emotion/styled';

import Submenu, { MenuItem } from 'uikit/SubMenu';
import { Input } from 'uikit/form';
import Icon from 'uikit/Icon';
import { css } from 'uikit';
import DnaLoader from 'uikit/DnaLoader';

import SIDE_MENU_PROGRAM_LIST from './SIDE_MENU_PROGRAM_LIST.gql';
import SIDE_MENU_CLINICAL_SUBMISSION_STATE from './SIDE_MENU_CLINICAL_SUBMISSION_STATE.gql';
import SIDE_MENU_SAMPLE_REGISTRATION_STATE from './SIDE_MENU_SAMPLE_REGISTRATION_STATE.gql';
import useAuthContext from 'global/hooks/useAuthContext';
import usePersistentState from 'global/hooks/usePersistentContext';
import {
  isDccMember,
  getAuthorizedProgramScopes,
  canWriteProgram,
  isCollaborator,
  isRdpcMember,
} from 'global/utils/egoJwt';

import {
  PROGRAM_SHORT_NAME_PATH,
  PROGRAM_MANAGE_PATH,
  PROGRAM_DASHBOARD_PATH,
  PROGRAM_SAMPLE_REGISTRATION_PATH,
  PROGRAM_CLINICAL_SUBMISSION_PATH,
  PROGRAMS_LIST_PATH,
  DCC_DASHBOARD_PATH,
} from 'global/constants/pages';
import usePageContext from 'global/hooks/usePageContext';
import { ClinicalSubmissionStatus } from './program-clinical-submission/types';
import { useSubmissionSystemDisabled } from './SubmissionSystemLockedNotification';

type SideMenuProgram = {
  shortName: string;
};

const Loader = () => (
  <div
    css={css`
      display: flex;
      width: 100%;
      justify-content: center;
      padding-top: 32px;
      padding-bottom: 32px;
    `}
  >
    <DnaLoader />
  </div>
);

const StatusMenuItem = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding-right: 15px;
`;

const useToggledSelectState = (initialIndex = -1) => {
  const [activeItem, setActiveItem] = React.useState(initialIndex);
  const toggleItem = itemIndex =>
    itemIndex === activeItem ? setActiveItem(-1) : setActiveItem(itemIndex);
  return { activeItem, toggleItem };
};

type ClinicalSubmissionQueryResponse = {
  clinicalSubmissions: {
    state: ClinicalSubmissionStatus;
    clinicalEntities: Array<{
      schemaErrors: Array<{
        row: number;
      }>;
    }>;
  };
};

type RegistrationFileError = {
  message: string;
  code: string;
};

type SampleRegistrationQueryResponse = {
  clinicalRegistration: {
    programShortName: string;
    fileName: string;
    errors: Array<{ type: string }>;
    fileErrors: Array<RegistrationFileError>;
  };
};

const LinksToProgram = (props: { program: SideMenuProgram; isCurrentlyViewed: boolean }) => {
  const pageContext = usePageContext();
  const { token } = useAuthContext();
  const { data } = useQuery<ClinicalSubmissionQueryResponse>(SIDE_MENU_CLINICAL_SUBMISSION_STATE, {
    variables: {
      programShortName: props.program.shortName,
    },
  });

  const { data: clinicalData } = useQuery<SampleRegistrationQueryResponse>(
    SIDE_MENU_SAMPLE_REGISTRATION_STATE,
    {
      variables: {
        programShortName: props.program.shortName,
      },
    },
  );

  const clinicalRegistration = clinicalData && clinicalData.clinicalRegistration;
  const clinicalRegistrationHasError =
    clinicalRegistration &&
    (!!clinicalRegistration.errors.length || !!clinicalRegistration.fileErrors.length);
  const clinicalRegistrationInProgress = clinicalRegistration && !!clinicalRegistration.fileName;

  const clinicalSubmissionHasSchemaErrors = data
    ? data.clinicalSubmissions.clinicalEntities.some(entity => !!entity.schemaErrors.length)
    : false;

  const isSubmissionSystemDisabled = useSubmissionSystemDisabled();
  return (
    <div>
      <Link
        prefetch
        as={PROGRAM_DASHBOARD_PATH.replace(PROGRAM_SHORT_NAME_PATH, props.program.shortName)}
        href={PROGRAM_DASHBOARD_PATH}
      >
        <MenuItem
          level={3}
          content="Dashboard"
          selected={PROGRAM_DASHBOARD_PATH === pageContext.pathname && props.isCurrentlyViewed}
        />
      </Link>
      {token && !isCollaborator({ egoJwt: token, programId: props.program.shortName }) && (
        <>
          <Link
            prefetch
            as={PROGRAM_SAMPLE_REGISTRATION_PATH.replace(
              PROGRAM_SHORT_NAME_PATH,
              props.program.shortName,
            )}
            href={PROGRAM_SAMPLE_REGISTRATION_PATH}
          >
            <MenuItem
              level={3}
              content={
                <StatusMenuItem>
                  Register Samples
                  {isSubmissionSystemDisabled ? (
                    <Icon name="lock" fill="accent3_dark" width="15px" />
                  ) : clinicalRegistrationHasError ? (
                    <Icon name="exclamation" fill="error" width="15px" />
                  ) : clinicalRegistrationInProgress ? (
                    <Icon name="ellipses" fill="warning" width="15px" />
                  ) : null}
                </StatusMenuItem>
              }
              selected={
                PROGRAM_SAMPLE_REGISTRATION_PATH === pageContext.pathname && props.isCurrentlyViewed
              }
            />
          </Link>
          <Link
            prefetch
            as={PROGRAM_CLINICAL_SUBMISSION_PATH.replace(
              PROGRAM_SHORT_NAME_PATH,
              props.program.shortName,
            )}
            href={PROGRAM_CLINICAL_SUBMISSION_PATH}
          >
            <MenuItem
              level={3}
              content={
                <StatusMenuItem>
                  Submit Clinical Data
                  {isSubmissionSystemDisabled ? (
                    <Icon name="lock" fill="accent3_dark" width="15px" />
                  ) : (
                    ({
                      OPEN: clinicalSubmissionHasSchemaErrors ? (
                        <Icon name="exclamation" fill="error" width="15px" />
                      ) : (
                        <Icon name="ellipses" fill="warning" width="15px" />
                      ),
                      VALID: <Icon name="ellipses" fill="warning" width="15px" />,
                      INVALID: <Icon name="exclamation" fill="error" width="15px" />,
                      INVALID_BY_MIGRATION: <Icon name="exclamation" fill="error" width="15px" />,
                      PENDING_APPROVAL: <Icon name="lock" fill="accent3_dark" width="15px" />,
                      // submission state remains as null and rejects creating open state with initial invalid upload
                      // if errors exist, error icon should still show up despite the null state
                      [null as any]: clinicalSubmissionHasSchemaErrors ? (
                        <Icon name="exclamation" fill="error" width="15px" />
                      ) : null,
                    } as { [k in typeof data.clinicalSubmissions.state]: React.ReactNode })[
                      data ? data.clinicalSubmissions.state : null
                    ]
                  )}
                </StatusMenuItem>
              }
              selected={
                PROGRAM_CLINICAL_SUBMISSION_PATH === pageContext.pathname && props.isCurrentlyViewed
              }
            />
          </Link>
        </>
      )}
      {token && canWriteProgram({ egoJwt: token, programId: props.program.shortName }) && (
        <Link
          prefetch
          as={PROGRAM_MANAGE_PATH.replace(PROGRAM_SHORT_NAME_PATH, props.program.shortName)}
          href={PROGRAM_MANAGE_PATH}
        >
          <MenuItem
            level={3}
            content="Manage Program"
            selected={PROGRAM_MANAGE_PATH === pageContext.pathname && props.isCurrentlyViewed}
          />
        </Link>
      )}
    </div>
  );
};

const MultiProgramsSection = ({ programs }: { programs: Array<SideMenuProgram> }) => {
  const [programNameSearch, setProgramNameSearch] = usePersistentState('programNameSearch', '');
  const orderedPrograms = orderBy(programs, 'shortName');
  const filteredPrograms = orderedPrograms.filter(
    ({ shortName }) =>
      !programNameSearch.length || shortName.search(new RegExp(programNameSearch, 'i')) > -1,
  );
  const pageContext = usePageContext();
  const currentViewingProgramIndex = filteredPrograms
    .map(({ shortName }) => shortName)
    .indexOf(String(pageContext.query.shortName));
  const { activeItem: activeProgramIndex, toggleItem: toggleProgramIndex } = useToggledSelectState(
    currentViewingProgramIndex,
  );
  const { token } = useAuthContext();
  return (
    <>
      <MenuItem
        level={1}
        selected
        contentAs="div"
        content={
          <Input
            aria-label="programs search"
            onChange={e => {
              setProgramNameSearch(e.target.value);
            }}
            value={programNameSearch}
            css={css`
              flex: 1;
            `}
            preset="search"
          />
        }
      />
      {token && isDccMember(token) && (
        <Link prefetch as={PROGRAMS_LIST_PATH} href={PROGRAMS_LIST_PATH}>
          <MenuItem
            level={2}
            content={'All Programs'}
            selected={pageContext.pathname === PROGRAMS_LIST_PATH}
          />
        </Link>
      )}
      {filteredPrograms.map((program, programIndex) => (
        <MenuItem
          key={program.shortName}
          content={program.shortName}
          onClick={() => toggleProgramIndex(programIndex)}
          selected={programIndex === activeProgramIndex}
        >
          <LinksToProgram
            program={program}
            isCurrentlyViewed={programIndex === currentViewingProgramIndex}
          />
        </MenuItem>
      ))}
    </>
  );
};

export default function SideMenu() {
  const pageContext = usePageContext();
  const isInProgramSection = pageContext.pathname.indexOf(PROGRAMS_LIST_PATH) === 0;
  const { activeItem, toggleItem } = useToggledSelectState(isInProgramSection ? 1 : 0);
  const { data: { programs } = { programs: null }, loading } = useQuery(SIDE_MENU_PROGRAM_LIST);

  const { data: egoTokenData, token } = useAuthContext();
  const isDcc = token ? isDccMember(token) : false;
  const isRdpc = token ? isRdpcMember(token) : false;

  const accessibleProgramScopes = token ? getAuthorizedProgramScopes(token) : [];

  const canOnlyAccessOneProgram = programs && programs.length === 1 && !isDcc;
  const canSeeRdpcs = isDcc;
  const canSeeDcc = isDcc;

  return (
    <Submenu>
      {canOnlyAccessOneProgram ? (
        loading ? (
          <Loader />
        ) : (
          // if user can only access one program, they only see the links for that program
          <MenuItem icon={<Icon name="programs" />} content={'My Programs'} selected noChevron>
            <MenuItem
              key={programs[0].shortName}
              content={programs[0].shortName}
              selected
              noChevron
            >
              <LinksToProgram program={programs[0]} isCurrentlyViewed={true} />
            </MenuItem>
          </MenuItem>
        )
      ) : (
        <>
          {canSeeDcc && (
            <Link href={DCC_DASHBOARD_PATH}>
              <MenuItem icon={<Icon name="dashboard" />} content={'DCC Dashboard'} />
            </Link>
          )}
          {canSeeRdpcs && (
            <MenuItem icon={<Icon name="rdpc" />} content={'RDPCs'} onClick={() => toggleItem(0)}>
              <MenuItem content="what goes here?" />
            </MenuItem>
          )}
          <MenuItem
            icon={<Icon name="programs" />}
            content={'My Programs'}
            selected={activeItem === 1}
            onClick={() => {
              if (isDcc || isRdpc) toggleItem(1);
            }}
            noChevron={!isDcc && !isRdpc}
          >
            {loading ? <Loader /> : <MultiProgramsSection programs={programs} />}
          </MenuItem>
        </>
      )}
    </Submenu>
  );
}
