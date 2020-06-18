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
import { useTheme } from 'uikit/ThemeProvider';
import { css } from '@emotion/core';
import Icon from 'uikit/Icon';
import Typography from 'uikit/Typography';
import Button from 'uikit/Button';
import { LOCAL_STORAGE_GDPR_ACCEPTANCE_KEY } from 'global/constants';
import Link from 'uikit/Link';
import HyperLink from 'uikit/Link';
import { ARGO_PRIVACY_PAGE } from '../global/constants/argoPages';

export default () => {
  const theme = useTheme();
  const [accepted, setAcceptedState] = React.useState(true);
  const sync = () => {
    setAcceptedState(localStorage.getItem(LOCAL_STORAGE_GDPR_ACCEPTANCE_KEY) === 'true');
  };
  const persistAcceptedState = (accepted: boolean) => {
    localStorage.setItem(LOCAL_STORAGE_GDPR_ACCEPTANCE_KEY, String(accepted));
    sync();
  };
  React.useEffect(() => {
    sync();
  }, []);
  return (
    <>
      {!accepted && (
        <div
          css={css`
            background: ${theme.colors.primary_dark};
            color: ${theme.colors.white};
            display: flex;
            padding: 8px;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              padding: 16px;
              padding-left: 8px;
            `}
          >
            <Icon name="info" fill={theme.colors.secondary} width="30px" height="30px" />
          </div>
          <Typography as="div">
            This website uses cookies that are required to verify permissions, access controlled
            data, and analyze traffic. Your browser settings may allow you to turn off cookies. If
            you turn off browser cookies, you will not be able to access some features of the ICGC
            ARGO Data Platform. By continuing to use our website without changing your browser
            settings, you consent to our use of cookies in accordance with our Privacy Policy. To
            learn more about how we use cookies on this website, please review our{' '}
            <Link href={ARGO_PRIVACY_PAGE} target="_blank">
              <HyperLink invert>Privacy Policy</HyperLink>
            </Link>
          </Typography>
          <div
            css={css`
              display: flex;
              align-items: center;
              padding: 16px;
            `}
          >
            <Button variant="secondary" onClick={() => persistAcceptedState(true)}>
              OK
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
