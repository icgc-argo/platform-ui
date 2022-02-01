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

-- creates policies
INSERT INTO policy
    (id, owner, name)
VALUES
    ('27b08a5b-5328-4223-8ddc-c9e6dcaa48c3', NULL, 'PROGRAMSERVICE');

INSERT INTO policy
    (id, owner, name)
VALUES
    ('27b08a5b-5328-4223-8ddc-c9e6dcaa48c4', NULL, 'CLINICALSERVICE');

INSERT INTO policy
    (id, owner, name)
VALUES
    ('27b08a5b-5328-4223-8ddc-c9e6dcaa48c5', NULL, 'DICTIONARY');

-- create groups
INSERT INTO egogroup
    (id, name, description, status)
VALUES
    ('6e3ab148-25fb-419b-aba5-e1076afe269e', 'dcc-admin', 'asdf', 'APPROVED');

-- creates group-policy relationships
INSERT INTO grouppermission 
    (id, policy_id, group_id, access_level)
VALUES 
    ('61b7b772-9643-48dd-a328-5997da14cb67', '27b08a5b-5328-4223-8ddc-c9e6dcaa48c3', '6e3ab148-25fb-419b-aba5-e1076afe269e', 'WRITE');

INSERT INTO grouppermission 
    (id, policy_id, group_id, access_level)
VALUES 
    ('78929989-854d-4f55-aa9f-258c33ef59d7', '27b08a5b-5328-4223-8ddc-c9e6dcaa48c4', '6e3ab148-25fb-419b-aba5-e1076afe269e', 'WRITE');

INSERT INTO grouppermission 
    (id, policy_id, group_id, access_level)
VALUES 
    ('0e155dfb-08a0-4829-93ad-0ccca98bd5c2', '27b08a5b-5328-4223-8ddc-c9e6dcaa48c5', '6e3ab148-25fb-419b-aba5-e1076afe269e', 'WRITE');

-- create applications
INSERT INTO egoapplication 
    (id, name, clientid, clientsecret, redirecturi, description, status, type) 
VALUES 
    ('96eeb453-e08f-46f1-bfa8-6ee377ee5b1f',
    'ego admin',
    'ego',
    'egoadminsecret',
    'http://localhost:3501',
    'admin ui',
    'APPROVED',
    'ADMIN'),
    ('58037d95-63ab-46e4-9c35-f81889cd131c',
    'program service',
    'program',
    'programsecret',
    'http://program:8080',
    'program service',
    'APPROVED',
    'ADMIN'),
    ('c8b4e07c-9fb5-43cc-a43d-d14a6b03ef11',
    'platform',
    'platform',
    'platformsecret',
    'http://localhost:8080/logged-in',
    'argo platform',
    'APPROVED',
    'CLIENT'),
    ('bea3aceb-91a5-4c97-9d53-14beb3af988d',
    'score server',
    'score',
    'scoresecret',
    'http://localhost:8087',
    'score server',
    'APPROVED',
    'CLIENT'),
    ('98d98180-65f9-11e9-a923-1681be663d3e',
    'song',
    'song',
    'song',
    'http://song:7080',
    'song',
    'APPROVED',
    'CLIENT');

