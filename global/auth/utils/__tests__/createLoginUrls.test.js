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

import { describe, expect, test } from '@jest/globals';
import { createLoginURL } from '..';
import { EGO_URL } from 'global/utils/auth/egoPaths';

describe('create ego URLs', () => {
  describe('create login URL with redirect parameter', () => {
    // testing all of the URL patterns
    test('homepage', () => {
      const expected = EGO_URL;
      const input = `/`;
      const result = createLoginURL(input);
      expect(result).toEqual(expected);
    });
    test('page with a URL parameter', () => {
      const expected = `${EGO_URL}&redirect_uri=${location.origin}/repository%3Ffilters%3D%257B%22content%22%253A%255B%255D%252C%22op%22%253A%22and%22%257D%26isOauth%3Dtrue`;
      const input = `/repository?filters=%7B"content"%3A%5B%5D%2C"op"%3A"and"%7D`;
      const result = createLoginURL(input);
      expect(result).toEqual(expected);
    });
    test('entity page', () => {
      const fakeUuid = 'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1';
      const expected = `${EGO_URL}&redirect_uri=${location.origin}/file%2F${fakeUuid}%3FisOauth%3Dtrue`;
      const input = `/file/${fakeUuid}`;
      const result = createLoginURL(input);
      expect(result).toEqual(expected);
    });
  });
});
