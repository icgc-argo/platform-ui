export type AccessKey = {
  exp: number;
  key: string;
  error: string;
};

export type ProfileQueryData = {
  self: {
    isDacoApproved: boolean;
    apiKey: AccessKey;
  };
};
