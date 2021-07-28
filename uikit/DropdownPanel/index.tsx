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

import Button from 'uikit/Button';
import Icon from 'uikit/Icon';
import { UikitIconNames } from 'uikit/Icon/icons';
import { Input } from 'uikit/form';
import Tooltip from 'uikit/Tooltip';

const FILL_COLOUR = '#0774D3';

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

export const DropdownPanelInput = styled(Input)`
  border-radius: 10px;
`;

export const ForwardedDropdownInput = React.forwardRef<HTMLInputElement, any>((props, ref) => (
  <DropdownPanelInput ref={ref} {...props} />
));

export const DropdownPanelButtonSection = styled('div')`
  display: flex;
  padding: 4px 8px;
  justify-content: space-between;
`;

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
  onCancelClick?: (any?) => void;
  onConfirmClick?: (any?) => void;
  onInputChange?: (any?) => void;
  panelLegend?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  setOpen?: (boolean) => void;
  handleBlur?: (any?) => void;
  initialValue?: string;
}) => {
  const [text, setText] = useState(initialValue);
  const _inputRef = inputRef || useRef<HTMLInputElement>(null);

  useEffect(() => {
    setText(initialValue);
  }, [initialValue]);

  return (
    <form>
      <DropdownPanelFieldset>
        <DropdownPanelLegend>
          <legend>{panelLegend}</legend>
        </DropdownPanelLegend>
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
        <DropdownPanelButtonSection>
          <Button
            variant="text"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              onCancelClick();
            }}
            onBlur={handleBlur}
            type="button"
          >
            {cancelLabel}
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={!text.length}
            onClick={(e) => {
              e.preventDefault();
              onConfirmClick(text.trim());
            }}
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
}: {
  customTrigger?: any;
  inputLabel?: string;
  triggerIcon?: UikitIconNames;
  triggerTooltip?: string;
  open?: boolean;
  setOpen?: (boolean?) => void;
  focusFirst?: () => void;
  buttonRef?: React.Ref<HTMLInputElement>;
  panelRef?: React.Ref<HTMLElement>;
  handleEsc?: (any?) => void;
  handleBlur?: (any?) => void;
  handleClickOutside?: (any?) => void;
  children?: any;
}) => {
  const [_open, _setOpen] =
    typeof open === 'boolean' && setOpen ? [open, setOpen] : useState(false);
  const [triggerHovered, setTriggerHovered] = useState(false);
  const _buttonRef = (buttonRef || useRef<HTMLInputElement>(null)) as RefObject<HTMLInputElement>;
  const _panelRef = (panelRef || useRef<HTMLElement>(null)) as RefObject<HTMLElement>;

  // Close dropdown panel when the 'escape' key is pressed
  const _handleEsc =
    handleEsc ||
    ((e: React.KeyboardEvent) => {
      if (_open && e.key === 'Escape') {
        _setOpen(false);
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
        _setOpen(false);
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
        _setOpen(false);
      }
    });

  useEffect(() => {
    if (_open) {
      window.addEventListener('click', _handleClickOutside);
      window.addEventListener('keydown', _handleEsc);
      if (focusFirst && typeof focusFirst === 'function') {
        focusFirst();
      }
    }

    return () => {
      window.removeEventListener('click', _handleClickOutside);
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
          padding: 0;
          cursor: pointer;
        `}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          _setOpen((_open) => !_open);
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
              fill={_open ? FILL_COLOUR : triggerHovered ? FILL_COLOUR : 'grey_1'}
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
