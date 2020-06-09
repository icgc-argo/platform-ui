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

/*******************
 * @important
 * This file should only contain references to internal pages,
 * i.e, pages that are hosted by this app itself.
 *
 * For external pages, consider:
 * - make an environment config variable with a default, and/or
 * - create a new constant file in this directory.
 *******************/

export const LOGIN_PAGE_PATH = '/login';
export const USER_PAGE_PATH = '/user';
export const CONTACT_PAGE_PATH = '/contact';

// submission paths
export const SUBMISSION_PATH = `/submission`;
const DCC_PATH = `${SUBMISSION_PATH}/dcc`;
export const DCC_DASHBOARD_PATH = `${DCC_PATH}/dashboard`;
export const PROGRAMS_LIST_PATH = `${SUBMISSION_PATH}/program`;
export const PROGRAM_SHORT_NAME_PATH = `[shortName]`;
export const CREATE_PROGRAM_PAGE_PATH = `${SUBMISSION_PATH}/program/create`;
export const PROGRAM_MANAGE_PATH = `${SUBMISSION_PATH}/program/${PROGRAM_SHORT_NAME_PATH}/manage`;
export const PROGRAM_DASHBOARD_PATH = `${SUBMISSION_PATH}/program/${PROGRAM_SHORT_NAME_PATH}/dashboard`;
export const PROGRAM_SAMPLE_REGISTRATION_PATH = `${SUBMISSION_PATH}/program/${PROGRAM_SHORT_NAME_PATH}/sample-registration`;
export const PROGRAM_CLINICAL_SUBMISSION_PATH = `${SUBMISSION_PATH}/program/${PROGRAM_SHORT_NAME_PATH}/clinical-submission`;
export const INVITE_ID = `[inviteId]`;
export const PROGRAM_JOIN_DETAILS_PATH = `${SUBMISSION_PATH}/program/join/details/${INVITE_ID}`;
export const PROGRAM_JOIN_LOGIN_PATH = `${SUBMISSION_PATH}/program/join/login/${INVITE_ID}`;

// rdpc path
export const RDPC_PATH = '/rdpc';

// file repository paths
export const FILE_REPOSITORY_PATH = `/repository`;

// team page
export const TEAM_PATH = '/team';
