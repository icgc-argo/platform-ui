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

const mockData = [
  {
    title: 'coreCompletionDate',
    buckets: [
      {
        date: '2020-11-11T21:25:17.000Z',
        donors: 299,
      },
      {
        date: '2020-11-13T21:25:17.000Z',
        donors: 299,
      },
      {
        date: '2020-11-14T21:25:17.000Z',
        donors: 299,
      },
      {
        date: '2020-11-16T21:25:17.000Z',
        donors: 299,
      },
      {
        date: '2020-11-17T21:25:17.000Z',
        donors: 299,
      },
      {
        date: '2020-11-19T21:25:17.000Z',
        donors: 299,
      },
      {
        date: '2020-11-20T21:25:17.000Z',
        donors: 299,
      },
    ],
  },
  {
    title: 'rawReadsFirstPublishedDate',
    buckets: [
      {
        date: '2020-11-11T21:25:17.000Z',
        donors: 0,
      },
      {
        date: '2020-11-13T21:25:17.000Z',
        donors: 0,
      },
      {
        date: '2020-11-14T21:25:17.000Z',
        donors: 0,
      },
      {
        date: '2020-11-16T21:25:17.000Z',
        donors: 0,
      },
      {
        date: '2020-11-17T21:25:17.000Z',
        donors: 0,
      },
      {
        date: '2020-11-19T21:25:17.000Z',
        donors: 0,
      },
      {
        date: '2020-11-20T21:25:17.000Z',
        donors: 0,
      },
    ],
  },
  {
    title: 'alignmentFirstPublishedDate',
    buckets: [
      {
        date: '2020-11-11T21:25:17.000Z',
        donors: 0,
      },
      {
        date: '2020-11-13T21:25:17.000Z',
        donors: 0,
      },
      {
        date: '2020-11-14T21:25:17.000Z',
        donors: 0,
      },
      {
        date: '2020-11-16T21:25:17.000Z',
        donors: 0,
      },
      {
        date: '2020-11-17T21:25:17.000Z',
        donors: 0,
      },
      {
        date: '2020-11-19T21:25:17.000Z',
        donors: 0,
      },
      {
        date: '2020-11-20T21:25:17.000Z',
        donors: 0,
      },
    ],
  },
  {
    title: 'mutectFirstPublishedDate',
    buckets: [
      {
        date: '2020-11-11T21:25:17.000Z',
        donors: 0,
      },
      {
        date: '2020-11-13T21:25:17.000Z',
        donors: 0,
      },
      {
        date: '2020-11-14T21:25:17.000Z',
        donors: 0,
      },
      {
        date: '2020-11-16T21:25:17.000Z',
        donors: 0,
      },
      {
        date: '2020-11-17T21:25:17.000Z',
        donors: 0,
      },
      {
        date: '2020-11-19T21:25:17.000Z',
        donors: 0,
      },
      {
        date: '2020-11-20T21:25:17.000Z',
        donors: 0,
      },
    ],
  },
  {
    title: 'sangerVcsFirstPublishedDate',
    buckets: [
      {
        date: '2020-11-11T21:25:17.000Z',
        donors: 1,
      },
      {
        date: '2020-11-13T21:25:17.000Z',
        donors: 1,
      },
      {
        date: '2020-11-14T21:25:17.000Z',
        donors: 1,
      },
      {
        date: '2020-11-16T21:25:17.000Z',
        donors: 1,
      },
      {
        date: '2020-11-17T21:25:17.000Z',
        donors: 1,
      },
      {
        date: '2020-11-19T21:25:17.000Z',
        donors: 1,
      },
      {
        date: '2020-11-20T21:25:17.000Z',
        donors: 1,
      },
    ],
  },
  {
    title: 'openAccessFirstPublishedDate',
    buckets: [
      {
        date: '2020-11-11T21:25:17.000Z',
        donors: 1,
      },
      {
        date: '2020-11-13T21:25:17.000Z',
        donors: 1,
      },
      {
        date: '2020-11-14T21:25:17.000Z',
        donors: 1,
      },
      {
        date: '2020-11-16T21:25:17.000Z',
        donors: 1,
      },
      {
        date: '2020-11-17T21:25:17.000Z',
        donors: 1,
      },
      {
        date: '2020-11-19T21:25:17.000Z',
        donors: 1,
      },
      {
        date: '2020-11-20T21:25:17.000Z',
        donors: 1,
      },
    ],
  },
];

export default mockData;
