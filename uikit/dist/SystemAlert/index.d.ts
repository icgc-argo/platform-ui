import React from 'react';
declare type AlertLevel = 'error' | 'warning' | 'info';
export declare type Alert = {
  level: AlertLevel;
  title: string;
  message?: string;
  dismissable: boolean;
};
declare type AlertProps = {
  alert: Alert;
  onClose: () => void;
};
declare const SystemAlert: React.ComponentType<AlertProps>;
export default SystemAlert;
