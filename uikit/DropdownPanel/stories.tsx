/*
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
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

import React, { useRef, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs';

import DropdownPanel, { TextInputFilter, ListFilter, FilterOption } from '.';
import icons, { UikitIconNames } from 'uikit/Icon/icons';

const DropdownPanelStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => {
    const [open, setOpen] = useState(false);

    const knobs = {
      customTrigger: text('customTrigger', ''),
      triggerIcon: select('triggerIcon', Object.keys(icons) as UikitIconNames[], 'filter'),
      triggerTooltip: text('triggerTooltip', 'Basic Dropdown Panel'),
      active: boolean('active', false),
    };

    return (
      <DropdownPanel open={open} setOpen={setOpen} {...knobs}>
        <p>Content goes here!</p>
      </DropdownPanel>
    );
  })
  .add('With Text Input Filter', () => {
    const [filterText, setFilterText] = useState('');
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const panelRef = useRef<HTMLElement>(null);

    // Focus on the input when the panel opens
    const focusInput = () => {
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
      }
    };

    // Close dropdown panel when tabbing out of it
    const handleBlur = (e) => {
      const nextTarget = e.relatedTarget as Node;

      if (open && !panelRef?.current?.contains(nextTarget)) {
        setOpen(false);
      }
    };

    const onFilter = (text: string) => setFilterText(text);

    const knobs = {
      customTrigger: text('customTrigger', ''),
      inputLabel: text('inputLabel', 'Text Input Filter'),
      inputPlaceholder: text('inputPlaceholder', 'Search...'),
      panelLegend: text('panelLegend', 'Text Input Filter Panel'),
      triggerIcon: select('triggerIcon', Object.keys(icons) as UikitIconNames[], 'filter'),
      triggerTooltip: text('triggerTooltip', 'Text Filter Panel'),
    };

    return (
      <DropdownPanel
        buttonRef={buttonRef}
        panelRef={panelRef}
        focusFirst={focusInput}
        handleBlur={handleBlur}
        open={open}
        setOpen={setOpen}
        active={filterText?.length > 0}
        customTrigger={knobs.customTrigger}
        triggerIcon={knobs.triggerIcon}
        triggerTooltip={knobs.triggerTooltip}
      >
        <TextInputFilter
          onConfirmClick={onFilter}
          inputLabel={knobs.inputLabel}
          inputPlaceholder={knobs.inputPlaceholder}
          panelLegend={knobs.panelLegend}
          inputRef={inputRef}
          setOpen={setOpen}
          handleBlur={handleBlur}
          initialValue={filterText}
        />
      </DropdownPanel>
    );
  })
  .add('With List Filter', () => {
    const filterOptions = [
      {
        key: 'COMPLETE',
        value: 'Complete',
      },
      {
        key: 'INCOMPLETE',
        value: 'Incomplete',
      },
      {
        key: 'NO_DATA',
        value: 'No Data Submitted',
      },
    ];
    const [activeFilters, setActiveFilters] = useState([]);
    const options = React.useMemo(
      () =>
        filterOptions.map((option) => ({
          ...option,
          isChecked: activeFilters?.indexOf(option.key) > -1 ? true : false,
        })),
      [filterOptions, activeFilters],
    );
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLInputElement>(null);
    const panelRef = useRef<HTMLElement>(null);

    // Close dropdown panel when tabbing out of it
    const handleBlur = (e) => {
      const nextTarget = e.relatedTarget as Node;

      if (open && !panelRef?.current?.contains(nextTarget)) {
        setOpen(false);
      }
    };

    const onFilter = (options: Array<FilterOption>) =>
      setActiveFilters(options.filter((option) => option.isChecked).map((option) => option.key));

    const knobs = {
      customTrigger: text('customTrigger', ''),
      inputLabel: text('inputLabel', 'List Filter'),
      panelLegend: text('panelLegend', 'List Filter Panel'),
      triggerIcon: select('triggerIcon', Object.keys(icons) as UikitIconNames[], 'filter'),
      triggerTooltip: text('triggerTooltip', 'List Filter Panel'),
    };

    return (
      <DropdownPanel
        buttonRef={buttonRef}
        panelRef={panelRef}
        handleBlur={handleBlur}
        open={open}
        setOpen={setOpen}
        active={activeFilters?.length > 0}
        customTrigger={knobs.customTrigger}
        triggerIcon={knobs.triggerIcon}
        triggerTooltip={knobs.triggerTooltip}
      >
        <ListFilter
          filterOptions={options}
          onConfirmClick={onFilter}
          panelLegend={knobs.panelLegend}
          open={open}
          setOpen={setOpen}
          handleBlur={handleBlur}
        />
      </DropdownPanel>
    );
  });

export default DropdownPanelStories;
