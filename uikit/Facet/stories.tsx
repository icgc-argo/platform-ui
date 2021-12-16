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

import { storiesOf } from '@storybook/react';
import React from 'react';
import Facet from '.';
import { FilterOption } from '../OptionsList';
import { text } from '@storybook/addon-knobs';

const FacetStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const knobs = {
    countUnit: text('count unit description label', 'files'),
  };

  const exampleOptions: Array<FilterOption> = [
    { key: 'Gall Bladder', doc_count: 587 },
    { key: 'Breast', doc_count: 525 },
    { key: 'Prostate', doc_count: 510 },
    { key: 'Brain', doc_count: 478 },
    { key: 'Liver', doc_count: 415 },
    { key: 'Eye', doc_count: 623 },
    { key: 'Bone', doc_count: 834 },
    { key: 'Cardiac', doc_count: 626 },
    { key: 'Colorectal', doc_count: 144 },
    { key: 'Skin', doc_count: 882 },
    { key: 'Bile Duct', doc_count: 573 },
    { key: 'Esophagus', doc_count: 221 },
  ].map((opt: any) => ({
    ...opt,
    isChecked: false,
  }));

  const [options, setOptions] = React.useState(exampleOptions);

  return (
    <div>
      <Facet
        subMenuName="Primary Site"
        options={options}
        onOptionToggle={(facetValue) => {
          const currentIndex = options.findIndex((val) => val.key === facetValue);
          setOptions([
            ...options.slice(0, currentIndex),
            ...[{ ...options[currentIndex], isChecked: !options[currentIndex].isChecked }],
            ...options.slice(currentIndex + 1, Infinity),
          ]);
        }}
        onSelectAllOptions={(allOptionsSelected) => {
          if (allOptionsSelected) {
            setOptions(options.map((opt) => ({ ...opt, isChecked: false })));
          } else {
            setOptions(options.map((opt) => ({ ...opt, isChecked: true })));
          }
        }}
        {...knobs}
      />
    </div>
  );
});

export default FacetStories;
