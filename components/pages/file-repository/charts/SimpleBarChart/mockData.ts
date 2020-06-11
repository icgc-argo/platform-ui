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

const primarySiteData = [
  { category: 'liver', count: 72 },
  { category: 'pancreas', count: 36 },
  { category: 'lungs', count: 24 },
  { category: 'skin', count: 67 },
  { category: 'cervix', count: 90 },
  { category: 'brain', count: 91 },
  { category: 'bone', count: 45 },
  { category: 'lymph nodes', count: 32 },
  { category: 'stomach', count: 31 },
  { category: 'prostate', count: 31 },
  { category: 'blood', count: 46 },
  { category: 'uterus', count: 3 },
  { category: 'thyroid', count: 4 },
  { category: 'esophagus', count: 4 },
  { category: 'eye', count: 18 },
  { category: 'breast', count: 19 },
  { category: 'spine', count: 27 },
  { category: 'kidney', count: 44 },
  { category: 'bladder', count: 41 },
];

const fileTypeData = [
  { category: 'Annotated SSM', count: 554 },
  { category: 'Aligned Reads', count: 1298 },
  { category: 'Clinical Supplement', count: 334 },
  { category: 'Biospecimen Supplement', count: 56 },
  { category: 'Methylation Beta Value', count: 117 },
];
const programData = [
  { category: 'TEST2-CA', count: 100 },
  { category: 'TEST-CA', count: 243 },
  { category: 'TEST3-CA', count: 989 },
  { category: 'SAMPLE-CA', count: 1254 },
  { category: 'SAMPLE2-CA', count: 90 },
  { category: 'AACC-CA', count: 3 },
  { category: 'CCAA-CA', count: 750 },
  { category: 'HELLO-GB', count: 500 },
  { category: 'ABCD-GB', count: 209 },
  { category: 'EFGH-CA', count: 1000 },
  { category: 'IJKL-CA', count: 1100 },
  { category: 'TEST4-CA', count: 462 },
];

const dataTypes = {
  program: programData,
  'data type': fileTypeData,
  'primary site': primarySiteData,
};

export { primarySiteData, fileTypeData, programData, dataTypes };
