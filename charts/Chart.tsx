/*
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
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

import { DocumentNode } from 'graphql';
import { useEffect } from 'react';
import { useArrangerCharts } from './arranger';
import { Chart } from './types';

export type Options = {
  query: DocumentNode;
  variables?: any;
  dataTransformer?: (data: unknown) => any;
};

/**
 *
 * @param param0
 * @returns
 */
const generateChartComponent =
  <Type extends unknown>({
    // internal
    Component,
    options,
    internalConfig,
  }: {
    Component: React.ComponentType<any>; // 'any' prop types
    options: Options;
    internalConfig?: Record<string, unknown>;
  }) =>
  ({
    // consumer
    consumerConfig,
    onLoad,
    onError,
  }: Chart) => {
    const { data, loading, error } = useArrangerCharts(options);

    useEffect(() => {
      if (error) {
        onError && onError(error);
      }
    }, [loading, error]);

    if (!loading && !error) {
      // provides resolved data to user config function, assist in UI styling
      const resolvedConsumerConfig =
        typeof consumerConfig === 'function' ? consumerConfig({ data }) : consumerConfig;

      return <Component {...{ data, ...internalConfig, ...resolvedConsumerConfig }} />;
    } else {
      return null;
    }
  };

export default generateChartComponent;
