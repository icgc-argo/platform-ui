/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { useQuery } from '@apollo/client';
import orderBy from 'lodash/orderBy';
import NextLink from 'next/link';
import * as React from 'react';

import { css, DnaLoader, Icon, Input, MenuItem, styled, SubMenu } from '@icgc-argo/uikit';

import { getConfig } from 'global/config';
import useAuthContext from 'global/hooks/useAuthContext';
import usePersistentState from 'global/hooks/usePersistentContext';
import { canWriteProgram, isCollaborator, isDccMember, isRdpcMember } from 'global/utils/egoJwt';
import SIDE_MENU_CLINICAL_SUBMISSION_STATE_QUERY from './gql/SIDE_MENU_CLINICAL_SUBMISSION_STATE_QUERY';
import SIDE_MENU_PROGRAM_LIST_QUERY from './gql/SIDE_MENU_PROGRAM_LIST_QUERY';
import SIDE_MENU_SAMPLE_REGISTRATION_STATE_QUERY from './gql/SIDE_MENU_SAMPLE_REGISTRATION_STATE_QUERY';

import {
  DCC_DASHBOARD_PATH,
  PROGRAMS_LIST_PATH,
  PROGRAM_CLINICAL_DATA_PATH,
  PROGRAM_CLINICAL_SUBMISSION_PATH,
  PROGRAM_DASHBOARD_PATH,
  PROGRAM_MANAGE_PATH,
  PROGRAM_SAMPLE_REGISTRATION_PATH,
  PROGRAM_SHORT_NAME_PATH,
} from 'global/constants/pages';
import usePageContext from 'global/hooks/usePageContext';
import { ClinicalSubmissionStatus } from './program-clinical-submission/types';
import {
  ClinicalEntityQueryResponse,
  defaultClinicalEntityFilters,
} from './program-submitted-data/common';
import SUBMITTED_DATA_SIDE_MENU_QUERY from './program-submitted-data/gql/SUBMITTED_DATA_SIDE_MENU_QUERY';
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
  const toggleItem = (itemIndex) =>
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
  const { egoJwt, permissions } = useAuthContext();
  const { FEATURE_SUBMITTED_DATA_ENABLED } = getConfig();
  const { data } = useQuery<ClinicalSubmissionQueryResponse>(
    SIDE_MENU_CLINICAL_SUBMISSION_STATE_QUERY,
    {
      variables: {
        programShortName: props.program.shortName,
      },
    },
  );

  const { data: clinicalData } = useQuery<SampleRegistrationQueryResponse>(
    SIDE_MENU_SAMPLE_REGISTRATION_STATE_QUERY,
    {
      variables: {
        programShortName: props.program.shortName,
      },
    },
  );

  const { data: sideMenuQuery } =
    FEATURE_SUBMITTED_DATA_ENABLED &&
    useQuery<ClinicalEntityQueryResponse>(SUBMITTED_DATA_SIDE_MENU_QUERY, {
      errorPolicy: 'all',
      variables: {
        programShortName: props.program.shortName,
        filters: defaultClinicalEntityFilters,
      },
    });
  const clinicalDataHasErrors = sideMenuQuery?.clinicalData.clinicalErrors.length > 0;

  const clinicalRegistration = clinicalData && clinicalData.clinicalRegistration;
  const clinicalRegistrationHasError =
    clinicalRegistration &&
    (!!clinicalRegistration.errors.length || !!clinicalRegistration.fileErrors.length);
  const clinicalRegistrationInProgress = clinicalRegistration && !!clinicalRegistration.fileName;

  const clinicalSubmissionHasSchemaErrors = data
    ? data.clinicalSubmissions.clinicalEntities.some((entity) => !!entity.schemaErrors.length)
    : false;

  const isSubmissionSystemDisabled = useSubmissionSystemDisabled();

  const canSeeCollaboratorView = React.useMemo(() => {
    return (
      egoJwt &&
      !isCollaborator({
        permissions,
        programId: props.program.shortName,
      })
    );
  }, [egoJwt]);
  const canWriteToProgram = React.useMemo(() => {
    return (
      egoJwt &&
      canWriteProgram({
        permissions,
        programId: props.program.shortName,
      })
    );
  }, [egoJwt]);

  return (
    <div>
      <NextLink
        as={PROGRAM_DASHBOARD_PATH.replace(PROGRAM_SHORT_NAME_PATH, props.program.shortName)}
        href={PROGRAM_DASHBOARD_PATH}
      >
        <MenuItem
          level={3}
          content="Dashboard"
          selected={PROGRAM_DASHBOARD_PATH === pageContext.pathname && props.isCurrentlyViewed}
        />
      </NextLink>
      {canSeeCollaboratorView && (
        <React.Fragment>
          <NextLink
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
          </NextLink>
          <NextLink
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
                    (
                      {
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
                      } as { [k in typeof data.clinicalSubmissions.state]: React.ReactNode }
                    )[data ? data.clinicalSubmissions.state : null]
                  )}
                </StatusMenuItem>
              }
              selected={
                PROGRAM_CLINICAL_SUBMISSION_PATH === pageContext.pathname && props.isCurrentlyViewed
              }
            />
          </NextLink>
          {FEATURE_SUBMITTED_DATA_ENABLED && (
            <NextLink
              as={`${PROGRAM_CLINICAL_DATA_PATH.replace(
                PROGRAM_SHORT_NAME_PATH,
                props.program.shortName,
              )}?tab=donor`}
              href={PROGRAM_CLINICAL_DATA_PATH}
            >
              <MenuItem
                level={3}
                content={
                  <StatusMenuItem>
                    Submitted Data{' '}
                    {clinicalDataHasErrors && <Icon name="exclamation" fill="error" width="15px" />}
                  </StatusMenuItem>
                }
                selected={
                  PROGRAM_CLINICAL_DATA_PATH === pageContext.pathname && props.isCurrentlyViewed
                }
              />
            </NextLink>
          )}
        </React.Fragment>
      )}
      {canWriteToProgram && (
        <NextLink
          as={PROGRAM_MANAGE_PATH.replace(PROGRAM_SHORT_NAME_PATH, props.program.shortName)}
          href={PROGRAM_MANAGE_PATH}
        >
          <MenuItem
            level={3}
            content="Manage Program"
            selected={PROGRAM_MANAGE_PATH === pageContext.pathname && props.isCurrentlyViewed}
          />
        </NextLink>
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
  const { egoJwt, permissions } = useAuthContext();
  const canSeeAllPrograms = React.useMemo(() => {
    return egoJwt && isDccMember(permissions);
  }, [egoJwt]);

  return (
    <React.Fragment>
      <MenuItem
        level={1}
        selected
        contentAs="div"
        content={
          <Input
            aria-label="programs search"
            onChange={(e) => {
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
      {canSeeAllPrograms && (
        <NextLink as={PROGRAMS_LIST_PATH} href={PROGRAMS_LIST_PATH}>
          <MenuItem
            level={2}
            content={'All Programs'}
            selected={pageContext.pathname === PROGRAMS_LIST_PATH}
          />
        </NextLink>
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
    </React.Fragment>
  );
};

export default function SideMenu() {
  const pageContext = usePageContext();
  const isInProgramSection = pageContext.pathname.indexOf(PROGRAMS_LIST_PATH) === 0;
  const { activeItem, toggleItem } = useToggledSelectState(isInProgramSection ? 1 : 0);
  const { data: { programs } = { programs: null }, loading } = useQuery(
    SIDE_MENU_PROGRAM_LIST_QUERY,
  );

  const { data: egoTokenData, egoJwt, permissions } = useAuthContext();

  const isDcc = React.useMemo(() => (egoJwt ? isDccMember(permissions) : false), [egoJwt]);
  const isRdpc = React.useMemo(() => (egoJwt ? isRdpcMember(permissions) : false), [egoJwt]);

  const canOnlyAccessOneProgram = programs && programs.length === 1 && !isDcc;
  const canSeeDcc = isDcc;

  return (
    <SubMenu>
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
        <React.Fragment>
          {canSeeDcc && (
            <NextLink href={DCC_DASHBOARD_PATH}>
              <MenuItem icon={<Icon name="dashboard" />} content={'DCC Dashboard'} />
            </NextLink>
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
        </React.Fragment>
      )}
    </SubMenu>
  );
}
