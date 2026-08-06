/*
 * Copyright (c) 2026 The Ontario Institute for Cancer Research. All rights reserved
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

import { Button, css, Icon, styled, useTheme } from '@icgc-argo/uikit';
import { DropdownButtonMenuItem } from '@icgc-argo/uikit/DropdownButton';
import {
  instructionBoxButtonContentStyle,
  instructionBoxButtonIconStyle,
} from 'components/pages/submission-system/common';
import { getConfig } from 'global/config';
import { useEffect, useRef, useState } from 'react';
import useFiltersContext from '../../file-repository/hooks/useFiltersContext';
import LocalNodeDownloadModal from '../LocalNodeDownload/LocalNodeDownloadModal';

export type DiscoveryNode = {
  nodeId: string;
  name: string;
  uiUrl?: string;
};

const { NETWORK_SEARCH_LOCAL_NODE_ID } = getConfig();

const MenuSectionHeader = styled(DropdownButtonMenuItem)`
  padding: 5px;
  color: #4f546d;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: default;
  &:hover {
    background: unset;
  }
`;

const MenuOption = styled(DropdownButtonMenuItem)`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  cursor: pointer;
`;

const ExternalMenuOption = styled('a')`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  cursor: pointer;
  padding: 5px;
  color: inherit;
  text-decoration: none;
  font-family: Work Sans, sans-serif;
  &:hover {
    background: ${({ theme }) => theme.colors.secondary_4};
  }
`;

const ExternalLinkIcon = (): React.ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    css={css({ flexShrink: 0 })}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

type FederatedDownloadMenuProps = {
  localNode: DiscoveryNode | undefined;
  externalNodes: DiscoveryNode[];
  nodesLoading: boolean;
};

const FederatedDownloadMenu = ({
  localNode,
  externalNodes,
  nodesLoading,
}: FederatedDownloadMenuProps): React.ReactElement => {
  const theme = useTheme();
  const { filters } = useFiltersContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      css={css({
        position: 'relative',
        flexShrink: 0,
        marginRight: '10px',
      })}
    >
      <Button
        variant="secondary"
        size="sm"
        disabled={nodesLoading}
        onClick={() => setIsOpen((open) => !open)}
        css={css`
          width: 160px;
        `}
      >
        <span css={instructionBoxButtonContentStyle}>
          <Icon
            name="download"
            fill="accent2_dark"
            height="12px"
            css={instructionBoxButtonIconStyle}
          />
          DOWNLOAD
          <Icon
            name="chevron_down"
            fill="accent2_dark"
            height="9px"
            css={css`
              ${instructionBoxButtonIconStyle}
              margin-left: 5px;
              margin-right: 0px;
            `}
          />
        </span>
      </Button>

      {isOpen && (
        <div
          css={css({
            position: 'absolute',
            top: '100%',
            right: 0,
            zIndex: 1000,
            minWidth: '180px',
            borderRadius: '4px',
            boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.08)',
            border: `solid 1px ${theme.colors.grey_1}`,
            backgroundColor: theme.colors.white,
            textTransform: 'none',
            textAlign: 'left',
            color: theme.colors.black,
          })}
        >
          {localNode !== undefined && (
            <>
              <MenuSectionHeader>Current Node</MenuSectionHeader>
              <MenuOption
                onClick={() => {
                  setIsOpen(false);
                  setIsModalOpen(true);
                }}
              >
                {localNode.name}
              </MenuOption>
            </>
          )}

          {externalNodes.length > 0 && (
            <>
              <MenuSectionHeader>External Nodes</MenuSectionHeader>
              {externalNodes.map((node) => {
                const href = `${node.uiUrl}/discovery/download?filters=${JSON.stringify(filters)}&originNode=${NETWORK_SEARCH_LOCAL_NODE_ID}`;
                return (
                  <ExternalMenuOption
                    key={node.nodeId}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                  >
                    {node.name}
                    <ExternalLinkIcon />
                  </ExternalMenuOption>
                );
              })}
            </>
          )}
        </div>
      )}

      {isModalOpen && localNode !== undefined && (
        <LocalNodeDownloadModal nodeName={localNode.name} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default FederatedDownloadMenu;
