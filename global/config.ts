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

import urlJoin from 'url-join';
import getNextConfig from 'next/config';

export const getConfig = () => {
  const publicConfig: { [k: string]: string } = getNextConfig()?.publicRuntimeConfig || {};
  return {
    GATEWAY_API_ROOT: publicConfig.GATEWAY_API_ROOT || 'http://localhost:9000',
    EGO_API_ROOT: publicConfig.EGO_API_ROOT || '',
    EGO_CLIENT_ID: publicConfig.EGO_CLIENT_ID || '',
    EGO_PUBLIC_KEY:
      publicConfig.EGO_PUBLIC_KEY ||
      `-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0lOqMuPLCVusc6szklNXQL1FHhSkEgR7An+8BllBqTsRHM4bRYosseGFCbYPn8r8FsWuMDtxp0CwTyMQR2PCbJ740DdpbE1KC6jAfZxqcBete7gP0tooJtbvnA6X4vNpG4ukhtUoN9DzNOO0eqMU0Rgyy5HjERdYEWkwTNB30i9I+nHFOSj4MGLBSxNlnuo3keeomCRgtimCx+L/K3HNo0QHTG1J7RzLVAchfQT0lu3pUJ8kB+UM6/6NG+fVyysJyRZ9gadsr4gvHHckw8oUBp2tHvqBEkEdY+rt1Mf5jppt7JUV7HAPLB/qR5jhALY2FX/8MN+lPLmb/nLQQichVQIDAQAB\r\n-----END PUBLIC KEY-----`,
    AUTH_DISABLED: publicConfig.AUTH_DISABLED === 'true',
    GA_TRACKING_ID: publicConfig.GA_TRACKING_ID || '',
    EGO_URL: urlJoin(
      publicConfig.EGO_API_ROOT || '',
      `/api/oauth/login/google?client_id=${publicConfig.EGO_CLIENT_ID || ''}`,
    ),
    DACO_URL: publicConfig.DACO_URL || '',
    DOCS_URL_ROOT: publicConfig.DOCS_URL_ROOT || 'https://docs.icgc-argo.org',
    RDPC_PORTAL_URL: publicConfig.RDPC_PORTAL_URL || 'http://localhost:3000',
    RECAPTCHA_SITE_KEY:
      publicConfig.RECAPTCHA_SITE_KEY || '6Lebz-IUAAAAACY7eMyfK4H52Sxy9hv4FYjhFgSR',
    MAINTENANCE_MODE_ON: publicConfig.MAINTENANCE_MODE_ON === 'true',
    FEATURE_DONOR_ENTITY_ENABLED: publicConfig.FEATURE_DONOR_ENTITY_ENABLED === 'true',
    FEATURE_PROGRAM_ENTITY_ENABLED: publicConfig.FEATURE_PROGRAM_ENTITY_ENABLED === 'true',
    FEATURE_FACET_TABS_ENABLED: publicConfig.FEATURE_FACET_TABS_ENABLED === 'true',
    MAX_FILE_DOWNLOAD_SIZE: publicConfig.MAX_FILE_DOWNLOAD_SIZE || 5000000, // 5MB
    FEATURE_RNASEQ_ENABLED: publicConfig.FEATURE_RNASEQ_ENABLED === 'true',
    FEATURE_SUBMITTED_DATA_ENABLED: publicConfig.FEATURE_SUBMITTED_DATA_ENABLED === 'true',
    FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED:
      publicConfig.FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED === 'true',
    FEATURE_REACT_TABLE_V8_ENABLED: publicConfig.FEATURE_REACT_TABLE_V8_ENABLED === 'true',
    FEATURE_SUBMIT_CLINICAL_ENABLED: publicConfig.FEATURE_SUBMIT_CLINICAL_ENABLED === 'true',
    FEATURE_FEDERATED_RDPC: publicConfig.FEATURE_FEDERATED_RDPC === 'true',
    FEATURE_CLINICAL_DOWNLOAD: publicConfig.FEATURE_CLINICAL_DOWNLOAD === 'true',
  } as {
    GATEWAY_API_ROOT: string;
    EGO_API_ROOT: string;
    EGO_CLIENT_ID: string;
    EGO_PUBLIC_KEY: string;
    AUTH_DISABLED: boolean;
    GA_TRACKING_ID: string;
    EGO_URL: string;
    DOCS_URL_ROOT: string;
    DACO_URL: string;
    RDPC_PORTAL_URL: string;
    RECAPTCHA_SITE_KEY: string;
    MAINTENANCE_MODE_ON: boolean;
    FEATURE_DONOR_ENTITY_ENABLED: boolean;
    FEATURE_PROGRAM_ENTITY_ENABLED: boolean;
    FEATURE_FACET_TABS_ENABLED: boolean;
    MAX_FILE_DOWNLOAD_SIZE: number;
    FEATURE_RNASEQ_ENABLED: boolean;
    FEATURE_SUBMITTED_DATA_ENABLED: boolean;
    FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED: boolean;
    FEATURE_REACT_TABLE_V8_ENABLED: boolean;
    FEATURE_SUBMIT_CLINICAL_ENABLED: boolean;
    FEATURE_FEDERATED_RDPC: boolean;
    FEATURE_CLINICAL_DOWNLOAD: boolean;
  };
};
