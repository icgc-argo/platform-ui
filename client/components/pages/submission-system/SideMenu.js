//@flow
import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { orderBy } from 'lodash';
import Link from 'next/link';

import Submenu, { MenuItem } from 'uikit/SubMenu';
import { Input } from 'uikit/form';
import Icon from 'uikit/Icon';
import { css } from 'uikit';
import DnaLoader from 'uikit/DnaLoader';

import { mockPrograms } from './mockData';

// $FlowFixMe .gql file not supported
import { sideMenuProgramList } from './queries.gql';
import useEgoToken from 'global/hooks/useEgoToken';
import { isDccMember, getAuthorizedProgramScopes, canWriteProgram } from 'global/utils/egoJwt';

import {
  PROGRAM_SHORT_NAME_PATH,
  PROGRAM_MANAGE_PATH,
  PROGRAM_DASHBOARD_PATH,
  PROGRAM_ID_REGISTRATION_PATH,
  PROGRAM_CLINICAL_SUBMISSION_PATH,
  PROGRAMS_LIST_PATH,
} from 'global/constants/pages';
import { styled } from 'uikit';

type SideMenuProgram = {
  shortName: string,
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

const LinksToProgram = (props: { program: SideMenuProgram }) => {
  const { token } = useEgoToken();
  return (
    <div>
      <Link
        prefetch
        as={PROGRAM_DASHBOARD_PATH.replace(PROGRAM_SHORT_NAME_PATH, props.program.shortName)}
        href={PROGRAM_DASHBOARD_PATH}
      >
        <a>
          <MenuItem level={3} content="Dashboard" />
        </a>
      </Link>
      <Link
        prefetch
        as={PROGRAM_ID_REGISTRATION_PATH.replace(PROGRAM_SHORT_NAME_PATH, props.program.shortName)}
        href={PROGRAM_ID_REGISTRATION_PATH}
      >
        <a>
          <MenuItem level={3} content="ID Registration" />
        </a>
      </Link>
      <Link
        prefetch
        as={PROGRAM_CLINICAL_SUBMISSION_PATH.replace(
          PROGRAM_SHORT_NAME_PATH,
          props.program.shortName,
        )}
        href={PROGRAM_CLINICAL_SUBMISSION_PATH}
      >
        <a>
          <MenuItem level={3} content="Clinical Submission" />
        </a>
      </Link>
      {token && canWriteProgram({ egoJwt: token, programId: props.program.shortName }) && (
        <Link
          prefetch
          as={PROGRAM_MANAGE_PATH.replace(PROGRAM_SHORT_NAME_PATH, props.program.shortName)}
          href={PROGRAM_MANAGE_PATH}
        >
          <a>
            <MenuItem level={3} content="Manage Program" />
          </a>
        </Link>
      )}
    </div>
  );
};

const MultiProgramsSection = ({ programs }: { programs: Array<SideMenuProgram> }) => {
  const [activeProgramIndex, toggleProgramIndex] = useToggledSelectState();
  const [programNameSearch, setProgramNameSearch] = React.useState('');
  const orderedPrograms = orderBy(programs, 'shortName');
  const filteredPrograms = orderedPrograms.filter(
    ({ shortName }) =>
      !programNameSearch.length || shortName.search(new RegExp(programNameSearch, 'i')) > -1,
  );
  const { token } = useEgoToken();
  return (
    <>
      <MenuItem
        level={1}
        selected
        content={
          <Input
            aria-label="programs_search"
            onChange={e => setProgramNameSearch(e.target.value)}
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
          <a>
            <MenuItem level={2} content={'All Programs'} />
          </a>
        </Link>
      )}
      {filteredPrograms.map((program, programIndex) => (
        <MenuItem
          key={program.shortName}
          content={program.shortName}
          onClick={() => toggleProgramIndex(programIndex)}
          selected={programIndex === activeProgramIndex}
        >
          <LinksToProgram program={program} />
        </MenuItem>
      ))}
    </>
  );
};

export default () => {
  const [activeItem, toggleItem] = useToggledSelectState(-1);
  const {
    data: { programs = [] } = {},
    loading,
  }: { data: { programs: Array<SideMenuProgram> }, loading: boolean } = useQuery(
    sideMenuProgramList,
  );

  const { data: egoTokenData, token } = useEgoToken();
  const isDcc = token ? isDccMember(token) : false;
  const accessibleProgramScopes = token ? getAuthorizedProgramScopes(token) : [];

  const canOnlyAccessOneProgram = programs.length === 1 && !isDcc;
  const canSeeRdpcs = isDcc;
  const canSeeDcc = isDcc;

  return (
    <Submenu
      css={css`
        & a {
          text-decoration: none;
        }
      `}
    >
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
                <LinksToProgram program={programs[0]} />
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
};
