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

/**
 * @type {import('next').NextConfig}
 */

require('dotenv').config();

const urlJoin = require('url-join');
const path = require('path');

const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withTM = require('next-transpile-modules')(['@icgc-argo/uikit']);

const nextConfig = withPlugins([withImages, withTM], {
  exportPathMap: async (defaultPathMap) =>
    process.env.EXPORT_PATH
      ? {
          '/': { page: process.env.EXPORT_PATH },
          '/404': { page: process.env.EXPORT_PATH },
        }
      : defaultPathMap,
  webpack: (config, options) => {
    // allows absolute imports from top level folders (components, pages, global)
    // breaks the default import behavior for the public folder
    config.resolve.modules.push(path.resolve('./'));

    // restore default public folder imports
    config.resolve.alias['images'] = path.join(__dirname, 'public', 'images');

    config.resolve.alias = {
      ...config.resolve.alias,
      // This asn1 nonsense is to allow the jsonwebtokens dependency `parse-asn1` to get webpacked correctly.
      // It has a dependency called `asn1.js` and a file with the same name that webpack gets confused.
      'asn1.js': urlJoin(__dirname, '/node_modules/asn1.js/lib/asn1.js'),
    };

    // These 'react' related configs are added to enable linking packages in development
    // (e.g. UIKit), and not get the "broken Hooks" warning.
    // https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react
    // start react configs
    if (options.isServer) {
      config.externals = ['react', ...config.externals];
    }

    config.resolve.alias['react'] = path.resolve(__dirname, '.', 'node_modules', 'react');
    // end react configs

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
    FEATURE_DASHBOARD_CHARTS_ENABLED: process.env.FEATURE_DASHBOARD_CHARTS_ENABLED,
    FEATURE_FILE_ENTITY_ENABLED: process.env.FEATURE_FILE_ENTITY_ENABLED,
    FEATURE_DONOR_ENTITY_ENABLED: process.env.FEATURE_DONOR_ENTITY_ENABLED,
    FEATURE_FACET_TABS_ENABLED: process.env.FEATURE_FACET_TABS_ENABLED,
    FEATURE_RNASEQ_ENABLED: process.env.FEATURE_RNASEQ_ENABLED,
    FEATURE_DACO_V2_ENABLED: process.env.FEATURE_DACO_V2_ENABLED,
    FEATURE_SUBMITTED_DATA_ENABLED: process.env.FEATURE_SUBMITTED_DATA_ENABLED,
  },
});

module.exports = nextConfig;
