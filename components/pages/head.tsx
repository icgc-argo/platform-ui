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

import React from 'react';
import NextHead from 'next/head';

const Head = ({
  title = 'ICGC ARGO',
  subtitle,
  description = '',
  url = '',
  ogImage = '',
}: {
  title?: string;
  subtitle?: string;
  description?: string;
  url?: string;
  ogImage?: string;
}) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{(subtitle && `ICGC ARGO | ${subtitle}`) || title}</title>
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title || ''} />
    <meta property="og:description" content={description} />
    <meta name="twitter:site" content={url} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={ogImage} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </NextHead>
);

export default Head;
