export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-1o95usyjx6jvu"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api.openelastic.org/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_FiFXEDDxh",
    APP_CLIENT_ID: "68l6ufmr6evmeegt6a64p004tk",
    IDENTITY_POOL_ID: "us-east-1:9603adbb-5f16-4234-9fec-3602d2951a2b"
  }
};
