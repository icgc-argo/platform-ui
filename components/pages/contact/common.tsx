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

import yup from 'global/utils/validations';

export type ContactCategoryKey =
  | 'APPLYING_ACCESS'
  | 'DATA_DOWNLOAD'
  | 'DATA_SUBMISSION'
  | 'DATA_QUERY'
  | 'MEDIA_QUERY'
  | 'PUBLICATION_QUERY'
  | 'OTHER';

export const CONTACT_CATEGORY_OPTIONS: Array<{ content: string; value: ContactCategoryKey }> = [
  {
    content: 'Applying for Access to Controlled Data through DACO',
    value: 'APPLYING_ACCESS',
  },
  { content: 'Data Download', value: 'DATA_DOWNLOAD' },
  { content: 'Data Submission', value: 'DATA_SUBMISSION' },
  { content: 'Data or Analysis Query', value: 'DATA_QUERY' },
  { content: 'Media or Collaboration Inquiry', value: 'MEDIA_QUERY' },
  { content: 'Publication Inquiry', value: 'PUBLICATION_QUERY' },
  { content: 'Other', value: 'OTHER' },
];

export const messageCategory = yup
  .string()
  .label('Assistance Type')
  .transform((value, original) => (value === null ? '' : value))
  .oneOf(CONTACT_CATEGORY_OPTIONS.map(type => type.value)) as yup.StringSchema<ContactCategoryKey>;

export const messageDescription = yup
  .string()
  .label('Your message')
  .trim()
  .required();

export const reCaptcha = yup
  .string()
  .trim()
  .label('reCaptcha')
  .transform((value, original) => (value === null ? '' : value))
  .required('Please complete the reCAPTCHA challenge.');
