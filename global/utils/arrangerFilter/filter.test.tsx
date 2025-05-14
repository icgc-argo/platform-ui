/*
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
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

import { expect } from 'chai';
import { FacetFilter, toArrangerV3Filter } from '.';

const input: FacetFilter = {
  content: [
    {
      content: {
        field: 'gender',
        value: 'Female',
      },
      op: 'in',
    },
    {
      content: {
        field: 'study_id',
        value: 'SAMR-CA',
      },
      op: 'in',
    },
  ],
  op: 'and',
};

const expectedOutput = {
  content: [
    {
      content: {
        fieldName: 'gender',
        value: 'Female',
      },
      op: 'in',
    },
    {
      content: {
        fieldName: 'study_id',
        value: 'SAMR-CA',
      },
      op: 'in',
    },
  ],
  op: 'and',
};

const emptyFilter: FacetFilter = {
  content: [],
  op: 'and',
};

describe('convert Arranger v2 filter to Arranger v3 filter', () => {
  it('should handle empty filter', () => {
    const output = toArrangerV3Filter(emptyFilter);
    expect(output).to.deep.eq(emptyFilter);
  });
  it('should convert full object', () => {
    const output = toArrangerV3Filter(input);
    console.log(JSON.stringify(output));
    expect(output).to.deep.eq(expectedOutput);
  });
});
