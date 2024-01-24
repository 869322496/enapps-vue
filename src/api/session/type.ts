export type AuthenticateRequestPayload = {
  db: string;
  login: string;
  password: string;
};
export type AuthenticateResponsePayload = {
  groups;
  db;
  sessionId;
  sms2fa_enabled: boolean;
  sms2fa_valid_token: string;
  externalUser;
  login;
  domainLevelDbName;
  domainLevelUserName;
  uid;
  context;
  openerpEntreprise;
  uploadFileLimit: number;
  googleApiKey;
  treeViewColumns;
  webBaseUrl;
  companyNames;
};
