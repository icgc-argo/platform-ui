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

require('dotenv').config();

const urlJoin = require('url-join');

const withImages = require('next-images');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = withImages({
  exportPathMap: (defaultPathMap) =>
    process.env.EXPORT_PATH
      ? {
          '/': { page: process.env.EXPORT_PATH },
          '/404': { page: process.env.EXPORT_PATH },
        }
      : defaultPathMap,
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };
    config.resolve.modules.push(path.resolve('./'));
    config.resolve.alias = {
      ...config.resolve.alias,
      // This asn1 nonsense is to allow the jsonwebtokens dependency `parse-asn1` to get webpacked correctly. It has a dependency called `asn1.js` and a file with the same name that webpack gets confused.
      'asn1.js': urlJoin(__dirname, '/node_modules/asn1.js/lib/asn1.js'),
    };
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ];

    return config;
  },
  publicRuntimeConfig: {
    GATEWAY_API_ROOT: process.env.GATEWAY_API_ROOT,
    EGO_API_ROOT: process.env.EGO_API_ROOT,
    EGO_CLIENT_ID: process.env.EGO_CLIENT_ID,
    EGO_PUBLIC_KEY: process.env.EGO_PUBLIC_KEY,
    AUTH_DISABLED: process.env.AUTH_DISABLED,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    DOCS_URL_ROOT: process.env.DOCS_URL_ROOT,
    DACO_URL: process.env.DACO_URL,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    FEATURE_REPOSITORY_ENABLED: process.env.FEATURE_REPOSITORY_ENABLED,
    FEATURE_LANDING_PAGE_STATS_ENABLED: process.env.FEATURE_LANDING_PAGE_STATS_ENABLED,
    FEATURE_ACCESS_FACET_ENABLED: process.env.FEATURE_ACCESS_FACET_ENABLED,
    MAINTENANCE_MODE_ON: process.env.MAINTENANCE_MODE_ON,
    DASHBOARD_CHARTS_ENABLED: process.env.DASHBOARD_CHARTS_ENABLED,
  },
});
