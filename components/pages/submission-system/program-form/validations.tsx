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
import { CANCER_TYPES, COUNTRIES, PRIMARY_SITES, PROGRAM_MEMBERSHIP_TYPES } from 'global/constants';

const baseValidations = yup.object().shape({
  programName: yup.string().label('Program Name').trim().required(),
  shortName: yup
    .string()
    .label('Short Name')
    .trim()
    .test('ends-in-country-code', '${label} must end with a valid country code.', (value) => {
      const providedCode = value.slice ? value.slice(-2) : null;
      return !!COUNTRIES.find((country) => country.code === providedCode);
    })
    .matches(/-([A-Z][A-Z])$/, '${label} must end with a 2 character country code: "-XX"')
    .matches(/^[A-Z0-9]/, '${label} must begin with an uppercase letter or a number')
    .matches(
      /^[A-Z0-9_-]+$/,
      '${label} can only contain uppercase letters, numbers, hyphens, and underscores',
    )
    .max(11)
    .min(6)
    .required(),
  countries: yup.array().of(yup.string()).label('Countries').required(),
  cancerTypes: yup.array().of(yup.string()).label('Cancer Types').required(),
  primarySites: yup.array().of(yup.string()).label('Primary Sites').required(),
  commitmentLevel: yup.number().label('Commitment Level').integer().moreThan(0).required(),
  institutions: yup.array().of(yup.string()).label('Institutions').required(),
  membershipType: yup
    .string()
    .label('Membership Type')
    .oneOf(PROGRAM_MEMBERSHIP_TYPES.map((type) => type.value))
    .required(),
  website: yup.string().label('Website').trim().url(),
  description: yup.string().label('Description').trim(),
  processingRegions: yup.array().of(yup.string()).label('Processing Regions').required(),
});

const adminValidations = yup.object().shape({
  adminFirstName: yup.string().label(`Administrator's First Name`).trim().required(),
  adminLastName: yup.string().label(`Administrator's Last Name`).trim().required(),
  adminEmail: yup.string().label(`Administrator's Email`).trim().email().required(),
});

export const createProgramSchema = baseValidations.concat(adminValidations);
export const updateProgramSchema = baseValidations;
