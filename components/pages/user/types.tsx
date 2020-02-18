export type ApiToken = {
  exp: number;
  key: string;
  error: string;
};

export type ProfileQueryData = {
  self: {
    isDacoApproved: boolean;
    apiToken: ApiToken;
  };
};
