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

const useSystemAlertsQuery = (options = {}) => useQuery(
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

  return data && !loading
    ? (
      <>
        {alertsDisplay.map((alert: SystemAlert) => (
          <SystemAlert
            alert={alert}
            onClose={() => handleClose(alert.id)}
          />
        ))}
      </>
    )
    : null;
}

export default SystemAlerts;
