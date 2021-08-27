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

import React, { RefObject, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import debounce from 'lodash/debounce';

import Button from 'uikit/Button';
import Icon from 'uikit/Icon';
import { UikitIconNames } from 'uikit/Icon/icons';
import { Input } from 'uikit/form';
import Tag from 'uikit/Tag';
import Tooltip from 'uikit/Tooltip';
import useTheme from 'uikit/utils/useTheme';

const FILL_COLOUR = '#0774D3';

export type FilterOption = {
  key: string;
  value: string;
  doc_count?: number;
  isChecked?: boolean;
};

export const DropdownPanelWrapper = styled('div')`
  position: absolute;
  border-radius: 8px;
  box-shadow: 0 3px 8px 0 rgb(0 0 0 / 10%), 0 3px 8px 0 rgb(0 0 0 / 10%);
  background: white;
  overflow: hidden;
  width: 216px;
  z-index: 100;
  top: 30px;
  left: 0;
  cursor: default;

  legend {
    cursor: text;
  }
`;

export const ForwardedDropdownWrapper = React.forwardRef<HTMLElement, any>((props, ref) => (
  <DropdownPanelWrapper ref={ref} {...props} />
));

export const DropdownPanelFieldset = styled('fieldset')`
  border: none;
  margin: 0;
  padding: 0;
`;

export const DropdownPanelLegend = styled('div')`
  font-family: 'Work Sans', sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  padding: 2px 8px;
`;

export const DropdownPanelInputSection = styled('div')`
  padding: 16px 6px;
  border-top: 1px solid #dcdde1;
  border-bottom: 1px solid #dcdde1;
`;

export const DropdownPanelListInputSection = styled(DropdownPanelInputSection)`
  padding: 4px 8px;
`;

export const DropdownPanelInput = styled(Input)`
  border-radius: 10px;
`;

export const DropdownPanelTextButton = styled(Button)`
  padding: 0;
  margin: 0;
  font-size: 10px;
  text-transform: none;
  font-weight: normal;
  text-decoration: underline;
  line-height: 1.6;
  margin-right: 12px;
  border-radius: unset;

  &:hover {
    background: transparent;
    border: 1px solid transparent;
  }
`;

export const DropdownPanelList = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 0;
  font-weight: normal;
  max-height: 80px;
  overflow: auto;
`;

export const DropdownPanelListItemLabel = styled('label')`
  display: flex;
  align-items: center;
  padding: 2px 0;
`;

export const ForwardedDropdownInput = React.forwardRef<HTMLInputElement, any>((props, ref) => (
  <DropdownPanelInput ref={ref} {...props} />
));

export const DropdownPanelButtonSection = styled('div')`
  display: flex;
  padding: 4px 8px;
  justify-content: space-between;
`;

export const FilterWrapper = ({
  panelLegend = 'Filter',
  cancelLabel = 'Cancel',
  confirmLabel = 'Apply',
  onCancelClick = () => {},
  onConfirmClick = () => {},
  confirmDisabled = false,
  handleBlur,
  children,
}: {
  panelLegend?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancelClick?: (event?: any) => void;
  onConfirmClick?: (event?: any) => void;
  confirmDisabled?: boolean;
  handleBlur?: (event?: any) => void;
  children: React.ReactNode;
}) => {
  return (
    <form>
      <DropdownPanelFieldset>
        <DropdownPanelLegend>
          <legend>{panelLegend}</legend>
        </DropdownPanelLegend>
        {children}
        <DropdownPanelButtonSection>
          <Button
            variant="text"
            size="sm"
            onClick={onCancelClick}
            onBlur={handleBlur}
            type="button"
          >
            {cancelLabel}
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={confirmDisabled}
            onClick={onConfirmClick}
            onBlur={handleBlur}
            type="submit"
          >
            {confirmLabel}
          </Button>
        </DropdownPanelButtonSection>
      </DropdownPanelFieldset>
    </form>
  );
};

export const TextInputFilter = ({
  cancelLabel = 'Cancel',
  confirmLabel = 'Apply',
  inputLabel = 'Filter',
  inputPlaceholder = 'Filter...',
  onCancelClick = () => {},
  onConfirmClick = () => {},
  onInputChange = () => {},
  panelLegend = 'Filter',
  inputRef,
  setOpen,
  handleBlur,
  initialValue,
}: {
  cancelLabel?: string;
  confirmLabel?: string;
  inputLabel?: string;
  inputPlaceholder?: string;
  onCancelClick?: (event?: any) => void;
  onConfirmClick?: (event?: any) => void;
  onInputChange?: (event?: any) => void;
  panelLegend?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  setOpen?: (open: boolean) => void;
  handleBlur?: (event?: any) => void;
  initialValue?: string;
}) => {
  const [text, setText] = useState(initialValue);
  const _inputRef = inputRef || useRef<HTMLInputElement>(null);

  useEffect(() => {
    text === initialValue || setText(initialValue);
  }, [initialValue]);

  return (
    <FilterWrapper
      panelLegend={panelLegend}
      cancelLabel={cancelLabel}
      confirmLabel={confirmLabel}
      onCancelClick={(e) => {
        e.preventDefault();
        setOpen(false);
        onCancelClick();
      }}
      onConfirmClick={(e) => {
        e.preventDefault();
        onConfirmClick(text?.trim());
      }}
      confirmDisabled={!text.length && !initialValue?.length}
      handleBlur={handleBlur}
    >
      <DropdownPanelInputSection>
        <ForwardedDropdownInput
          aria-label={inputLabel}
          icon={<Icon name="search" />}
          placeholder={inputPlaceholder}
          size="sm"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            onInputChange(e.target.value);
          }}
          ref={_inputRef}
          showClear={true}
        />
      </DropdownPanelInputSection>
    </FilterWrapper>
  );
};

let listFilterInstances = 0;

export const ListFilter = ({
  cancelLabel = 'Cancel',
  confirmLabel = 'Apply',
  onCancelClick = () => {},
  onConfirmClick = () => {},
  panelLegend = 'Filter',
  open,
  setOpen,
  handleBlur,
  filterOptions = [],
  onOptionToggle = () => {},
  onSelectAllOptions = () => {},
  onClear = () => {},
}: {
  cancelLabel?: string;
  confirmLabel?: string;
  onCancelClick?: (event?: any) => void;
  onConfirmClick?: (event?: any) => void;
  panelLegend?: string;
  open?: boolean;
  setOpen?: (open?: boolean | any) => void;
  handleBlur?: (event?: any) => void;
  filterOptions?: Array<FilterOption>;
  onOptionToggle?: (event?: any) => void;
  onSelectAllOptions?: (event?: any) => void;
  onClear?: (event?: any) => void;
}) => {
  const theme = useTheme();
  const [options, setOptions] = useState(filterOptions);
  const [instanceNum, setInstanceNum] = useState(0);
  const renderRef = useRef(null);
  const refs = Array.from({ length: options?.length }).map(() => useRef<HTMLInputElement>(null));

  const toggle = (index: number) => {
    setOptions([
      ...options.slice(0, index),
      ...[{ ...options[index], isChecked: !options[index].isChecked }],
      ...options.slice(index + 1),
    ]);

    onOptionToggle(index);
  };

  const selectAll = () => {
    setOptions(options.map((option) => ({ ...option, isChecked: true })));
    onSelectAllOptions();
  };

  const clear = () => {
    setOptions(options.map((option) => ({ ...option, isChecked: false })));
    onClear();
  };

  const focusNext = (i) => {
    refs[(i + 1) % options.length]?.current?.focus();
  };

  const focusPrev = (i) => {
    refs[(i - 1 + options.length) % options.length]?.current?.focus();
  };

  const focusFirst = () => {
    refs[0]?.current?.focus();
  };

  const focusLast = () => {
    refs[options.length - 1]?.current?.focus();
  };

  const handleKeyPress = (e, i) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        focusNext(i);
        break;
      case 'ArrowUp':
        e.preventDefault();
        focusPrev(i);
        break;
      case 'Home':
        e.preventDefault();
        focusFirst();
        break;
      case 'End':
        e.preventDefault();
        focusLast();
        break;
      default:
        break;
    }
  };

  // Use instance number to ensure IDs stay unique for multiple dropdowns on a page
  useEffect(() => {
    listFilterInstances += 1;
    setInstanceNum(listFilterInstances);

    return () => {
      listFilterInstances -= 1;
    };
  }, []);

  // Focus on the first checkbox when opening the panel
  useEffect(() => {
    if (renderRef && !renderRef.current && open && refs[0]?.current) {
      focusFirst();
      renderRef.current = true;
    }
  }, [renderRef, open, refs]);

  return (
    <FilterWrapper
      panelLegend={panelLegend}
      cancelLabel={cancelLabel}
      confirmLabel={confirmLabel}
      onCancelClick={(e) => {
        e.preventDefault();
        setOpen(false);
        onCancelClick();
      }}
      onConfirmClick={(e) => {
        e.preventDefault();
        onConfirmClick(options.filter((option) => option.isChecked === true));
      }}
      handleBlur={handleBlur}
    >
      <DropdownPanelListInputSection>
        <div
          css={css`
            display: flex;
          `}
        >
          <DropdownPanelTextButton
            size="sm"
            variant="text"
            onClick={(e) => {
              e.preventDefault();
              selectAll();
            }}
            type="button"
          >
            Select All
          </DropdownPanelTextButton>
          <DropdownPanelTextButton
            size="sm"
            variant="text"
            onClick={(e) => {
              e.preventDefault();
              clear();
            }}
            type="button"
          >
            Clear
          </DropdownPanelTextButton>
        </div>
        {options.length && (
          <DropdownPanelList>
            {options.map((option, index) => (
              <li key={`filter-dropdown-${instanceNum}-option-${index}`}>
                <div>
                  <DropdownPanelListItemLabel
                    htmlFor={`filter-dropdown-${instanceNum}-option-${index}`}
                    css={css`
                      cursor: pointer;
                      &:hover {
                        background: ${theme.colors.grey_3};
                      }
                    `}
                  >
                    <input
                      ref={refs[index]}
                      checked={option.isChecked}
                      onChange={() => toggle(index)}
                      type="checkbox"
                      name={`filter-dropdown-${instanceNum}-option-${index}`}
                      id={`filter-dropdown-${instanceNum}-option-${index}`}
                      onKeyDown={(e) => handleKeyPress(e, index)}
                      onBlur={index === options.length - 1 ? handleBlur : undefined}
                      css={css`
                        margin-right: 5px;
                        cursor: pointer;
                      `}
                    />
                    {option.value}
                    {option.doc_count && (
                      <Tag
                        variant={option.isChecked ? 'HIGHLIGHT' : 'NEUTRAL'}
                        css={css`
                          height: 18px;
                          font-size: 10px;
                          align-self: center;
                          white-space: nowrap;
                          margin-left: auto;
                          margin-right: 4px;
                        `}
                      >
                        {option.doc_count}
                      </Tag>
                    )}
                  </DropdownPanelListItemLabel>
                </div>
              </li>
            ))}
          </DropdownPanelList>
        )}
      </DropdownPanelListInputSection>
    </FilterWrapper>
  );
};

const DropdownPanel = ({
  customTrigger = undefined,
  inputLabel = 'Filter',
  triggerIcon = 'filter',
  triggerTooltip = 'Filter',
  open,
  setOpen,
  focusFirst,
  buttonRef,
  panelRef,
  handleEsc,
  handleBlur,
  handleClickOutside,
  children,
  active,
}: {
  customTrigger?: any;
  inputLabel?: string;
  triggerIcon?: UikitIconNames;
  triggerTooltip?: string;
  open?: boolean;
  setOpen?: (open?: boolean | any) => void;
  focusFirst?: () => void;
  buttonRef?: React.Ref<HTMLInputElement>;
  panelRef?: React.Ref<HTMLElement>;
  handleEsc?: (event?: any) => void;
  handleBlur?: (event?: any) => void;
  handleClickOutside?: (event?: any) => void;
  children?: any;
  active?: boolean;
}) => {
  const [_open, _setOpen] =
    typeof open === 'boolean' && setOpen ? [open, setOpen] : useState(false);
  // Debouncing setOpen to prevent double-triggering when closing the panel
  const debouncedSetOpen = debounce(_setOpen, 100);
  const [triggerHovered, setTriggerHovered] = useState(false);
  const _buttonRef = (buttonRef || useRef<HTMLInputElement>(null)) as RefObject<HTMLInputElement>;
  const _panelRef = (panelRef || useRef<HTMLElement>(null)) as RefObject<HTMLElement>;

  // Close dropdown panel when the 'escape' key is pressed
  const _handleEsc =
    handleEsc ||
    ((e: React.KeyboardEvent) => {
      if (_open && e.key === 'Escape') {
        debouncedSetOpen(false);
        if (_buttonRef && _buttonRef.current) {
          _buttonRef.current.focus();
        }
      }
    });

  // Close dropdown panel when tabbing outside of it
  const _handleBlur =
    handleBlur ||
    ((e: React.FocusEvent) => {
      const nextTarget = e.relatedTarget as Node;

      if (_open && !_panelRef?.current?.contains(nextTarget)) {
        debouncedSetOpen(false);
      }
    });

  // Close dropdown panel when clicking outside of it
  // (don't close here if clicking on the button, let the button's onClick handle that)
  const _handleClickOutside =
    handleClickOutside ||
    ((e: React.MouseEvent) => {
      const clickTarget = e.target as Node;

      if (
        _open &&
        !_panelRef?.current?.contains(clickTarget) &&
        clickTarget !== _buttonRef.current
      ) {
        e.stopPropagation();
        debouncedSetOpen(false);
      }
    });

  useEffect(() => {
    if (_open) {
      window.addEventListener('mousedown', _handleClickOutside);
      window.addEventListener('keydown', _handleEsc);
      if (focusFirst && typeof focusFirst === 'function') {
        focusFirst();
      }
    }

    return () => {
      window.removeEventListener('mousedown', _handleClickOutside);
      window.removeEventListener('keydown', _handleEsc);
    };
  }, [_open]);

  return (
    <>
      <button
        css={css`
          border: none;
          background: transparent;
          margin: 0;
          padding: 2px;
          cursor: pointer;
          z-index: 10;
        `}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          debouncedSetOpen(!_open);
        }}
        ref={_buttonRef}
        onFocus={() => setTriggerHovered(true)}
        onBlur={(e) => {
          setTriggerHovered(false);
          _handleBlur(e);
        }}
        aria-label={_open ? `Close ${inputLabel} panel` : `Open ${inputLabel} panel`}
        aria-haspopup="true"
        aria-expanded={_open}
        onMouseOver={() => setTriggerHovered(true)}
        onMouseOut={() => setTriggerHovered(false)}
      >
        {!customTrigger ? (
          <Tooltip
            open={triggerHovered}
            hideOnClick={false}
            html={<span>{triggerTooltip}</span>}
            arrow={false}
          >
            <Icon
              name={triggerIcon}
              fill={_open || active ? FILL_COLOUR : triggerHovered ? FILL_COLOUR : 'grey_1'}
            />
          </Tooltip>
        ) : (
          customTrigger
        )}
      </button>
      {_open && (
        <ForwardedDropdownWrapper
          onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
          ref={_panelRef}
        >
          {children}
        </ForwardedDropdownWrapper>
      )}
    </>
  );
};

export default DropdownPanel;
