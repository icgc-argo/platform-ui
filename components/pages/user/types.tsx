export type AccessKey = {
  exp: number;
  key: string;
  error: string;
};

export type ProfileQueryData = {
  isDacoApproved: boolean;
  apiKey: AccessKey;
};
