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

import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LOCAL_STORAGE_SYSTEM_ALERTS_KEY } from 'global/constants';
import SystemAlert from 'uikit/SystemAlert';
import SYSTEM_ALERTS_QUERY from './SYSTEM_ALERTS.gql';

type SystemAlert = {
  dismissable: boolean;
  id: string;
  level: 'error' | 'info' | 'warning';
  message?: string;
  title: string;
}

const getLocalStorage = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_SYSTEM_ALERTS_KEY)) || [];

const setLocalStorage = (ids: string[]) => {
  localStorage.setItem(LOCAL_STORAGE_SYSTEM_ALERTS_KEY, JSON.stringify(ids));
}

const useSystemAlertsQuery = (options: {} = {}) => useQuery(
  SYSTEM_ALERTS_QUERY,
  { ...options }
);

const SystemAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [dismissedAlerts, setDismissedAlerts] = useState([]);

  useEffect(() => {
    const ids = getLocalStorage();
    setDismissedAlerts(ids);
  }, []);

  const handleClose = (id: string) => {
    const ids = dismissedAlerts.concat(id);
    setDismissedAlerts(ids);
    setLocalStorage(ids);
  };

  const { data = null, loading = true } = useSystemAlertsQuery({
    onCompleted: (data: any) => setAlerts(
      data && data.systemAlerts
        ? data.systemAlerts
        : []
    ),
  });

  const alertsDisplay = alerts.filter(({ id }) => !dismissedAlerts.includes(id));

  return alertsDisplay.length > 0 && !loading
    ? (
      <>
        {alertsDisplay.map((alert: SystemAlert) => (
          <SystemAlert
            alert={alert}
            key={alert.id}
            onClose={() => handleClose(alert.id)}
          />
        ))}
      </>
    )
    : null;
}

export default SystemAlerts;
