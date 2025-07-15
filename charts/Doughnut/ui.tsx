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
import { Loader } from 'components/pages/discovery/charts/common';
import React, { useEffect, useState } from 'react';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

const margin = { top: 0, right: 0, bottom: 0, left: 0 };

const padAngle = 2;

export const DoughnutChart = ({ data, config }) => {
  const elementRef = React.useRef(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const beautifyLoading = async () => {
      // gives time for loader comp to show, better visual
      await delay(1800);
      setShowContent(true);
    };
    beautifyLoading();
  });

  return showContent ? (
    <div
      ref={elementRef}
      css={css({
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
      })}
    >
      <div css={css({ height: '100%', width: '70%', position: 'relative' })}>
        <ResponsivePie
          colors={{ datum: 'data.color' }}
          data={data.outer}
          isInteractive={true}
          margin={margin}
          innerRadius={0.75}
          activeOuterRadiusOffset={0}
          borderWidth={1}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]],
          }}
          enableArcLinkLabels={false}
          enableArcLabels={false}
          padAngle={padAngle}
          onMouseEnter={() => {
            if (elementRef.current) {
              elementRef.current.style.cursor = 'pointer';
            }
          }}
          onMouseLeave={() => {
            if (elementRef.current) {
              elementRef.current.style.cursor = 'auto';
            }
          }}
        />
        <div
          className="inner"
          css={css({
            opacity: 0.5,
            position: 'absolute',
            height: '60%',
            width: '60%',
            // set center to halfway across parent container
            top: '50%',
            left: '50%',
            // change origin to centered by moving it back half it's own width + height
            transform: 'translate(-50%,-50%)',
          })}
        >
          <ResponsivePie
            colors={{ datum: 'data.color' }}
            data={data.inner}
            isInteractive={true}
            innerRadius={0.75}
            activeOuterRadiusOffset={0}
            borderWidth={1}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.2]],
            }}
            enableArcLinkLabels={false}
            enableArcLabels={false}
            padAngle={padAngle}
            onMouseEnter={() => {
              if (elementRef.current) {
                elementRef.current.style.cursor = 'pointer';
              }
            }}
            onMouseLeave={() => {
              if (elementRef.current) {
                elementRef.current.style.cursor = 'auto';
              }
            }}
          />
        </div>
      </div>
      <Legend data={data.legend} />
    </div>
  ) : (
    <Loader />
  );
};

export default DoughnutChart;
