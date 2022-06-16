'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _spinner = _interopRequireDefault(require('./collection/spinner'));

var _chevron_up = _interopRequireDefault(require('./collection/chevron_up'));

var _chevron_down = _interopRequireDefault(require('./collection/chevron_down'));

var _chevron_left = _interopRequireDefault(require('./collection/chevron_left'));

var _chevron_right = _interopRequireDefault(require('./collection/chevron_right'));

var _dashboard = _interopRequireDefault(require('./collection/dashboard'));

var _programs = _interopRequireDefault(require('./collection/programs'));

var _rdpc = _interopRequireDefault(require('./collection/rdpc'));

var _slash = _interopRequireDefault(require('./collection/slash'));

var _search = _interopRequireDefault(require('./collection/search'));

var _times = _interopRequireDefault(require('./collection/times'));

var _asterisk = _interopRequireDefault(require('./collection/asterisk'));

var _users = _interopRequireDefault(require('./collection/users'));

var _edit = _interopRequireDefault(require('./collection/edit'));

var _times_circle = _interopRequireDefault(require('./collection/times_circle'));

var _checkmark = _interopRequireDefault(require('./collection/checkmark'));

var _info = _interopRequireDefault(require('./collection/info'));

var _success = _interopRequireDefault(require('./collection/success'));

var _warning = _interopRequireDefault(require('./collection/warning'));

var _mail = _interopRequireDefault(require('./collection/mail'));

var _trash = _interopRequireDefault(require('./collection/trash'));

var _google = _interopRequireDefault(require('./collection/google'));

var _plus_circle = _interopRequireDefault(require('./collection/plus_circle'));

var _key = _interopRequireDefault(require('./collection/key'));

var _user = _interopRequireDefault(require('./collection/user'));

var _ellipses = _interopRequireDefault(require('./collection/ellipses'));

var _exclamation = _interopRequireDefault(require('./collection/exclamation'));

var _star = _interopRequireDefault(require('./collection/star'));

var _download = _interopRequireDefault(require('./collection/download'));

var _upload = _interopRequireDefault(require('./collection/upload'));

var _lock = _interopRequireDefault(require('./collection/lock'));

var _dash = _interopRequireDefault(require('./collection/dash'));

var _file = _interopRequireDefault(require('./collection/file'));

var _form = _interopRequireDefault(require('./collection/form'));

var _minus_circle = _interopRequireDefault(require('./collection/minus_circle'));

var _arrow_left = _interopRequireDefault(require('./collection/arrow_left'));

var _dna_locked = _interopRequireDefault(require('./collection/dna_locked'));

var _workflow = _interopRequireDefault(require('./collection/workflow'));

var _article = _interopRequireDefault(require('./collection/article'));

var _calendar = _interopRequireDefault(require('./collection/calendar'));

var _brackets = _interopRequireDefault(require('./collection/brackets'));

var _testtube = _interopRequireDefault(require('./collection/testtube'));

var _question = _interopRequireDefault(require('./collection/question'));

var _filesize = _interopRequireDefault(require('./collection/filesize'));

var _crosshairs = _interopRequireDefault(require('./collection/crosshairs'));

var _person_admin = _interopRequireDefault(require('./collection/person_admin'));

var _person_collaborator = _interopRequireDefault(require('./collection/person_collaborator'));

var _person_submitter = _interopRequireDefault(require('./collection/person_submitter'));

var _reset = _interopRequireDefault(require('./collection/reset'));

var _hamburger = _interopRequireDefault(require('./collection/hamburger'));

var _hamburger_close = _interopRequireDefault(require('./collection/hamburger_close'));

var _warning_transparent = _interopRequireDefault(require('./collection/warning_transparent'));

var _info_transparent = _interopRequireDefault(require('./collection/info_transparent'));

var _question_circle = _interopRequireDefault(require('./collection/question_circle'));

var _bug = _interopRequireDefault(require('./collection/bug'));

var _filter = _interopRequireDefault(require('./collection/filter'));

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

/**
 * Icon path and property lookup object
 * css - sensible defaults - can be overridden from component
 */
var Icons = {
  spinner: _spinner['default'],
  chevron_up: _chevron_up['default'],
  chevron_down: _chevron_down['default'],
  chevron_left: _chevron_left['default'],
  chevron_right: _chevron_right['default'],
  dashboard: _dashboard['default'],
  programs: _programs['default'],
  rdpc: _rdpc['default'],
  slash: _slash['default'],
  search: _search['default'],
  times: _times['default'],
  times_circle: _times_circle['default'],
  asterisk: _asterisk['default'],
  users: _users['default'],
  edit: _edit['default'],
  checkmark: _checkmark['default'],
  info: _info['default'],
  info_transparent: _info_transparent['default'],
  success: _success['default'],
  warning: _warning['default'],
  warning_transparent: _warning_transparent['default'],
  mail: _mail['default'],
  trash: _trash['default'],
  google: _google['default'],
  plus_circle: _plus_circle['default'],
  minus_circle: _minus_circle['default'],
  key: _key['default'],
  user: _user['default'],
  ellipses: _ellipses['default'],
  exclamation: _exclamation['default'],
  star: _star['default'],
  download: _download['default'],
  upload: _upload['default'],
  lock: _lock['default'],
  dash: _dash['default'],
  file: _file['default'],
  form: _form['default'],
  arrow_left: _arrow_left['default'],
  dna_locked: _dna_locked['default'],
  workflow: _workflow['default'],
  question: _question['default'],
  testtube: _testtube['default'],
  brackets: _brackets['default'],
  calendar: _calendar['default'],
  article: _article['default'],
  filesize: _filesize['default'],
  crosshairs: _crosshairs['default'],
  person_admin: _person_admin['default'],
  person_collaborator: _person_collaborator['default'],
  person_submitter: _person_submitter['default'],
  reset: _reset['default'],
  hamburger: _hamburger['default'],
  hamburger_close: _hamburger_close['default'],
  question_circle: _question_circle['default'],
  bug: _bug['default'],
  filter: _filter['default'],
};
var _default = Icons;
exports['default'] = _default;
