/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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

import spinner from './collection/spinner';
import chevron_up from './collection/chevron_up';
import chevron_down from './collection/chevron_down';
import chevron_left from './collection/chevron_left';
import chevron_right from './collection/chevron_right';
import dashboard from './collection/dashboard';
import programs from './collection/programs';
import rdpc from './collection/rdpc';
import slash from './collection/slash';
import search from './collection/search';
import times from './collection/times';
import asterisk from './collection/asterisk';
import users from './collection/users';
import edit from './collection/edit';
import times_circle from './collection/times_circle';
import checkmark from './collection/checkmark';
import info from './collection/info';
import success from './collection/success';
import warning from './collection/warning';
import mail from './collection/mail';
import trash from './collection/trash';
import google from './collection/google';
import plus_circle from './collection/plus_circle';
import key from './collection/key';
import user from './collection/user';
import ellipses from './collection/ellipses';
import exclamation from './collection/exclamation';
import star from './collection/star';
import download from './collection/download';
import upload from './collection/upload';
import lock from './collection/lock';
import dash from './collection/dash';
import file from './collection/file';
import form from './collection/form';
import minus_circle from './collection/minus_circle';
import arrow_left from './collection/arrow_left';
import dna_locked from './collection/dna_locked';
import workflow from './collection/workflow';
import article from './collection/article';
import calendar from './collection/calendar';
import brackets from './collection/brackets';
import testtube from './collection/testtube';
import question from './collection/question';
import filesize from './collection/filesize';
import crosshairs from './collection/crosshairs';
import person_admin from './collection/person_admin';
import person_collaborator from './collection/person_collaborator';
import person_submitter from './collection/person_submitter';
import reset from './collection/reset';
import hamburger from './collection/hamburger';
import hamburger_close from './collection/hamburger_close';
import warning_transparent from './collection/warning_transparent';
import info_transparent from './collection/info_transparent';
import question_circle from './collection/question_circle';
import bug from './collection/bug';
import filter from './collection/filter';
import legend from './collection/legend';

/**
 * Icon path and property lookup object
 * css - sensible defaults - can be overridden from component
 */
const Icons = {
  spinner,
  chevron_up,
  chevron_down,
  chevron_left,
  chevron_right,
  dashboard,
  programs,
  rdpc,
  slash,
  search,
  times,
  times_circle,
  asterisk,
  users,
  edit,
  checkmark,
  info,
  info_transparent,
  success,
  warning,
  warning_transparent,
  mail,
  trash,
  google,
  plus_circle,
  minus_circle,
  key,
  user,
  ellipses,
  exclamation,
  star,
  download,
  upload,
  lock,
  dash,
  file,
  form,
  arrow_left,
  dna_locked,
  workflow,
  question,
  testtube,
  brackets,
  calendar,
  article,
  filesize,
  crosshairs,
  person_admin,
  person_collaborator,
  person_submitter,
  reset,
  hamburger,
  hamburger_close,
  question_circle,
  bug,
  filter,
  legend,
};

export type UikitIconNames = keyof typeof Icons;

export default Icons;
