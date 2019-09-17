import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useLazyQuery } from '@apollo/react-hooks';
import orderBy from 'lodash/orderBy';
import Link from 'next/link';
import Router from 'next/router';

import Submenu, { MenuItem } from 'uikit/SubMenu';
import { Input } from 'uikit/form';
import Icon from 'uikit/Icon';
import { css } from 'uikit';
import DnaLoader from 'uikit/DnaLoader';

import SIDE_MENU_PROGRAM_LIST from './SIDE_MENU_PROGRAM_LIST.gql';
import useAuthContext from 'global/hooks/useAuthContext';
import usePersistentState from 'global/hooks/usePersistentContext';
import { isDccMember, getAuthorizedProgramScopes, canWriteProgram } from 'global/utils/egoJwt';

import {
  PROGRAM_SHORT_NAME_PATH,
  PROGRAM_MANAGE_PATH,
  PROGRAM_DASHBOARD_PATH,
  PROGRAM_SAMPLE_REGISTRATION_PATH,
  PROGRAM_CLINICAL_SUBMISSION_PATH,
  PROGRAMS_LIST_PATH,
} from 'global/constants/pages';
import { styled } from 'uikit';
import usePageContext from 'global/hooks/usePageContext';

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

const useToggledSelectState = (initialIndex = -1) => {
  const [activeItem, setActiveItem] = React.useState(initialIndex);
  const toggleItem = itemIndex =>
    itemIndex === activeItem ? setActiveItem(-1) : setActiveItem(itemIndex);
  return [activeItem, toggleItem];
};

const LinksToProgram = (props: { program: SideMenuProgram; isCurrentlyViewed: boolean }) => {
  const pageContext = usePageContext();
  const { token } = useAuthContext() || {};
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
          content="Register Samples"
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
          content="Clinical Submission"
          selected={
            PROGRAM_CLINICAL_SUBMISSION_PATH === pageContext.pathname && props.isCurrentlyViewed
          }
        />
      </Link>
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
    .indexOf(pageContext.query.shortName);
  const [activeProgramIndex, toggleProgramIndex] = useToggledSelectState(
    currentViewingProgramIndex,
  );
  const { token } = useAuthContext() || {};

  return (
    <>
      <MenuItem
        level={1}
        selected
        content={
          <Input
            aria-label="programs_search"
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
  const [activeItem, toggleItem] = useToggledSelectState(isInProgramSection ? 1 : 0);
  const [programs, setPrograms] = usePersistentState('sideMenuPrograms');
  const [getPrograms, { data, loading, called }] = useLazyQuery(SIDE_MENU_PROGRAM_LIST, {
    onCompleted(data) {
      setPrograms(data.programs);
    },
  });

  if (!programs && !called) {
    getPrograms();
  }

  const { data: egoTokenData, token } = useAuthContext() || {};
  const isDcc = token ? isDccMember(token) : false;
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
          <div
            css={css`
              margin-top: 44px;
            `}
          >
            <MenuItem selected>
              <MenuItem
                key={programs[0].shortName}
                content={programs[0].shortName}
                selected
                noChevron
              >
                <LinksToProgram program={programs[0]} isCurrentlyViewed={true} />
              </MenuItem>
            </MenuItem>
          </div>
        )
      ) : (
        <>
          {canSeeDcc && <MenuItem icon={<Icon name="dashboard" />} content={'DCC Dashboard'} />}
          {canSeeRdpcs && (
            <MenuItem
              icon={<Icon name="rdpc" />}
              content={'RDPCs'}
              selected={activeItem === 0}
              onClick={() => toggleItem(0)}
            >
              <MenuItem content="what goes here?" />
            </MenuItem>
          )}
          <MenuItem
            icon={<Icon name="programs" />}
            content={'My Programs'}
            selected={activeItem === 1}
            onClick={() => toggleItem(1)}
          >
            {loading ? <Loader /> : <MultiProgramsSection programs={programs} />}
          </MenuItem>
        </>
      )}
    </Submenu>
  );
}
