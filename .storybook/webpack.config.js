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

const path = require('path');

const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = async ({ config }) => {
  config.node = {
    __dirname: true,
    __filename: true,
  };

  config.resolve.modules = [...(config.resolve.modules || []), path.resolve(__dirname, '../')];

  config.module.rules = [
    ...(config.module.rules || []),
    {
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    },
    {
      test: /\.(ts|tsx)$/,
      exclude: /(node_modules)/,
      use: [
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
              [
                '@emotion/babel-preset-css-prop',
                {
                  autoLabel: "always",
                  labelFormat: 'Uikit-[local]',
                },
              ],
            ],
          },
        },
      ],
    },
    {
      test: /\.svg$/,
      use: [
        {
          loader: 'svg-url-loader',
          options: {
            limit: 10000,
          },
        },
      ]},
  ];
  config.resolve.extensions = [...(config.resolve.extensions || []), '.ts', '.tsx'];

  config.resolve.alias = {
    ...config.resolve.alias,
    "@emotion/styled-base": toPath("node_modules/@emotion/styled"),
    "@emotion/styled": toPath("node_modules/@emotion/styled"),
    "emotion-theming": toPath("node_modules/@emotion/react"),
  };

  // Return the altered config
  return config;
};
