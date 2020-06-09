/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
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

import React from 'react';
import Checkbox from 'uikit/form/Checkbox';
import Typography from 'uikit/Typography';
import useTheme from 'uikit/utils/useTheme';
import { getTimelineStyles } from './util';
import { css } from 'uikit';
import { ENTITY_DISPLAY } from './index';
import { EntityType, Entity } from './types';

type HeaderTypes = {
  entities: Array<Entity>;
  activeEntities: Array<EntityType>;
  onFiltersChange: (e: Array<EntityType>) => void;
};

type Filters = Exclude<EntityType, 'deceased'>;
type EntityCounts = { [k in Filters]: number };

export default ({ entities, activeEntities, onFiltersChange }: HeaderTypes) => {
  const theme = useTheme();

  const timelineStyles = React.useMemo(() => getTimelineStyles(theme), [theme]);

  const entityCounts: EntityCounts = entities
    .filter(entity => entity.type !== EntityType.DECEASED)
    .reduce(
      (acc, entity) => {
        const { type } = entity;
        acc[type]++;
        return acc;
      },
      { primary_diagnosis: 0, specimen: 0, treatment: 0, follow_up: 0 },
    );

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        padding-bottom: 9px;
        margin-bottom: 15px;
      `}
    >
      <Typography variant="default">Clinical Timeline</Typography>
      <div
        css={css`
          display: flex;

          > div {
            margin-left: 18px;
          }

          div:first-child {
            margin-left: 6px;
          }

          ${css(theme.typography.data as any)};
        `}
      >
        Show:
        {(Object.keys(entityCounts) as Array<Filters>).map(entityKey => {
          const { checkboxColor } = timelineStyles[entityKey];
          const { title } = ENTITY_DISPLAY[entityKey];
          const count = entityCounts[entityKey];
          const isDisabled = count <= 0;

          const changeFilter = () =>
            !isDisabled &&
            onFiltersChange(
              activeEntities.includes(entityKey)
                ? activeEntities.filter(e => e !== entityKey)
                : [...activeEntities, entityKey],
            );

          return (
            <div
              css={css`
                margin-left: 3px;
                display: flex;
                &:hover {
                  cursor: pointer;
                }
              `}
              onClick={changeFilter}
            >
              <Checkbox
                value={title}
                checked={activeEntities.includes(entityKey)}
                onChange={changeFilter}
                aria-label={title}
                disabled={isDisabled}
                color={checkboxColor}
              />

              <label
                css={css`
                  margin-left: 8px;
                  &:hover {
                    cursor: pointer;
                  }
                `}
              >
                {`${count} ${title}`}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
