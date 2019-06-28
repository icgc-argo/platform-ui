//@flow
import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { orderBy } from 'lodash';

import Submenu, { MenuItem } from 'uikit/SubMenu';
import { Input } from 'uikit/form';
import Icon from 'uikit/Icon';
import { css } from 'uikit';
import DnaLoader from 'uikit/DnaLoader';

import { mockPrograms } from './mockData';

// $FlowFixMe .gql file not supported
import { programsListQuery } from './programs/queries.gql';

const useToggledSelectState = (initialIndex = -1) => {
  const [activeItem, setActiveItem] = React.useState(initialIndex);
  const toggleItem = itemIndex =>
    itemIndex === activeItem ? setActiveItem(-1) : setActiveItem(itemIndex);
  return [activeItem, toggleItem];
};

const ProgramsSection = ({ initialProgram }) => {
  const { data = {}, loading } = useQuery(programsListQuery);
  const { programs = [] } = data;
  const [activeProgramIndex, toggleProgramIndex] = useToggledSelectState();
  const [programNameSearch, setProgramNameSearch] = React.useState('');
  const orderedPrograms = orderBy(programs, 'shortName');
  const filteredPrograms = orderedPrograms.filter(
    ({ shortName }) =>
      !programNameSearch.length || shortName.search(new RegExp(programNameSearch, 'i')) > -1,
  );
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
      {loading ? (
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
      ) : (
        filteredPrograms.map((program, programIndex) => {
          return (
            <MenuItem
              key={program.shortName}
              content={program.shortName}
              onClick={() => toggleProgramIndex(programIndex)}
              selected={programIndex === activeProgramIndex}
            >
              <MenuItem content="Dashboard" />
              <MenuItem content="ID Registration" />
              <MenuItem content="Clinical Submission" />
              <MenuItem content="Genomic Submission" />
              <MenuItem content="Manage Token" />
            </MenuItem>
          );
        })
      )}
    </>
  );
};

export default ({ initialShownItem = -1 }: { initialShownItem: number }) => {
  const [activeItem, toggleItem] = useToggledSelectState(initialShownItem);
  return (
    <Submenu>
      <MenuItem icon={<Icon name="dashboard" />} content={'DCC Dashboard'} />
      <MenuItem
        icon={<Icon name="rdpc" />}
        content={'RDPCs'}
        selected={activeItem === 0}
        onClick={() => toggleItem(0)}
      >
        <MenuItem content="what goes here?" />
      </MenuItem>
      <MenuItem
        icon={<Icon name="programs" />}
        content={'Programs'}
        selected={activeItem === 1}
        onClick={() => toggleItem(1)}
      >
        <ProgramsSection initialProgram={''} />
      </MenuItem>
    </Submenu>
  );
};
