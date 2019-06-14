import React from 'react';

import Submenu, { MenuItem } from 'uikit/SubMenu';
import { Input } from 'uikit/form';
import Icon from 'uikit/Icon';
import { css } from 'uikit';

import { mockPrograms } from './mockData';

const useToggledSelectState = (initialIndex = -1) => {
  const [activeItem, setActiveItem] = React.useState(initialIndex);
  const toggleItem = itemIndex =>
    itemIndex === activeItem ? setActiveItem(-1) : setActiveItem(itemIndex);
  return [activeItem, toggleItem];
};

const ProgramsSection = ({ initialProgram, programs }) => {
  const [activeProgramIndex, toggleProgramIndex] = useToggledSelectState();
  const [programNameSearch, setProgramNameSearch] = React.useState('');
  const filteredPrograms = programs.filter(
    ({ shortName }) =>
      !programNameSearch.length || programNameSearch.search(new RegExp(shortName, 'i')) > -1,
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
      {filteredPrograms.map((program, programIndex) => {
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
      })}
    </>
  );
};

export default ({ programs = mockPrograms, initialShownItem = -1 }) => {
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
        <ProgramsSection initialProgram={''} programs={programs} />
      </MenuItem>
    </Submenu>
  );
};
