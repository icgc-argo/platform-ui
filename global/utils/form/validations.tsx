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
import { PROGRAM_USER_ROLES, RoleKey } from 'global/constants/index';
import { PROGRAM_MEMBERSHIP_TYPES } from 'global/constants/index';
import { requiredError, validEmail } from 'global/utils/form/error';

export const firstName = yup
  .string()
  .label('First name')
  .trim()
  .required();

export const lastName = yup
  .string()
  .label('Last name')
  .trim()
  .required();

export const email = yup
  .string()
  .email(validEmail)
  .label('Email')
  .trim()
  .required();

export const role = yup
  .string()
  .label('Role')
  // Drop down selector makes the value null if you do not select, the transform makes the null into a string to fix error messaging
  .transform((value, original) => (value === null ? '' : value))
  .oneOf(PROGRAM_USER_ROLES.map(type => type.value)) as yup.StringSchema<RoleKey>;
