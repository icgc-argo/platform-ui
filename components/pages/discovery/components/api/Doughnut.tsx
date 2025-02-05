/*
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 * If not, see <http://www.gnu.org/licenses/>.
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

import { css } from '@emotion/react';
import { ResponsivePie } from '@nivo/pie';
import { Chart } from './Chart';

const data = [
  {
    id: 'css',
    label: 'css',
    value: 578,
    color: 'hsl(18, 70%, 50%)',
  },
  {
    id: 'stylus',
    label: 'stylus',
    value: 585,
    color: 'hsl(256, 70%, 50%)',
  },
  {
    id: 'elixir',
    label: 'elixir',
    value: 472,
    color: 'hsl(112, 70%, 50%)',
  },
  {
    id: 'php',
    label: 'php',
    value: 555,
    color: 'hsl(135, 70%, 50%)',
  },
  {
    id: 'javascript',
    label: 'javascript',
    value: 237,
    color: 'hsl(240, 70%, 50%)',
  },
];

const Legend = ({ data }: { data: { label: string; color: string }[] }) => {
  return (
    <div
      css={css({
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        columnGap: '8px',
        '> div': { marginTop: '16px' },
      })}
    >
      {data.map((legend) => {
        return (
          <div css={css({ display: 'flex', flexDirection: 'row', alignItems: 'center' })}>
            <div
              css={css({
                width: '12px',
                height: '12px',
                backgroundColor: legend.color,
                marginRight: '8px',
              })}
            />
            <span css={css({ fontSize: '10px', fontWeight: 400 })}>{legend.label}</span>
          </div>
        );
      })}
    </div>
  );
};

// marginTop
// marginLeft
const margin = { top: 0, right: 0, bottom: 0, left: 0 };
const MyResponsivePie = () => {
  return (
    <Chart>
      <div
        css={css({
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '100%',
        })}
      >
        <div className="s" css={css({ height: '100%', width: '70%', position: 'relative' })}>
          <ResponsivePie
            data={data}
            isInteractive={false}
            margin={margin}
            innerRadius={0.75}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.2]],
            }}
            enableArcLinkLabels={false}
            enableArcLabels={false}
          />
          <div
            className="inner"
            css={css({
              position: 'absolute',
              //background: 'blue',
              height: '60%',
              width: '60%',
              top: '50%',
              // set center to halfway across parent container
              left: '50%', //'179px',
              // change origin to centered by moving it back half it's own width + height
              transform: 'translate(-50%,-50%)',
            })}
          >
            <ResponsivePie
              data={data}
              isInteractive={false}
              innerRadius={0.75}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{
                from: 'color',
                modifiers: [['darker', 0.2]],
              }}
              enableArcLinkLabels={false}
              enableArcLabels={false}
            />
          </div>
        </div>
        <Legend data={data} />
      </div>
    </Chart>
  );
};

export default MyResponsivePie;
