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
import { select, text } from '@storybook/addon-knobs';

import DropdownPanel, {
  DropdownPanelFieldset,
  DropdownPanelLegend,
  DropdownPanelInputSection,
  ForwardedDropdownInput as DropdownPanelInput,
  DropdownPanelButtonSection,
} from '.';
import Icon from 'uikit/Icon';
import icons, { UikitIconNames } from 'uikit/Icon/icons';
import Button from 'uikit/Button';

const DropdownPanelStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
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

  const knobs = {
    customTrigger: text('customTrigger', ''),
    inputLabel: text('inputLabel', 'Filter'),
    triggerIcon: select('triggerIcon', Object.keys(icons) as UikitIconNames[], 'filter'),
    triggerTooltip: text('triggerTooltip', 'Filter'),
  };

  return (
    <DropdownPanel
      buttonRef={buttonRef}
      panelRef={panelRef}
      focusFirst={focusInput}
      handleBlur={handleBlur}
      open={open}
      setOpen={setOpen}
      {...knobs}
    >
      <form>
        <DropdownPanelFieldset>
          <DropdownPanelLegend>{knobs.inputLabel}</DropdownPanelLegend>
          <DropdownPanelInputSection>
            <DropdownPanelInput
              aria-label="Filter"
              icon={<Icon name="search" />}
              placeholder="Search IDs..."
              size="sm"
              value={filterText}
              onChange={(e) => {
                setFilterText(e.target.value);
              }}
              ref={inputRef}
            />
          </DropdownPanelInputSection>
          <DropdownPanelButtonSection>
            <Button
              variant="text"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
              onBlur={handleBlur}
              type="button"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              disabled={!filterText.length}
              onClick={(e) => {
                e.preventDefault();
              }}
              onBlur={handleBlur}
              type="submit"
            >
              Apply
            </Button>
          </DropdownPanelButtonSection>
        </DropdownPanelFieldset>
      </form>
    </DropdownPanel>
  );
});

export default DropdownPanelStories;
