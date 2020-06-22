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

import { configure, addDecorator } from '@storybook/react';
import React from 'react';
import urlJoin from 'url-join';
import { ThemeProvider, css } from '../uikit';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink } from 'apollo-link-http';

const req = require.context('../components', true, /.stories\.tsx$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

addDecorator((Story) => {
  console.log('process.env.GATEWAY_API_ROOT: ', process.env.GATEWAY_API_ROOT);
  const GRAPHQL_URL = urlJoin(process.env.GATEWAY_API_ROOT, 'graphql');
  // const apolloLink = new HttpLink({
  //   uri: GRAPHQL_URL,
  //   fetch,
  // });
  // const client = new ApolloClient({
  //   link: apolloLink,
  //   connectToDevTools: true,
  //   cache: new InMemoryCache(),
  // });

  console.log('GRAPHQL_URL: ', GRAPHQL_URL);

  const StoryComponent = Story as React.ComponentType;
  return (
    <ThemeProvider>
      <StoryComponent />
    </ThemeProvider>
  );
});

configure(loadStories, module);
