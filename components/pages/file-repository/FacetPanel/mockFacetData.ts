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

const primarySites = [
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
];

const experimentalStrategies = [
  { key: 'WXS', doc_count: 878 },
  { key: 'WGS', doc_count: 900 },
  { key: 'RNA Seq', doc_count: 858 },
];

const vitalStatuses = [
  { key: 'Alive', doc_count: 623 },
  { key: 'Deceased', doc_count: 121 },
  { key: 'Unknown', doc_count: 861 },
];

const programs = [
  { key: 'TEST2-CA', doc_count: 100 },
  { key: 'TEST-CA', doc_count: 243 },
  { key: 'TEST3-CA', doc_count: 989 },
  { key: 'SAMPLE-CA', doc_count: 1254 },
  { key: 'SAMPLE2-CA', doc_count: 90 },
  { key: 'AACC-CA', doc_count: 3 },
  { key: 'CCAA-CA', doc_count: 750 },
  { key: 'HELLO-GB', doc_count: 500 },
  { key: 'ABCD-GB', doc_count: 209 },
  { key: 'EFGH-CA', doc_count: 1000 },
  { key: 'IJKL-CA', doc_count: 1100 },
  { key: 'TEST4-CA', doc_count: 462 },
];

const genders = [
  { key: 'Male', doc_count: 124 },
  { key: 'Female', doc_count: 234 },
  { key: 'Other', doc_count: 345 },
];
const dataTypes = [
  { key: 'Booleans ', doc_count: 4 },
  { key: 'Strings', doc_count: 14 },
  { key: 'Integers', doc_count: 55 },
  { key: 'Floats', doc_count: 39 },
];

export default {
  program: programs,
  'primary site': primarySites,
  'vital status': vitalStatuses,
  gender: genders,
  'experimental strategy': experimentalStrategies,
  'data type': dataTypes,
};
